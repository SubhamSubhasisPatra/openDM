pub mod config {
    use crate::constants::constants::*;

    use std::fs;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug)]
    pub struct AppConfig {
        download_path: Option<String>,
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
                serde_json::from_str(&config_data).unwrap_or_default()
            } else {
                AppConfig { download_path: None }
            }
        }

        pub fn save(&self) {
            let config_data = serde_json::to_string_pretty(self).unwrap();
            fs::write(DEFAULT_CONFIG, config_data).expect("Unable to write config file");
        }

        pub fn update_download_path(&mut self, path: String) {
            self.download_path = Some(path);
            self.save()
        }
    }
}