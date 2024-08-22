import React, { useState, useEffect } from "react";
import "./MorseConverter.css"; // CSS 파일 import
import { morseCode } from "./morseCode";

// 모스 부호와 문자 간 매핑
const morseCodeToText = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
};

// 소리 재생 함수 (점, 대시 소리)
function playTone(frequency, duration) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = "sine"; // 소리 타입 선택
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // 주파수 설정
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
  }, duration);
}

// 모스 부호 전체를 재생하는 함수
function playMorseCode(text) {
  let index = 0;

  function playNext() {
    if (index >= text.length) return;

    const character = text[index].toUpperCase();
    const morse = morseCode[character];

    if (morse) {
      let delay = 0;

      for (let i = 0; i < morse.length; i++) {
        const symbol = morse[i];
        const duration = symbol === "." ? 100 : 300;
        setTimeout(() => playTone(500, duration), delay);
        delay += duration + 40; // 심볼 간 간격 추가
      }

      // 문자 간 간격 추가
      setTimeout(() => {
        index++;
        playNext();
      }, delay + 200);
    } else {
      // 알파벳이 아닌 경우에도 다음 문자로 넘어가기
      index++;
      playNext();
    }
  }

  playNext();
}

function MorseConverter() {
  const [inputMorse, setInputMorse] = useState("");
  const [text, setText] = useState("");
  const [isPressing, setIsPressing] = useState(false);
  const [pressStartTime, setPressStartTime] = useState(0);

  // 키다운 이벤트 처리
  const handleKeyDown = (e) => {
    if (e.code === "Space" && !isPressing) {
      setIsPressing(true);
      setPressStartTime(Date.now());
    }
  };

  // 키업 이벤트 처리
  const handleKeyUp = (e) => {
    if (e.code === "Space" && isPressing) {
      const pressDuration = Date.now() - pressStartTime;
      setIsPressing(false);

      if (pressDuration < 150) {
        setInputMorse((prev) => prev + ".");
        playTone(500, 100); // 점에 해당하는 소리
      } else {
        setInputMorse((prev) => prev + "-");
        playTone(500, 300); // 대시에 해당하는 소리
      }
    }
  };

  // 입력이 멈추면 모스 부호를 문자로 변환
  useEffect(() => {
    if (inputMorse) {
      const timer = setTimeout(() => {
        setText((prev) => prev + (morseCodeToText[inputMorse] || ""));
        setInputMorse("");
      }, 900); // 1초 동안 입력이 없으면 변환

      return () => clearTimeout(timer);
    }
  }, [inputMorse]);

  return (
    <div className="MorseConvertercontainer">
      <div className="morse-input-container">
        <h3>모스 부호 입력</h3>
        <input
          type="text"
          value={inputMorse}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          placeholder="스페이스바: 점, 길게 누르면 바"
          className="input"
          readOnly
        />
        <p>변환된 텍스트: {text}</p>
        <button onClick={() => playMorseCode(text)}>Play Morse Code</button>
      </div>
    </div>
  );
}

export default MorseConverter;
