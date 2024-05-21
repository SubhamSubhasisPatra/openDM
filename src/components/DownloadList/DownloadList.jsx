import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {invoke} from "@tauri-apps/api/tauri";


const DownloadList = ({fileList}) => {

    fileList = fileList.sort((a, b) => a.id - b.id);

    const deleteHandler = async (id) => {
        await invoke('delete_file', {id});
    }

    return (
        <div
            className="h-screen overflow-y-auto scrollbar-hide">
            <table className="w-full text-left">
                <thead className="sticky top-0 bg-zinc-200">
                <tr className="text-zinc-700">
                    <th className="px-4 py-2">NAME</th>
                    <th className="px-4 py-2">SIZE</th>
                    <th className="px-4 py-2">SPEED</th>
                    <th className="px-4 py-2">STATUS</th>
                    <th className="px-4 py-2">CONTROL</th>
                </tr>
                </thead>
                <tbody>
                {fileList && fileList.map(file => {
                    return (
                        <tr key={file.id}>
                            <td className="px-4 py-2 flex items-center">
                                <span className="text-blue-500 mr-2">📄</span> {file.file_name}
                            </td>
                            <td className="px-4 py-2">{file.size}</td>
                            <td className="px-4 py-2">{file.speed}</td>
                            <td className="px-4 py-2">{file.status}</td>
                            <td className="px-4 py-2 flex items-center">
                                <button onClick={() => deleteHandler(file.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default DownloadList;
