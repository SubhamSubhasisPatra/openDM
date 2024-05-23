import React, {useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {invoke} from "@tauri-apps/api/tauri";
import {SelectedItemContext} from "../../contexts/SelectedItemContext.jsx";
import {FILTER_ALL} from "../../common/constants/index.js";


const DownloadList = ({fileList, onFilterCountChange, onFilterTypeChange}) => {

    const {selectedItem} = useContext(SelectedItemContext);

    // Initialize downloadList based on selectedItem
    const getInitialDownloadList = () => {
        if (selectedItem === FILTER_ALL || !selectedItem) {
            return fileList;
        }
        return fileList.filter(ele => ele.status === selectedItem);
    };

    const [downloadList, setDownloadList] = useState(getInitialDownloadList);

    const downloadFilter = (selectedFilter) => {
        let currentFilter;

        if (!selectedFilter || selectedFilter === FILTER_ALL) {
            currentFilter = FILTER_ALL;
        } else {
            currentFilter = selectedFilter;
        }

        onFilterTypeChange(currentFilter);
        if (selectedFilter === FILTER_ALL || !selectedFilter) {
            setDownloadList(fileList);
        } else {
            setDownloadList(fileList.filter(ele => ele.status === selectedFilter));
        }
    };

    useEffect(() => {
        downloadFilter(selectedItem);
        onFilterCountChange(downloadList.length);
    }, [selectedItem, fileList]);

    const deleteHandler = async (id) => {
        await invoke('delete_file', {id});
    }

    return (

        <div className="h-screen overflow-y-auto scrollbar-hid">
            <table className="min-w-full bg-white dark:bg-zinc-800">
                <thead className="sticky top-0 bg-white">
                <tr>
                    <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Filename</th>
                    <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Status</th>
                    <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Speed</th>
                    <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Size</th>
                    <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    downloadList && downloadList.map((file, index) => {
                        const statusPrev = `${file.status}%`;
                        return (
                            <tr key={index} className="border-t border-zinc-200 dark:border-zinc-700">
                                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">{file.file_name}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <div className="w-24 h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full mr-2">
                                            <div className="h-4 bg-green-500 rounded-full"
                                                 style={{width: '100%'}}></div>
                                        </div>
                                        <span className="text-zinc-600 dark:text-zinc-400">{statusPrev}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">{file.speed}</td>
                                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">{file.size}</td>
                                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">
                                    <button onClick={() => deleteHandler(file.id)}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }

                </tbody>
            </table>
        </div>);
};

export default DownloadList;
