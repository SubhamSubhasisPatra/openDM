// WindowControls.js
import React, { useEffect } from "react";
import { appWindow } from "@tauri-apps/api/window";
import closeIcon from "../../assets/windows/close.png";
import minimizeIcon from "../../assets/windows/minimize.png";
import maximizeIcon from "../../assets/windows/maximize.png";
import "./WindowControls.css";

export default function WindowControls() {
  const handleMinimize = () => appWindow.minimize();
  const handleMaximize = () => appWindow.toggleMaximize();
  const handleClose = () => appWindow.close();

  return (
    <div className="titlebar" data-tauri-drag-region="true">
      <div className="window-controls">
        <div className="window-button" onClick={handleClose}>
          <img src={closeIcon} alt="Close" className="window-icon" />
        </div>
        <div className="window-button" onClick={handleMinimize}>
          <img src={minimizeIcon} alt="Minimize" className="window-icon" />
        </div>
        <div className="window-button" onClick={handleMaximize}>
          <img src={maximizeIcon} alt="Maximize" className="window-icon" />
        </div>
      </div>
    </div>
  );
}
