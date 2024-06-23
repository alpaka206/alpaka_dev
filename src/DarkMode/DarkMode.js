import React, { useState, useEffect } from "react";
import "./DarkMode.css";

const DarkMode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="dark-mode-container">
      <h1>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</h1>
      <div className="toggle-switch">
        <input
          type="checkbox"
          id="theme-toggle"
          className="toggle-input"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <label htmlFor="theme-toggle" className="toggle-label">
          <span className="toggle-button" />
        </label>
      </div>
    </div>
  );
};

export default DarkMode;
