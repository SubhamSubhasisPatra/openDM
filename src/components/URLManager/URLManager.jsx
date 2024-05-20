import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {invoke} from "@tauri-apps/api/tauri";

export default function URLManager() {
    const downloadClickHandler = async () => {

        let fileInfo = {
            file_name: "Pinku",
            size: 1284710,
            status: "Failed",
            time_of_creation: "20th May 2024",
        };


        const result = await invoke("store_file_info", {fileInfo});
        console.log(result);
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <input
                type="text"
                placeholder="Paste your link here..."
                className="form-input px-4 py-2 w-full rounded-md border-2 border-zinc-200 focus:border-blue-500 focus:outline-none"
            />
            <button
                onClick={downloadClickHandler}
                className="ml-4 bg-blue-800 text-white p-3 rounded-lg flex justify-center items-center"
            >
                <FontAwesomeIcon icon={faDownload}/>
            </button>
        </div>
    );
}
