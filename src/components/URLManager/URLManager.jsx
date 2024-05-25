import React, {useEffect, useMemo, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {invoke} from "@tauri-apps/api/tauri";
import {save} from "@tauri-apps/api/dialog";
import {MAC_OS, WINDOWS} from "../../common/constants/index.js";

export default function URLManager({onDWLDListChange, filteredCount, filteredType}) {
    const [fileId, setFileId] = useState(0);
    const [downloadList, setDownloadList] = useState([]);
    const [URL, setURL] = useState('https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi');
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        invoke('get_all_file_info').then(results => setDownloadList(results));
        onDWLDListChange(downloadList);
    }, [downloadList]);

    const pathSelector = async (response) => {

        try {

            let selectedPath = await invoke('get_default_download_path');

            if (selectedPath) return

            selectedPath = await save({
                title: 'Save File',
                defaultPath: response.file_name,
                filters: [
                    {
                        name: 'All Files',
                        extensions: ['*'],
                    },
                ],
            });

            await pathManager(selectedPath);
        } catch (error) {
            console.error('Error selecting path:', error);
        }
    }

    const pathManager = async (selectedPath) => {
        if (!selectedPath) return;

        try {
            const os = await invoke("get_os");

            const splitDelimiter = os === WINDOWS ? "\\" : "/";
            const joinDelimiter = os === WINDOWS ? "\\" : "/";

            selectedPath = selectedPath.split(splitDelimiter)
                .slice(0, -1)
                .join(joinDelimiter);

            await invoke('update_download_path', {path: selectedPath});
            console.log('Download directory set to:', selectedPath);
        } catch (error) {
            console.error('Error invoking update_download_path:', error);
        }
    }

    const downloadClickHandler = async () => {
        if (URL.trim().length === 0) {
            setWarning(true);
            return;
        }

        const response = await invoke('fetch_file_info', {url: URL});
        console.log("Input Value:", response);
        setURL('');

        if (!response.file_name) {
            console.log("Invalid URL")
            return
        }

        await pathSelector(response);
    };

    const handleInputChange = (event) => {
        setURL(event.target.value);
        if (event.target.value.trim().length > 0) {
            setWarning('');
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            await downloadClickHandler();
        }
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">{filteredType}</h2>
                <span className="text-l bg-zinc-100 dark:bg-zinc-700 p-2 rounded-lg text-zinc-600 dark:text-zinc-400">
                    {filteredCount}
                </span>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Download URL"
                    className={`px-4 py-2 border rounded-lg text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600 border-transparent hover:border-zinc-300`}
                    value={URL}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <div className="flex justify-center">
                    {[
                        {icon: faDownload, onClick: downloadClickHandler},
                        {icon: faPlay},
                        {icon: faPause},
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="p-3 m-1 rounded-lg w-10 h-10 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 flex justify-center items-center border border-transparent hover:border-zinc-300"
                        >
                            <FontAwesomeIcon icon={item.icon}/>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
