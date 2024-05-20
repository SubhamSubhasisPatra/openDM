import React, {useState} from "react";
import URLManager from "../URLManager/URLManager";
import DownloadList from "../DownloadList/DownloadList";
import AllDM from "../AllDM/AllDM";

export default function Home() {

    const [filesList, setFilesList] = useState([]);

    return (
        <div className="mx-auto p-6">
            <URLManager onDWLDListChange={(list) => setFilesList(list)}/>
            <AllDM/>
            <DownloadList fileList={filesList}/>
        </div>
    );
}
