// WindowControls.js
import React from "react";
import { appWindow } from "@tauri-apps/api/window";
import "./WindowControls.css";

export default function WindowControls() {

    const handleMinimize = () => appWindow.minimize();
    const handleMaximize = () => appWindow.toggleMaximize();
    const handleClose = () => appWindow.close();
  
    return (
      <div className="titlebar">
        <div className="window-controls">
        <div className="draggable-area"></div>
          <button className="window-button close" onClick={handleClose} />
          <button className="window-button minimize" onClick={handleMinimize} />
          <button className="window-button maximize" onClick={handleMaximize} />
        </div>
      </div>
    );
}
