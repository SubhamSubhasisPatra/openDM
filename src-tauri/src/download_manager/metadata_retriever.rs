use reqwest::header::{CONTENT_LENGTH, CONTENT_TYPE, HeaderMap};
use serde::{Deserialize, Serialize};
use std::fmt;


#[derive(Debug, Serialize, Deserialize)]
pub struct FileDetails {
    pub file_name: String,
    pub file_size: u64,
    pub content_type: String,
}


#[derive(Debug, Serialize, Deserialize)]
pub enum FetchFileInfoError {
    ReqwestError(String),
    CustomError(String),
}

impl fmt::Display for FetchFileInfoError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            FetchFileInfoError::ReqwestError(err) => write!(f, "Request error: {}", err),
            FetchFileInfoError::CustomError(err) => write!(f, "Error: {}", err),
        }
    }
}

impl std::error::Error for FetchFileInfoError {}


fn extract_file_name(headers: &HeaderMap, url: &str) -> String {
    headers
        .get("Content-Disposition")
        .and_then(|cd| cd.to_str().ok())
        .and_then(|cd| cd.split("filename=").nth(1))
        .map(|filename| filename.trim_matches('"'))
        .unwrap_or_else(|| url.split('/').last().unwrap_or("unknown"))
        .to_string()
}

fn extract_file_size(headers: &HeaderMap) -> u64 {
    headers
        .get(CONTENT_LENGTH)
        .and_then(|cl| cl.to_str().ok())
        .and_then(|cl| cl.parse::<u64>().ok())
        .unwrap_or(0)
}

fn extract_content_type(headers: &HeaderMap) -> String {
    headers
        .get(CONTENT_TYPE)
        .and_then(|ct| ct.to_str().ok())
        .unwrap_or("unknown")
        .to_string()
}

#[tauri::command]
pub async fn fetch_file_info(url: &str) -> Result<FileDetails, FetchFileInfoError> {
    // Perform a HEAD request
    let response = reqwest::Client::new()
        .head(url)
        .send()
        .await
        .map_err(|e| FetchFileInfoError::ReqwestError(e.to_string()))?;

    // Check for a successful response
    if !response.status().is_success() {
        return Err(FetchFileInfoError::CustomError(format!(
            "Failed to fetch the file info: {}",
            response.status()
        )));
    }

    // Extract headers
    let headers = response.headers();

    // Extract each field value using the respective functions
    let file_name = extract_file_name(headers, url);
    let file_size = extract_file_size(headers);
    let content_type = extract_content_type(headers);

    Ok(FileDetails {
        file_name,
        file_size,
        content_type,
    })
}
