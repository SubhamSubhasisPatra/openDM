import React from "react";

const DownloadList = () => {
  return (
    <table className="w-full text-left">
      <thead>
        <tr className="text-zinc-700">
          <th className="px-4 py-2">NAME</th>
          <th className="px-4 py-2">SIZE</th>
          <th className="px-4 py-2">SPEED</th>
          <th className="px-4 py-2">STATUS</th>
          <th className="px-4 py-2">CONTROL</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-zinc-100">
          <td className="px-4 py-2 flex items-center">
            <span className="text-blue-500 mr-2">📄</span> my_file1869.zip
          </td>
          <td className="px-4 py-2">13.97 GB</td>
          <td className="px-4 py-2">15.5 MB/s</td>
          <td className="px-4 py-2">In Progress</td>
          <td className="px-4 py-2 flex items-center">
            <span className="text-red-500 mr-2">||</span>
            <span className="text-red-500">✖</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DownloadList;
