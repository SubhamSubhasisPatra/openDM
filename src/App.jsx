import React, { useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import WindowControls from "./components/WindowControls/WindowControls";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="app">
      <div>
        <WindowControls />
      </div>
      <div className="py-10">
        <Home />
      </div>
    </div>
  );
}

export default App;
