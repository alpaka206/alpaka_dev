import React from "react";
import "./Book.css";

const Book = () => {
  return (
    <div className="BookStyle">
      <div className="springStyle">
        {Array.from({ length: 18 }).map((_, index) => (
          <div key={index} className="springSegment"></div>
        ))}
      </div>
      <div className="redLine"></div>
      <div className="linesStyle"></div>
    </div>
  );
};

export default Book;
