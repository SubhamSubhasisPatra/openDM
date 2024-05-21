import React, {useState} from "react";
import URLManager from "../URLManager/URLManager";
import DownloadList from "../DownloadList/DownloadList";
import AllDM from "../AllDM/AllDM";
import {SidePanel} from "../SidePanel/SidePanel.jsx";
import {MainPanel} from "../MainPanel/MainPanel.jsx";

export default function Home() {

    return (
        <div className="flex h-screen bg-zinc-800">
            <SidePanel/>
            <MainPanel/>
        </div>
    );
}
