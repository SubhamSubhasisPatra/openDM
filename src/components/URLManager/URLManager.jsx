import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { invoke } from "@tauri-apps/api/tauri";
import { save } from "@tauri-apps/api/dialog";
import { MAC_OS, WINDOWS } from "../../common/constants/index.js";

export default function URLManager({
  onDWLDListChange,
  filteredCount,
  filteredType,
}) {
  const [fileId, setFileId] = useState(0);
  const [selectedPath, setSelectedPath] = useState("");
  const [downloadList, setDownloadList] = useState([]);
  const [URL, setURL] = useState(
    "https://bryan.myfast.link/ext/dl/filenext/814c82d68c/Stocks_5389.rar",
  ); // TODO: The Default URL will be removed
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await invoke("get_all_file_info");
      setDownloadList(results);
      const path = await invoke("get_default_download_path");
      setSelectedPath(path);
    };

    fetchData();
  }, []); // Only run once when the component mounts

  useEffect(() => {
    onDWLDListChange(downloadList);
  }, [downloadList]); // Update parent when downloadList changes

  const pathSelector = async (response) => {
    try {
      if (selectedPath) return;

      let currentPath = await save({
        title: "Save File",
        defaultPath: response.file_name,
        filters: [{ name: "All Files", extensions: ["*"] }],
      });

      await pathManager(currentPath);
    } catch (error) {
      console.error("Error selecting path:", error);
    }
  };

  const pathManager = async (currentPath) => {
    if (!currentPath) return;

    try {
      const os = await invoke("get_os");

      const splitDelimiter = os === WINDOWS ? "\\" : "/";
      const joinDelimiter = os === WINDOWS ? "\\" : "/";

      currentPath = currentPath
        .split(splitDelimiter)
        .slice(0, -1)
        .join(joinDelimiter);

      setSelectedPath(currentPath);
      await invoke("update_download_path", { path: currentPath });
      console.log("Download directory set to:", currentPath);
    } catch (error) {
      console.error("Error invoking update_download_path:", error);
    }
  };

  const downloadClickHandler = async () => {
    if (URL.trim().length === 0) {
      setWarning(true);
      return;
    }

    const response = await invoke("fetch_file_info", { url: URL });
    console.log("Input Value:", response);
    setURL("");

    if (!response.file_name) {
      console.log("Invalid URL");
      return;
    }

    await pathSelector(response);

    const filePayload = {
      file_name: response.file_name,
      time_of_creation: Date.now(),
      total_size: response.file_size,
      completion_status: "Processing",
      avg_upload_speed: 0,
      avg_download_speed: 0,
    };

    await invoke("download_test", { url: URL, filePayload });
  };

  const handleInputChange = (event) => {
    setURL(event.target.value);
    if (event.target.value.trim().length > 0) {
      setWarning("");
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await downloadClickHandler();
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
          {filteredType}
        </h2>
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
            { icon: faDownload, onClick: downloadClickHandler },
            { icon: faPlay },
            { icon: faPause },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="p-3 m-1 rounded-lg w-10 h-10 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 flex justify-center items-center border border-transparent hover:border-zinc-300"
            >
              <FontAwesomeIcon icon={item.icon} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
