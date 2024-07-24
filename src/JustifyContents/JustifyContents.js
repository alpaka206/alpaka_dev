// src/JustifyContents.js
import React, { useEffect, useState } from "react";
import "./JustifyContents.css";

const JustifyContents = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000); // 1초 후에 애니메이션 시작

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="JustifyContents">
      <div className="JustifyContentscontainer">
        <div className="JustifyContentsText">start</div>

        <div className={`item-container ${animate ? "start" : ""}`}>
          <div className="item">😃</div>
          <div className="item">😃</div>
          <div className="item">😃</div>
        </div>
      </div>
      <div className="JustifyContentscontainer">
        <div className="JustifyContentsText">center</div>

        <div className={`item-container ${animate ? "center" : ""}`}>
          <div className="item">😃</div>
          <div className="item">😃</div>
          <div className="item">😃</div>
        </div>
      </div>
      <div className="JustifyContentscontainer">
        <div className="JustifyContentsText"> end</div>

        <div className={`item-container ${animate ? "end" : ""}`}>
          <div className="item">😃</div>
          <div className="item">😃</div>
          <div className="item">😃</div>
        </div>
      </div>
      <div className="JustifyContentscontainer">
        <div className="JustifyContentsText"> space-between</div>

        <div className={`item-container ${animate ? "space-between" : ""}`}>
          <div className="item">😃</div>
          <div className="item">😃</div>
          <div className="item">😃</div>
        </div>
      </div>
      <div className="JustifyContentscontainer">
        <div className="JustifyContentsText"> space-around</div>

        <div className={`item-container ${animate ? "space-around" : ""}`}>
          <div className="item">😃</div>
          <div className="item">😃</div>
          <div className="item">😃</div>
        </div>
      </div>
      <div className="JustifyContentscontainer">
        <div className="JustifyContentsText">space-evenly</div>

        <div className={`item-container ${animate ? "space-evenly" : ""}`}>
          <div className="item">😃</div>
          <div className="item">😃</div>
          <div className="item">😃</div>
        </div>
      </div>
    </div>
  );
};

export default JustifyContents;
