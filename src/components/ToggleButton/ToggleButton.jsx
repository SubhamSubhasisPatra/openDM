// src/ToggleButton.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../icons"; // Import the icons configuration

export default function ToggleButton() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme} className="p-2">
      {theme === "light" ? (
        <FontAwesomeIcon icon="moon" />
      ) : (
        <FontAwesomeIcon icon="sun" />
      )}
    </button>
  );
}
