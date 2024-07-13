import React from "react";
import "./RotatingCube.css";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";

const RotatingCube = () => {
  return (
    <div className="box">
      <img className="face face1" src={image1} alt="1" />
      <img className="face face2" src={image2} alt="2" />
      <img className="face face3" src={image3} alt="3" />
      <img className="face face4" src={image4} alt="4" />
      <img className="face face5" src={image1} alt="5" />
      <img className="face face6" src={image2} alt="6" />
      <img className="face face7" src={image3} alt="7" />
      <img className="face face8" src={image4} alt="8" />
    </div>
  );
};

export default RotatingCube;
