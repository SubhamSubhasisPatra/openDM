use crate::database::{establish_connection, FileInfo};
use crate::errors::CustomError;
use rusqlite::params;
use log::error;

#[tauri::command]
pub fn store_file_info(file_info: FileInfo) -> Result<Vec<FileInfo>, CustomError> {
    let conn = establish_connection()?;
    println!("The file data: {}", file_info.file_name);
    conn.execute(
        "INSERT INTO file_info (file_name, size, status, time_of_creation) VALUES (?1, ?2, ?3, ?4)",
        params![
            file_info.file_name,
            file_info.size,
            file_info.status,
            file_info.time_of_creation
        ],
    )?;

    return get_all_file_info()
}

#[tauri::command]
pub fn get_all_file_info() -> Result<Vec<FileInfo>, CustomError> {
    let conn = establish_connection()?;
    let mut stmt = conn.prepare("SELECT file_name, size, status, time_of_creation FROM file_info")?;
    let file_info_iter = stmt.query_map([], |row| {
        Ok(FileInfo {
            file_name: row.get(0)?,
            size: row.get(1)?,
            status: row.get(2)?,
            time_of_creation: row.get(3)?,
        })
    })?;

    let mut file_info_list = Vec::new();
    for file_info in file_info_iter {
        file_info_list.push(file_info?);
    }
    Ok(file_info_list)
}

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello {}", name)
}