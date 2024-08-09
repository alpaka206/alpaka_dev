import React from "react";
import Cell from "./Cell";
import "../css/Stage.css";

const Stage = ({ stage }) => (
  <div
    className="stage"
    style={{ gridTemplateColumns: `repeat(${stage[0].length}, 1fr)` }}
  >
    {stage.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </div>
);

export default Stage;
