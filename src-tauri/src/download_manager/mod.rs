pub mod metadata_retriever;

use std::error::Error;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use std::sync::Arc;

use anyhow::{anyhow, Result};
use reqwest::Client;
use tokio::sync::Mutex;
use tokio::task;
use tokio::time::{sleep, Duration, Instant};

use crate::commands::get_default_download_path;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct FileInfo {
    pub file_name: String,
    pub time_of_creation: u64,
    pub total_size: u64,
    pub completion_status: String,
    pub avg_upload_speed: u64,
    pub avg_download_speed: u64,
}

#[derive(Clone)] // Add this line
struct ChunkProgress {
    index: usize,
    progress: usize,
}

async fn get_file_size(client: &Client, url: &str) -> Result<u64> {
    let res = client.head(url).send().await?;
    let content_length = res
        .headers()
        .get(reqwest::header::CONTENT_LENGTH)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.parse().ok());
    content_length.ok_or_else(|| anyhow!("No content length"))
}

async fn supports_partial_content(client: &Client, url: &str) -> Result<bool> {
    let res = client.head(url).send().await?;
    Ok(res.headers().get(reqwest::header::ACCEPT_RANGES).is_some())
}

async fn download_chunk(
    client: &Client,
    start: u64,
    end: u64,
    index: usize,
    url: &str,
    progress: Arc<Mutex<Vec<ChunkProgress>>>,
) -> Result<(usize, Vec<u8>)> {
    let res = client
        .get(url)
        .header(reqwest::header::RANGE, format!("bytes={}-{}", start, end))
        .send()
        .await?;
    let status = res.status();
    if status.is_success() {
        let mut chunk = res.bytes().await?;
        // Simulate downloading progress (update every second)
        for _ in 0..10 {
            sleep(Duration::from_millis(10)).await; // Wait 100ms (simulate 1/10th of a second)
            let mut progress = progress.lock().await;
            progress[index].progress += 10; // Increase progress by 10%
            println!("Chunk {} Progress: {}%", index, progress[index].progress);
        }
        Ok((index, chunk.to_vec()))
    } else {
        Err(anyhow!("Failed to download chunk with status: {}", status))
    }
}

async fn download_multipart(client: &Client, url: &str, file_payload: &FileInfo) -> Result<()> {
    let file_size = get_file_size(client, url).await?;

    // Define minimum and maximum chunk sizes
    let min_chunk_size = 10 * 1024 * 1024; // 1 MB
    let max_chunk_size = 100 * 1024 * 1024; // 100 MB

    // Calculate the number of chunks
    let num_chunks = std::cmp::max(1, std::cmp::min(100, (file_size / min_chunk_size) as usize));
    let chunk_size = std::cmp::max(min_chunk_size, file_size / num_chunks as u64);

    // Initialize progress for each chunk
    let progress = Arc::new(Mutex::new(vec![
        ChunkProgress {
            index: 0,
            progress: 0
        };
        num_chunks
    ]));

    let mut handles = vec![];

    for i in 0..num_chunks {
        let start = i as u64 * chunk_size;
        let end = if i == num_chunks - 1 {
            file_size - 1
        } else {
            (i + 1) as u64 * chunk_size - 1
        };
        let client = client.clone();
        let url = url.to_string();
        let progress = Arc::clone(&progress);
        handles.push(tokio::spawn(async move {
            download_chunk(&client, start, end, i, &url, progress).await
        }));
    }

    let mut chunks = vec![];
    for handle in handles {
        match handle.await {
            Ok(Ok((index, chunk))) => chunks.push((index, chunk)),
            Ok(Err(e)) => return Err(e.into()),
            Err(e) => return Err(e.into()),
        }
    }

    chunks.sort_by_key(|&(index, _)| index);

    let file_name = file_payload.file_name.clone(); // Clone the file name to move into the closure

    // load the app config default download path and create the file
    let default_download_path = get_default_download_path().unwrap();
    let download_path = Path::new(&default_download_path).join(file_name);

    task::spawn_blocking(move || {
        let mut file = File::create(&download_path)?;
        for (_, chunk) in chunks {
            file.write_all(&chunk)?;
        }
        Result::<(), std::io::Error>::Ok(())
    })
    .await??;

    Ok(())
}

#[tauri::command]
pub async fn download_test(url: &str, file_payload: FileInfo) -> Result<(), String> {
    let client = Client::new();

    let can_download_multipart = supports_partial_content(&client, &url)
        .await
        .map_err(|e| e.to_string())?;

    println!("Type : {}", can_download_multipart);

    if can_download_multipart {
        let start = Instant::now();
        download_multipart(&client, &url, &file_payload)
            .await
            .map_err(|e| e.to_string())?;
        let duration = start.elapsed();
        println!("Multipart download took: {:?}", duration);
    }

    println!("File downloaded as {}", file_payload.file_name);

    Ok(())
}
