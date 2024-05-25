#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod errors;
mod os;
mod config;
mod constants;

fn main() {
    // Initialize logger
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::store_file_info,
            commands::get_all_file_info,
            commands::delete_file,
            commands::greet,
            os::get_os
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
