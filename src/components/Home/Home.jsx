import React from "react";
import URLManager from "../URLManager/URLManager";
import DownloadList from "../DownloadList/DownloadList";
import AllDM from "../AllDM/AllDM";

export default function Home() {
  return (
    <div className="mx-auto p-6">
      <URLManager />
      <AllDM />
      <DownloadList />
    </div>
  );
}
