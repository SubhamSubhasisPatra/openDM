use std::io;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use anyhow::{anyhow, Error, Result};
use futures_util::StreamExt;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use tokio::sync::Mutex;
use tokio::task;
use tokio::task::JoinHandle;
use tokio::time::Instant;

use crate::commands::get_default_download_path;

pub mod metadata_retriever;

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
    total_bytes: u64,
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

fn get_file_creation_path(file_payload: &FileInfo) -> PathBuf {
    let file_name = file_payload.file_name.clone();
    let default_download_path = get_default_download_path().unwrap();
    Path::new(&default_download_path).join(file_name)
}


async fn download_chunk(client: &Client, start: u64, end: u64, index: usize, url: &str, progress: Arc<Mutex<Vec<ChunkProgress>>>) -> Result<(usize, Vec<u8>)> {
    let res = client.get(url)
        .header(reqwest::header::RANGE, format!("bytes={}-{}", start, end))
        .send().await?;

    let status = res.status();
    if status.is_success() {
        let mut stream = res.bytes_stream();
        let mut chunk = Vec::new();
        let total_bytes = end - start + 1;
        let mut downloaded = 0;

        while let Some(item) = stream.next().await {
            let bytes = item?;
            chunk.extend_from_slice(&bytes);
            downloaded += bytes.len() as u64;

            // Update progress
            let mut progress = progress.lock().await;
            progress[index].progress = ((downloaded as f64 / total_bytes as f64) * 100.0) as usize;
            println!("Chunk {} Progress: {}%, Downloaded: {} bytes",
                     index,
                     progress[index].progress,
                     downloaded);
            drop(progress); // Release the lock
        }

        Ok((index, chunk))
    } else {
        Err(anyhow!("Failed to download chunk with status: {}", status))
    }
}

// Add proper doc string
// Calculate the chunk size based on the file size
fn calculate_chunk_size(file_size: u64) -> (u64, usize) {
    let num_chunks: usize;
    let min_chunk_size: u64;

    if file_size < 100 * 1024 * 1024 { // less than 100MB
        num_chunks = (file_size / (20 * 1024 * 1024)).max(1) as usize;
        min_chunk_size = 20 * 1024 * 1024; // 20MB
    } else if file_size < 1024 * 1024 * 1024 { // less than 1GB
        num_chunks = 12;
        min_chunk_size = (file_size / 12) as u64;
    } else { // more than 1GB
        num_chunks = 24;
        min_chunk_size = (file_size / 24) as u64;
    }

    let chunk_size = (file_size / num_chunks as u64).max(min_chunk_size);

    (chunk_size, num_chunks)
}


async fn progress_handler(num_chunks: usize, chunk_size: u64, file_size: u64, url: &str, client: &Client) -> Vec<JoinHandle<Result<(usize, Vec<u8>)>>> {
    let mut handles = vec![];

    // Initialize progress for each chunk
    let progress = Arc::new(Mutex::new(vec![ChunkProgress { index: 0, progress: 0, total_bytes: chunk_size }; num_chunks]));

    println!("Total chunks: {}", num_chunks);
    for i in 0..num_chunks {
        let start = i as u64 * chunk_size;
        let end = if i == num_chunks - 1 {
            file_size - 1
        } else {
            (i + 1) as u64 * chunk_size - 1
        };
        let chunk_size = end - start + 1;
        println!("Chunk {}: {} - {} ({} bytes)", i, start, end, chunk_size);
    }


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

    return handles;
}

async fn multi_thread_download(handles: Vec<JoinHandle<Result<(usize, Vec<u8>)>>>, file_payload: &FileInfo) -> Result<(), Error> {
    let mut chunks = vec![];
    for handle in handles {
        match handle.await {
            Ok(Ok((index, chunk))) => chunks.push((index, chunk)),
            Ok(Err(e)) => return Err(*Box::new(e)),
            Err(e) => return Err(Error::from(Box::new(e))),
        }
    }

    chunks.sort_by_key(|&(index, _)| index);

    // Load the app config default download path and create the file
    let download_path = get_file_creation_path(&file_payload);

    task::spawn_blocking(move || {
        let mut file = std::fs::File::create(&download_path)?;
        for (_, chunk) in chunks {
            file.write_all(&chunk)?;
        }
        Result::<(), io::Error>::Ok(())
    }).await??;

    Ok(())
}

async fn download_multipart(client: &Client, url: &str, file_payload: FileInfo) -> Result<()> {
    let file_size = get_file_size(client, url).await?;
    let (chunk_size, num_chunks) = calculate_chunk_size(file_size);
    let handles = progress_handler(num_chunks, chunk_size, file_size, &url, &client).await;

    multi_thread_download(handles, &file_payload).await.expect("Failed to download the file in multi tread");
    Ok(())
}


async fn download_sequential(client: &Client, url: &str, file_payload: FileInfo) -> Result<()> {
    let file_size = get_file_size(client, url).await?;
    let (chunk_size, num_chunks) = (file_size, 1);
    let handles = progress_handler(num_chunks, chunk_size, file_size, &url, &client).await;

    multi_thread_download(handles, &file_payload).await.expect("Failed to download the file in multi tread");
    Ok(())
}


#[tauri::command]
pub async fn download_start(url: &str, file_payload: FileInfo) -> Result<(), String> {
    let client = Client::new();

    let can_download_multipart = supports_partial_content(&client, &url)
        .await
        .map_err(|e| e.to_string())?;

    println!("Support Multipart : {}", can_download_multipart);

    if !can_download_multipart {
        let start = Instant::now();
        download_multipart(&client, &url, file_payload.clone())
            .await
            .map_err(|e| e.to_string())?;
        let duration = start.elapsed();
        println!("Multipart download took: {:?}", duration);
    } else {
        let start = Instant::now();
        download_sequential(&client, &url, file_payload.clone())
            .await
            .map_err(|e| e.to_string())?;
        let duration = start.elapsed();
        println!("Multipart download took: {:?}", duration);
    }

    println!("File downloaded as {}", file_payload.file_name);

    Ok(())
}
