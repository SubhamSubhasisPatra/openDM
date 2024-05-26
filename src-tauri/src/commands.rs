use crate::database::{establish_connection, FileInfo};
use crate::config::AppConfig;
use crate::errors::CustomError;
use rusqlite::params;
use log::error;
use serde::de::Error;

#[tauri::command]
pub fn store_file_info(file_info: FileInfo) -> Result<Vec<FileInfo>, CustomError> {
    let conn = establish_connection()?;
    // error!("The file data: {}", file_info.file_name);
    conn.execute(
        "INSERT INTO file_info (id , file_name, size, status, speed) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![
            file_info.id,
            file_info.file_name,
            file_info.size,
            file_info.status,
            file_info.speed
        ],
    )?;

    return get_all_file_info();
}

#[tauri::command]
pub fn get_all_file_info() -> Result<Vec<FileInfo>, CustomError> {
    let conn = establish_connection()?;
    let mut stmt = conn.prepare("SELECT file_name, size, status, speed , id FROM file_info")?;
    let file_info_iter = stmt.query_map([], |row| {
        Ok(FileInfo {
            file_name: row.get(0)?,
            size: row.get(1)?,
            status: row.get(2)?,
            speed: row.get(3)?,
            id: row.get(4)?,
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