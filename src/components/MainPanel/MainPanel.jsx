import React, {useState} from 'react'
import DownloadList from "../DownloadList/DownloadList.jsx";
import URLManager from "../URLManager/URLManager.jsx";

export const MainPanel = () => {

  const [filesList, setFilesList] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [filteredType, setFilteredType] = useState(0);

  const handleDelete = (id) => {
    setFilesList(prevList => prevList.filter(file => file.id !== id));
  };


  return (<div className="flex-1 bg-white p-4 rounded-l-lg border-l-2 border-t-2">
    <URLManager onDWLDListChange={(list) => setFilesList(list)} filteredCount={filteredCount}
                filteredType={filteredType}/>
    <DownloadList fileList={filesList}
                  onFilterCountChange={setFilteredCount}
                  onFilterTypeChange={setFilteredType}
                  onDelete={handleDelete}
    />
  </div>);
}

