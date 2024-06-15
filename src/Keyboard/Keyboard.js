import React from "react";
import "./Keyboard.css";

const Keyboard = () => {
  const fullKeys = [
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "BACK"],
    ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "ENTER"],
    ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "SHIFT"],
    ["CTRL", "WIN", "ALT", "SPACE", "ENG", "ALT", "FN", "CTRL"],
  ];

  const longKeys = ["TAB", "BACK", "CAPS", "ENTER"];

  return (
    <div className="keyboard">
      {fullKeys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboardRow">
          {row.map((key, keyIndex) => (
            <div
              key={keyIndex}
              className={`keyboardKey ${
                longKeys.includes(key) ? "longKey" : ""
              } ${key === "ENTER" ? "enterKey" : ""} ${
                key === "SPACE" ? "spaceKey" : ""
              } ${key === "SHIFT" ? "shiftKey" : ""}`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
