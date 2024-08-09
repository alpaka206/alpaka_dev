import React from "react";
import { TETROMINOS } from "../utils/tetrominos";
import "../css/Cell.css";

const Cell = ({ type }) => (
  <div
    className={`cell cell-${type}`}
    style={{ backgroundColor: `rgba(${TETROMINOS[type].color}, 0.8)` }}
  >
    {/* {console.log("rerender cell")} */}
  </div>
);

export default React.memo(Cell);
