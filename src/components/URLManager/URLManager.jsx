import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {invoke} from "@tauri-apps/api/tauri";

export default function URLManager({onDWLDListChange}) {

    const [fileId, setFileId] = useState(0);
    const [downloadList, setDownloadList] = useState([]);

    useEffect(() => {
        invoke('get_all_file_info').then(results => setDownloadList(results));
        onDWLDListChange(downloadList);
    }, [downloadList]);

    const downloadClickHandler = async () => {

        let fileInfo = {
            id: fileId,
            file_name: "Subham",
            size: 1284710,
            status: "Failed",
            speed: "12 MB/s",
        };


        const result = await invoke("store_file_info", {fileInfo});
        setFileId(result?.length || 0);
        setDownloadList(result || []);

        console.log(result);
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">All</h2>
                <span className="text-sm bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">5</span>
            </div>
            <div className="flex items-center space-x-2">
                <input type="text" placeholder="Search"
                       className="px-4 py-2 border rounded-lg text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600"/>
                <button onClick={downloadClickHandler}
                        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
                    <FontAwesomeIcon icon={faDownload}/>
                </button>
                <button
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
                    <FontAwesomeIcon icon={faPlay}/>
                </button>
                <button
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
                    <FontAwesomeIcon icon={faPause}/>
                </button>
            </div>
        </div>
    )
        ;
}
