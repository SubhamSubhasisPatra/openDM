import React from "react";

const DownloadList = ({fileList}) => {

    fileList = fileList.sort((a, b) => a.id - b.id);

    return (
        <table className="w-full text-left">
            <thead>
            <tr className="text-zinc-700">
                <th className="px-4 py-2">ID</th>
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
                    <tr className="bg-zinc-100">
                        <td className="px-4 py-2">{file.id}</td>
                        <td className="px-4 py-2 flex items-center">
                            <span className="text-blue-500 mr-2">📄</span> {file.file_name}
                        </td>
                        <td className="px-4 py-2">{file.size}</td>
                        <td className="px-4 py-2">{file.speed}</td>
                        <td className="px-4 py-2">{file.status}</td>
                        <td className="px-4 py-2 flex items-center">
                            <span className="text-red-500 mr-2">||</span>
                            <span className="text-red-500">✖</span>
                        </td>
                    </tr>
                )
            })
            }
            </tbody>
        </table>
    );
};

export default DownloadList;
