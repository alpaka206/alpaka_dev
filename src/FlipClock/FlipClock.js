import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard/FlipCard";
import "./FlipClock.css";

const FlipClock = () => {
  const [seconds, setSeconds] = useState(3600); // 1시간 = 3600초

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          return prevSeconds;
        }
        return prevSeconds - 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds: sec } = formatTime(seconds);

  return (
    <div className="timer">
      <div className="time-section">
        <FlipCard counter={parseInt(hours[0], 10)} />
        <FlipCard counter={parseInt(hours[1], 10)} />
      </div>
      <span>:</span>
      <div className="time-section">
        <FlipCard counter={parseInt(minutes[0], 10)} />
        <FlipCard counter={parseInt(minutes[1], 10)} />
      </div>
      <span>:</span>
      <div className="time-section">
        <FlipCard counter={parseInt(sec[0], 10)} />
        <FlipCard counter={parseInt(sec[1], 10)} />
      </div>
    </div>
  );
};

export default FlipClock;
