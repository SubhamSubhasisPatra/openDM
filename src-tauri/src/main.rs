#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod errors;

fn main() {
    
    // Initialize logger
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::store_file_info,
            commands::get_all_file_info,
            commands::greet
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
