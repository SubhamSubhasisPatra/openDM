#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod errors;
mod os;
mod config;
mod constants;
mod download_manager;

use commands::{store_file_info, get_all_file_info, delete_file, update_download_path, get_default_download_path};
use download_manager::metadata_retriever::fetch_file_info;
use download_manager::download_test;
use os::get_os;

fn main() {
    // Initialize logger
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_default_download_path,
            update_download_path,
            get_all_file_info,
            store_file_info,
            fetch_file_info,
            delete_file,
            get_os,
            download_test
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
