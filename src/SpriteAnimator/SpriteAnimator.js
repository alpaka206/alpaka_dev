import React, { useEffect, useRef, useState } from "react";
import "./SpriteAnimator.css";
import image1 from "./images/image1.svg";
import image2 from "./images/image2.svg";
import image3 from "./images/image3.svg";
import image4 from "./images/image4.svg";
import image5 from "./images/image5.svg";
import image6 from "./images/image6.svg";
const imageFiles = [image1, image2, image3, image4, image5, image6];

const SpriteAnimator = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageFiles.length);
    }, 80); // 0.1초마다 이미지 변경 (fps 조절 가능)

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="sprite-animator">
      <img
        src={process.env.PUBLIC_URL + imageFiles[currentImage]}
        alt="sprite animation"
      />
    </div>
  );
};

export default SpriteAnimator;
