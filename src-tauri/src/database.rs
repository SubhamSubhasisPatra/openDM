use rusqlite::{Connection, Result as SqlResult};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct FileInfo {
    pub file_name: String,
    pub size: u64,
    pub status: String,
    pub time_of_creation: String,
}

pub fn establish_connection() -> SqlResult<Connection> {
    let conn = Connection::open("file_info.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS file_info (
            file_name TEXT NOT NULL,
            size INTEGER NOT NULL,
            status TEXT NOT NULL,
            time_of_creation TEXT NOT NULL
        )",
        [],
    )?;
    Ok(conn)
}
