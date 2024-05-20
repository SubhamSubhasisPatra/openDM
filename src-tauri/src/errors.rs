use rusqlite::Error as RusqliteError;
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct CustomError {
    pub message: String,
}

impl From<RusqliteError> for CustomError {
    fn from(error: RusqliteError) -> Self {
        CustomError {
            message: error.to_string(),
        }
    }
}
