// WindowControls.js
import React, { useEffect, useState, useMemo } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";
import closeIcon from "../../assets/windows/close.png";
import minimizeIcon from "../../assets/windows/minimize.png";
import maximizeIcon from "../../assets/windows/maximize.png";
import "./WindowControls.css";
import { MAC_OS } from "../../common/constants";

export default function WindowControls() {
  const [osPlatform, setOsPlatform] = useState(null);

  useEffect(() => {
    async function fetchPlatform() {
      const os = await invoke("get_os");
      setOsPlatform(os);
    }
    fetchPlatform();
  }, []);

  const memoizedPlatform = useMemo(() => osPlatform, [osPlatform]);
  const styleName = memoizedPlatform === MAC_OS ? "flex-start" : "flex-end";

  return (
    <div
      className="titlebar"
      style={{ justifyContent: styleName }}
      data-tauri-drag-region="true"
    >
      <div className="window-controls">
        <div className="window-button" onClick={() => appWindow.close()}>
          <img src={closeIcon} alt="Close" className="window-icon" />
        </div>
        <div className="window-button" onClick={() => appWindow.minimize()}>
          <img src={minimizeIcon} alt="Minimize" className="window-icon" />
        </div>
        <div
          className="window-button"
          onClick={() => appWindow.toggleMaximize()}
        >
          <img src={maximizeIcon} alt="Maximize" className="window-icon" />
        </div>
      </div>
    </div>
  );
}
