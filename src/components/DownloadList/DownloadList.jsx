import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {invoke} from '@tauri-apps/api/tauri';
import {SelectedItemContext} from '../../contexts/SelectedItemContext.jsx';
import {FILTER_ALL} from '../../common/constants/index.js';
import MultipartProgressBar from './MultipartProgressBar/MultipartProgressBar.jsx';

const DownloadList = ({fileList, onFilterCountChange, onFilterTypeChange, onDelete}) => {
  const {selectedItem} = useContext(SelectedItemContext);

  // Initialize downloadList based on selectedItem
  const getInitialDownloadList = () => {
    if (selectedItem === FILTER_ALL || !selectedItem) {
      return fileList;
    }
    return fileList.filter(ele => ele.status === selectedItem);
  };

  const [downloadList, setDownloadList] = useState(getInitialDownloadList);

  const downloadFilter = selectedFilter => {
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

  const deleteHandler = async id => {
    try {
      await invoke('delete_file', {id});
      onDelete(id); // Update the parent state
    } catch (error) {
      console.error("Failed to delete the file", error);
    }
  };

  return (<div className="h-screen overflow-y-auto scrollbar-hide">
      <table className="min-w-full bg-white dark:bg-zinc-800">
        <thead className="sticky top-0 bg-white dark:bg-zinc-900">
        <tr>
          <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Filename</th>
          <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Status</th>
          <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Speed</th>
          <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Size</th>
          <th className="px-4 py-2 text-left text-zinc-600 dark:text-zinc-400">Action</th>
        </tr>
        </thead>
        <tbody>
        {downloadList && downloadList.map((file, index) => {
          const statusPrev = `${file.status}%`;
          return (<React.Fragment key={index}>
              <tr className="border-t border-zinc-200 dark:border-zinc-700">
                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">{file.file_name}</td>
                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">{file.completion_status}</td>
                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">{file.avg_download_speed}</td>
                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">{file.total_size}</td>
                <td className="px-4 py-2 text-zinc-800 dark:text-zinc-200">
                  <button onClick={() => deleteHandler(file.id)}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="px-4 py-2">
                  <MultipartProgressBar numParts={Math.floor(Math.random() * 10) + 1}/>
                </td>
              </tr>
            </React.Fragment>);
        })}
        </tbody>
      </table>
    </div>);
};

export default DownloadList;
