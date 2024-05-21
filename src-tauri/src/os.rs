use os_info;

#[tauri::command]
pub fn get_os() -> String {
    let info = os_info::get();
    format!("{}", info.os_type())
}
