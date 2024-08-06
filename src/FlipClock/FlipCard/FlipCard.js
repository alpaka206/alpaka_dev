import React from "react";
import "./FlipCard.css";

const FlipCard = ({ counter }) => {
  return (
    <ul className="flip-card-ul">
      {[...Array(10).keys()].map((num) => (
        <li
          key={num}
          className={`flip-card-li ${
            num === Math.floor(counter) ? "front" : ""
          } ${num === (Math.floor(counter) + 1) % 10 ? "back" : ""}`}
        >
          <div className="upper">
            <div className="num">{num}</div>
          </div>
          <div className="lower">
            <div className="num">{num}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FlipCard;
