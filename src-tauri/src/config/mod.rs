use crate::constants::constants::*;
use std::fs;
use std::env;
use std::path::Path;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AppConfig {
    pub download_path: Option<String>,
}

impl Default for AppConfig {
    fn default() -> Self {
        AppConfig { download_path: None }
    }
}

impl AppConfig {
    pub fn load() -> Self {
        let config_path = DEFAULT_CONFIG;
        if let Ok(config_data) = fs::read_to_string(config_path) {
            serde_json::from_str(&config_data).unwrap_or_else(|err| {
                eprintln!("Error parsing config file: {:?}", err);
                AppConfig::default()
            })
        } else {
            AppConfig::default()
        }
    }

    pub fn save(&self) {
        let config_data = match serde_json::to_string_pretty(self) {
            Ok(data) => data,
            Err(err) => {
                eprintln!("Error serializing config: {:?}", err);
                return;
            }
        };

        let current_dir = env::current_dir().unwrap();
        let file_path = Path::new(&current_dir).join(DEFAULT_CONFIG);

        if let Err(err) = fs::write(file_path, config_data) {
            eprintln!("Unable to write config file: {:?}", err);
        }
    }

    pub fn update_download_path(&mut self, path: String) {
        self.download_path = Some(path);
        self.save();
    }

    pub fn get_download_path(&self) -> Option<String> {
        self.download_path.clone()
    }
}
