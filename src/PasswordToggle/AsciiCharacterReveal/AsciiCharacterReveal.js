import React, { useState, useEffect } from "react";

const AsciiCharacterReveal = ({ targetChar, isCurrent, onComplete }) => {
  const [displayChar, setDisplayChar] = useState("·");
  const asciiOffset = [-5, -11, 4, 0];
  let index = 0;

  useEffect(() => {
    if (isCurrent) {
      const interval = setInterval(() => {
        let newCharCode = targetChar.charCodeAt(0) + asciiOffset[index];
        if (newCharCode < 32) newCharCode += 95; // 제어 문자를 피하기 위해 순환
        if (newCharCode > 126) newCharCode -= 95; // 제어 문자를 피하기 위해 순환
        setDisplayChar(String.fromCharCode(newCharCode));

        if (index === asciiOffset.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
        } else {
          index = (index + 1) % asciiOffset.length;
        }
      }, 50); // 애니메이션 속도 조절
      return () => clearInterval(interval);
    } else if (displayChar === ".") {
      setDisplayChar(".");
    }
  }, [isCurrent, targetChar, onComplete]);

  return <span className="char">{displayChar}</span>;
};

export default AsciiCharacterReveal;
