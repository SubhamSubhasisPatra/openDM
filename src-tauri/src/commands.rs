use crate::database::{establish_connection, FileInfo};
use crate::config::AppConfig;
use crate::errors::CustomError;
use rusqlite::params;
use log::error;
use serde::de::Error;

#[tauri::command]
pub fn store_file_info(file_info: FileInfo) -> Result<Vec<FileInfo>, CustomError> {
    let conn = establish_connection()?;
    conn.execute(
        "INSERT INTO file_info (file_name, time_of_creation, total_size, completion_status, avg_upload_speed, avg_download_speed, file_path, download_progress)
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        params![
            file_info.file_name,
            file_info.time_of_creation,
            file_info.total_size,
            file_info.completion_status,
            file_info.avg_upload_speed,
            file_info.avg_download_speed,
            file_info.file_path,
            file_info.download_progress,
        ],
    )?;

    get_all_file_info()
}

#[tauri::command]
pub fn get_all_file_info() -> Result<Vec<FileInfo>, CustomError> {
    let conn = establish_connection()?;
    let mut stmt = conn.prepare("SELECT file_name, time_of_creation, total_size, completion_status, avg_upload_speed, avg_download_speed, file_path, download_progress, id FROM file_info")?;
    let file_info_iter = stmt.query_map([], |row| {
        Ok(FileInfo {
            id: row.get(8)?,
            file_name: row.get(0)?,
            time_of_creation: row.get(1)?,
            total_size: row.get(2)?,
            completion_status: row.get(3)?,
            avg_upload_speed: row.get(4)?,
            avg_download_speed: row.get(5)?,
            file_path: row.get(6)?,
            download_progress: row.get(7)?,
        })
    })?;

    let mut file_info_list = Vec::new();
    for file_info in file_info_iter {
        file_info_list.push(file_info?);
    }
    Ok(file_info_list)
}

#[tauri::command]
pub fn delete_file(id: u64) -> Result<(), CustomError> {
    let conn = establish_connection()?;
    error!("The id to be deleted : {}", id);
    conn.execute("DELETE from file_info where id = ?1", params![id,])?;
    Ok(())
}


///
/// # Description: Update the download path
/// # Arguments
/// * `path`: String
/// returns: ()
#[tauri::command]
pub fn update_download_path(path: String) {
    let mut config = AppConfig::load();
    config.update_download_path(path);
}

#[tauri::command]
pub fn get_default_download_path() -> Option<String> {
    let config = AppConfig::load();
    config.get_download_path()
}