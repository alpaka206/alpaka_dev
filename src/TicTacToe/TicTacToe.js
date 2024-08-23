import React from "react";
import Board from "./components/Board";
import "./TicTacToe.css";

export default function TicTacToe() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
