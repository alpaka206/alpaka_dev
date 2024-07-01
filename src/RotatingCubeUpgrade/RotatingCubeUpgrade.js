import React from "react";
import "./RotatingCubeUpgrade.css";

import AxiosLogo from "./images/AxiosLogo.png";
import CssLogo from "./images/CssLogo.png";
import JsLogo from "./images/JsLogo.png";
import NextLogo from "./images/NextLogo.png";
import ReactLogo from "./images/ReactLogo.png";
import RecoilLogo from "./images/RecoilLogo.png";
import TsLogo from "./images/TsLogo.png";
import VanilaExtractLogo from "./images/VanillaExtractLogo.png";
import ViteLogo from "./images/ViteLogo.png";

const RotatingCubeUpgrade = () => {
  const logos = [
    AxiosLogo,
    CssLogo,
    JsLogo,
    NextLogo,
    ReactLogo,
    RecoilLogo,
    TsLogo,
    VanilaExtractLogo,
    ViteLogo,
  ];
  const styles = [
    { "--i": 0, top: "8vh" },
    { "--i": 20, top: "3vh" },
    { "--i": 40, top: "12vh" },
    { "--i": 60, top: "7vh" },
    { "--i": 80, top: "1vh" },
    { "--i": 100, top: "9vh" },
    { "--i": 120, top: "4vh" },
    { "--i": 140, top: "3vh" },
    { "--i": 160, top: "2vh" },
    { "--i": 180, top: "9vh" },
    { "--i": 200, top: "11vh" },
    { "--i": 220, top: "2vh" },
    { "--i": 240, top: "7vh" },
    { "--i": 260, top: "8vh" },
    { "--i": 280, top: "1vh" },
    { "--i": 300, top: "2vh" },
    { "--i": 320, top: "12vh" },
    { "--i": 340, top: "2vh" },
  ];
  return (
    <div className="satellites">
      {styles.map((style, index) => (
        <img
          key={index}
          className="satellite"
          style={style}
          src={logos[index % logos.length]}
        />
      ))}
    </div>
  );
};

export default RotatingCubeUpgrade;
