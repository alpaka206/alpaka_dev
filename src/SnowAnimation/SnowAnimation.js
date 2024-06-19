// SnowAnimation.js
import React from "react";
import "./SnowAnimation.css";

const Snowflake = ({ style }) => {
  return (
    <p className="snow-flake" style={style}>
      {"\u2745"}
      {/* {"💧"} */}
    </p>
  );
};

const makeSnowFlakes = () => {
  let animationDelay = "0s";
  let fontSize = "14px";
  let leftPosition = "0px"; // 눈송이의 위치를 랜덤하게 설정
  const arr = Array.from("Snow Animation");

  return arr.map((el, i) => {
    animationDelay = `${(Math.random() * 16).toFixed(2)}s`; // 0~16초 사이의 랜덤 시간
    fontSize = `${Math.floor(Math.random() * 10) + 50}px`; // 10~20px 사이의 랜덤 폰트 크기
    leftPosition = `${Math.random() * 100}vw`; // 화면의 좌우로 랜덤하게 배치
    const style = {
      animationDelay,
      fontSize,
      left: leftPosition,
    };
    return <Snowflake key={i} style={style} />;
  });
};

const SnowAnimation = () => (
  <div className="snow-background">
    <div className="snow-container">{makeSnowFlakes()}</div>
  </div>
);

export default SnowAnimation;
