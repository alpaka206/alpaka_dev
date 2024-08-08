import React, { useState, useEffect } from "react";

const CharacterReveal = ({ targetChar, isCurrent, onComplete }) => {
  const [displayChar, setDisplayChar] = useState("·");
  const chars = "@_abcdefghijklmnopqrstuvwxyz";
  let index = 0;

  useEffect(() => {
    if (isCurrent) {
      const interval = setInterval(() => {
        setDisplayChar(chars[index]);
        if (chars[index] === targetChar) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
        } else {
          index = (index + 1) % chars.length;
        }
      }, 50); // 애니메이션 속도 조절
      return () => clearInterval(interval);
    } else if (displayChar !== targetChar) {
      setDisplayChar("·");
    }
  }, [isCurrent, targetChar, chars, onComplete]);

  return <span className="char">{displayChar}</span>;
};

export default CharacterReveal;
