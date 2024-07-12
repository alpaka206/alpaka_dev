// Loading.js
import React, { useState, useEffect } from "react";
import "./Loading.css";

const Loading = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset < 100 ? prevOffset + 1 : -100));
    }, 15);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="loading-container">
      <div
        className="loading-bar first-loading-bar"
        style={{ backgroundPositionX: `${offset}%` }}
      />
      <div
        className="loading-bar second-loading-bar"
        style={{ backgroundPositionX: `${offset}%` }}
      />
      <div
        className="loading-bar third-loading-bar"
        style={{ backgroundPositionX: `${offset}%` }}
      />
    </div>
  );
};

export default Loading;
