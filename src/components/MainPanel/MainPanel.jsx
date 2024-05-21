import React, {useState} from 'react'
import DownloadList from "../DownloadList/DownloadList.jsx";
import URLManager from "../URLManager/URLManager.jsx";

export const MainPanel = () => {

    const [filesList, setFilesList] = useState([]);


    return (
        <div className="flex-1 bg-white p-4">
            <URLManager onDWLDListChange={(list) => setFilesList(list)}/>
            <DownloadList fileList={filesList}/>
        </div>
    );
}
