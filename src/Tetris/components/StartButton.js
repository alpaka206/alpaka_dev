import React from "react";
import "../css/StartButton.css";

const StartButton = ({ callback }) => (
  <button className="start-button" onClick={callback}>
    Start Game
  </button>
);

export default StartButton;
