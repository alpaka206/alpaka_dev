import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((value, colIndex) => (
            <Tile key={colIndex} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
