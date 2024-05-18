// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn add_number(num1: i64, num2: i64) -> String {
    let result = num1 + num2;
    format!("The Total Sum of Number1 {} + Number2 {} = {}", num1, num2, result)
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, add_number])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
