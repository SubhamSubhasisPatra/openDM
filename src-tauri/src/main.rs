#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod errors;
mod os;
mod config;
mod constants;
mod download_manager;

use download_manager::metadata_retriever::fetch_file_info;
use download_manager::download_test;

fn main() {
    // Initialize logger
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::store_file_info,
            commands::get_all_file_info,
            commands::delete_file,
            commands::update_download_path,
            commands::get_default_download_path,
            os::get_os,
            fetch_file_info,
            download_test
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
