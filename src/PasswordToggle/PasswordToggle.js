import React, { useEffect, useState } from "react";
import CharacterReveal from "./CharacterReveal/CharacterReveal";
import AsciiCharacterReveal from "./AsciiCharacterReveal/AsciiCharacterReveal";
import "./PasswordToggle.css";

const PasswordToggle = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [AsciiPassword, setAsciiPassword] = useState("");
  const [CharacterRevealIndex, setCharacterRevealIndex] = useState(0);
  const [AsciiCharacterRevealIndex, setAsciiCharacterRevealIndex] = useState(0);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setCharacterRevealIndex(0); // 비밀번호 표시 상태 변경 시 인덱스 초기화
    setAsciiCharacterRevealIndex(0); // 비밀번호 표시 상태 변경 시 인덱스 초기화
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setCharacterRevealIndex(0); // 비밀번호 변경 시 인덱스 초기화
  };

  const handleAsciiPasswordChange = (e) => {
    setAsciiPassword(e.target.value);
    setAsciiCharacterRevealIndex(0); // 비밀번호 변경 시 인덱스 초기화
  };

  const handleCharacterRevealComplete = () => {
    setCharacterRevealIndex((prevIndex) => prevIndex + 1); // 다음 문자로 이동
  };

  useEffect(() => {
    if (isPasswordVisible && AsciiCharacterRevealIndex < AsciiPassword.length) {
      const timer = setTimeout(() => {
        setAsciiCharacterRevealIndex((prevIndex) => prevIndex + 1);
      }, 200); // 0.5초마다 다음 문자로 이동
      return () => clearTimeout(timer);
    }
  }, [AsciiCharacterRevealIndex, isPasswordVisible, AsciiPassword.length]);

  return (
    <div className="password-toggle">
      <div className="password-wrapper">
        <input
          type="password"
          className={`password-input ${isPasswordVisible ? "hide" : ""}`}
          placeholder=""
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          className={`password-input ${isPasswordVisible ? "hide" : ""}`}
          placeholder=""
          value={AsciiPassword}
          onChange={handleAsciiPasswordChange}
        />
        {isPasswordVisible && (
          <div className="password-text-wrapper">
            <div className="password-text">
              {password.split("").map((char, index) => (
                <CharacterReveal
                  key={index}
                  targetChar={char}
                  onComplete={handleCharacterRevealComplete}
                  isCurrent={index === CharacterRevealIndex}
                />
              ))}
            </div>
          </div>
        )}
        {isPasswordVisible && (
          <div className="password-text-wrapper">
            <div className="password-text">
              {AsciiPassword.split("").map((char, index) => (
                <AsciiCharacterReveal
                  key={index}
                  targetChar={char}
                  onComplete={() => {}}
                  isCurrent={index === AsciiCharacterRevealIndex}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <button onClick={togglePasswordVisibility} className="toggle-button">
        {isPasswordVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default PasswordToggle;
