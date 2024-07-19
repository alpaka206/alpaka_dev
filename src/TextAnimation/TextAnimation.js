import React from "react";
import "./TextAnimation.css";

export default function TextAnimation() {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="TextAnimation">
      <div className="container">
        <div className="box">
          {items.map((i) => (
            <span key={i} style={{ "--i": i }}>
              <i style={{ "--color": "var(--color1)" }}>REACT</i>
              <i style={{ "--color": "var(--color2)" }}>||</i>
              <i style={{ "--color": "var(--color3)" }}>CSS</i>
              <i style={{ "--color": "var(--color2)" }}>||</i>
              <i style={{ "--color": "var(--color4)" }}>@ALPAKA_DEV</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
