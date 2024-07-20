import React, { useEffect } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    const onMouseMove = (event) => {
      cursor.style.top = `${event.clientY - cursor.offsetHeight / 2}px`;
      cursor.style.left = `${event.clientX - cursor.offsetWidth / 2}px`;
    };

    document.addEventListener("mousemove", onMouseMove);

    // 마우스 커서를 숨깁니다.
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      // 컴포넌트가 언마운트될 때 마우스 커서를 복원합니다.
      document.body.style.cursor = "default";
    };
  }, []);

  return <div className="custom-cursor"></div>;
};

export default CustomCursor;
