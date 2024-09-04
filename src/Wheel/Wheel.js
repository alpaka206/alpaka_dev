import React, { useState, useRef, useEffect } from "react";
import "./Wheel.css";

const Wheel = () => {
  const [options, setOptions] = useState([
    "옵션 1",
    "옵션 2",
    "옵션 3",
    "옵션 4",
    "옵션 5",
  ]);
  const [rotationAngle, setRotationAngle] = useState(0); // 회전 각도를 저장하는 상태
  const canvasRef = useRef(null);
  const pointerOffset = 90; // 포인터 보정 각도 (12시 방향을 기준으로 90도 보정)

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const [cw, ch] = [canvas.width / 2, canvas.height / 2];
    const arc = (2 * Math.PI) / options.length;
    const colors = [
      "#dc0936",
      "#e6471d",
      "#f7a416",
      "#efe61f",
      "#60b236",
      "#209b6c",
      "#169ed8",
      "#3f297e",
      "#87207b",
      "#be107f",
      "#e7167b",
    ];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw slices
    for (let i = 0; i < options.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(cw, ch);
      ctx.arc(cw, ch, cw, arc * i, arc * (i + 1));
      ctx.lineTo(cw, ch);
      ctx.fill();
      ctx.closePath();
    }

    // Draw center text for each option
    ctx.fillStyle = "#fff";
    ctx.font = "18px Pretendard";
    ctx.textAlign = "center";

    for (let i = 0; i < options.length; i++) {
      const angle = arc * i + arc / 2;

      ctx.save();
      ctx.translate(
        cw + Math.cos(angle) * (cw - 50),
        ch + Math.sin(angle) * (ch - 50)
      );
      ctx.rotate(angle + Math.PI / 2);

      ctx.fillText(options[i], 0, 0);

      ctx.restore();
    }
  };

  const rotateWheel = () => {
    const canvas = canvasRef.current;
    const arc = 360 / options.length;
    const randomIndex = Math.floor(Math.random() * options.length); // 랜덤으로 선택된 옵션의 인덱스
    const spinAngle = randomIndex * arc + 3600; // Ensure multiple spins
    const newRotationAngle = rotationAngle + spinAngle; // 누적 각도 계산

    canvas.style.transition = "transform 2s ease-out";
    canvas.style.transform = `rotate(${newRotationAngle}deg)`;

    // 회전이 완료된 후, 결과 옵션을 계산
    setTimeout(() => {
      const finalAngle = (newRotationAngle + pointerOffset) % 360; // 포인터 보정 각도 적용
      const selectedIndex = Math.floor(
        (options.length - finalAngle / arc) % options.length
      );
      alert(`결과는?! ${options[selectedIndex]} 입니다!`);
    }, 2000);

    setRotationAngle(newRotationAngle); // 회전이 끝난 후 새로운 각도 저장
  };

  useEffect(() => {
    drawWheel();
  }, [options]);

  const handleNumOptionsChange = (type) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      if (type === "increase" && newOptions.length < 8) {
        newOptions.push(`옵션 ${newOptions.length + 1}`);
      } else if (type === "decrease" && newOptions.length > 2) {
        newOptions.pop();
      }
      return newOptions;
    });
  };

  const isSpinDisabled = options.length < 2;
  const isIncreaseDisabled = options.length >= 8;
  const isDecreaseDisabled = options.length <= 2;

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  return (
    <div className="wheel-container">
      <div className="controls">
        <button
          className={`control-button ${isDecreaseDisabled ? "disabled" : ""}`}
          onClick={() => handleNumOptionsChange("decrease")}
          disabled={isDecreaseDisabled}
        >
          -
        </button>
        <span>{options.length} 개</span>
        <button
          className={`control-button ${isIncreaseDisabled ? "disabled" : ""}`}
          onClick={() => handleNumOptionsChange("increase")}
          disabled={isIncreaseDisabled}
        >
          +
        </button>
      </div>
      <div className="wheel-wrapper">
        <canvas ref={canvasRef} width={380} height={380} />
        <div className="wheel-pointer"></div>
      </div>
      <div className="options-list">
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
            className="option-input"
          />
        ))}
      </div>
      <button
        className={`spin-button ${isSpinDisabled ? "disabled" : ""}`}
        onClick={rotateWheel}
        disabled={isSpinDisabled}
      >
        돌리기
      </button>
    </div>
  );
};

export default Wheel;
