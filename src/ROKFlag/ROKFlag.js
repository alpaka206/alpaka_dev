import React from "react";
// import "./ROKFlag.css";

const ROKFlag = () => {
  return (
    <div className="flag">
      <div className="taeguk">
        <div className="red-half"></div>
        <div className="red-small"></div>
        <div className="blue-half"></div>
        <div className="blue-small"></div>
      </div>
      <div className="trigram top-left">
        <div className="bar"></div>
        <div className="space"></div>
        <div className="bar"></div>
        <div className="space"></div>
        <div className="bar"></div>
        <div className="wave top-left-wave"></div>
      </div>
      <div className="trigram top-right">
        <div className="broken-bar"></div>
        <div className="space"></div>
        <div className="bar"></div>
        <div className="space"></div>
        <div className="broken-bar"></div>
        <div className="wave top-right-wave"></div>
      </div>
      <div className="trigram bottom-left">
        <div className="bar"></div>
        <div className="space"></div>
        <div className="broken-bar"></div>
        <div className="space"></div>
        <div className="bar"></div>
        <div className="wave bottom-left-wave"></div>
      </div>
      <div className="trigram bottom-right">
        <div className="broken-bar"></div>
        <div className="space"></div>
        <div className="broken-bar"></div>
        <div className="space"></div>
        <div className="broken-bar"></div>
        <div className="wave bottom-right-wave"></div>
      </div>
    </div>
  );
};

export default ROKFlag;
