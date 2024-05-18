import React, { useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import WindowControls from "./components/WindowControls/WindowControls";

function App() {
 
  return (
    <div className="app">
      <WindowControls />
    </div>
  );
}

export default App;
