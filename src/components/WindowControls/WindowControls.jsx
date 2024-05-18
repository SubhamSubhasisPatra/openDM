// WindowControls.js
import React, { useEffect } from "react";
import { appWindow } from "@tauri-apps/api/window";
import closeIcon from "../../assets/windows/close.png";
import minimizeIcon from "../../assets/windows/minimize.png";
import maximizeIcon from "../../assets/windows/maximize.png";
import "./WindowControls.css";
import ToggleButton from "../ToggleButton/ToggleButton";

export default function WindowControls() {
  return (
    <div className="titlebar" data-tauri-drag-region="true">
      <div className="window-controls">
        {/* <ToggleButton /> */}
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
