import React, { useState, useEffect } from "react";
import "./Position.css";

function Position() {
  const positions = [
    {
      name: "Static",
      description:
        "기본값, 요소들이 HTML에 작성된 순서 그대로 브라우저 화면에 표시 ",
      className: "static",
    },
    {
      name: "Relative",
      description:
        "요소를 원래 위치에서 벗어나게 배치, 원래 위치를 기준으로 상대적으로 배치",
      className: "relative",
    },
    {
      name: "Absolute",
      description:
        "요소는 일반적인 문서 흐름에서 제거, 가장 가까운 상위 요소(부모 요소)에 대해 상대적으로 배치",
      className: "absolute",
    },
    {
      name: "Fixed",
      description:
        "요소는 일반적인 문서 흐름에서 제거, 뷰포트에 대해 상대적으로 배치, 스크롤해도 고정된 위치",
      className: "fixed",
    },
    {
      name: "Sticky",
      description:
        "브라우저 화면을 스크롤링할 때 효과, 특정 조건이 만족될 때까지만 고정되고 그 이후에는 다시 스크롤과 함께 이동",
      className: "sticky",
    },
  ];

  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPositionIndex((prevIndex) =>
        prevIndex < positions.length - 1 ? prevIndex + 1 : 0
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const { name, description, className } = positions[currentPositionIndex];

  return (
    <div className="container">
      <h2>{name} Position</h2>
      <p>{description}</p>
      <div>
        <div className={`box static`}>position: static;</div>
        <div className={`box ${className}`}>position: {name};</div>
        <div className={`box static`}>position: static;</div>
        <div className={`box static`}>position: static;</div>
        <div className={`box static`}>position: static;</div>
      </div>
    </div>
  );
}

export default Position;
