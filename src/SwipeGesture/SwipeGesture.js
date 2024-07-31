import React, { useState } from "react";
import OnboardingBox from "./SwipeGestureBox/SwipeGestureBox";
import "./SwipeGesture.css";

const SwipeGesture = () => {
  const [steps, setSteps] = useState([
    { id: 1, text: "환영합니다!", text2: "옆으로 밀기" },
    { id: 2, text: "Welcome!", text2: "Swipe right" },
    { id: 3, text: "ようこそ!", text2: "右にスワイプ" },
    { id: 4, text: "欢迎!", text2: "向右滑动" },
    { id: 5, text: "¡Bienvenido!", text2: "Desliza a la derecha" },
    { id: 6, text: "Bienvenue!", text2: "Glisser à droite" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleDismiss = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="onboarding-container">
      {steps.reverse().map((step, index) => (
        <OnboardingBox
          key={step.id}
          content={step.text}
          contentsecond={step.text2}
          onDismiss={handleDismiss}
          index={index}
        />
      ))}
    </div>
  );
};

export default SwipeGesture;
