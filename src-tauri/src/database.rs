use rusqlite::{Connection, Result as SqlResult};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct FileInfo {
    pub id: Option<u64>, // auto-incrementing id
    pub file_name: String,
    pub time_of_creation: u64,
    pub total_size: u64,
    pub completion_status: String,
    pub avg_upload_speed: u64,
    pub avg_download_speed: u64,
    pub file_path: String,
    pub download_progress: f64,
}

pub fn establish_connection() -> SqlResult<Connection> {
    let conn = Connection::open("file_info.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS file_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT NOT NULL,
            time_of_creation INTEGER NOT NULL,
            total_size INTEGER NOT NULL,
            completion_status TEXT NOT NULL,
            avg_upload_speed INTEGER NOT NULL,
            avg_download_speed INTEGER NOT NULL,
            file_path TEXT,
            download_progress REAL)",
        [],
    )?;
    Ok(conn)
}
