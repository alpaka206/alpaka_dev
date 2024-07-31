import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./SwipeGestureBox.css";

const SwipeGestureBox = ({ content, onDismiss, index, contentsecond }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleSwipe = () => {
    setIsDismissed(true);
    setTimeout(onDismiss, 300); // 300ms 후에 onDismiss 호출
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipe,
    onSwipedRight: handleSwipe,
    trackMouse: true, // 마우스 이벤트도 추적하도록 설정
  });

  const offset = index * 10; // 각 박스의 인덱스에 따라 위치 오프셋 계산

  return (
    <div
      {...handlers}
      className={`onboarding-box ${isDismissed ? "dismissed" : ""}`}
      style={{ top: `${offset}px`, left: `${offset}px` }} // 인라인 스타일로 위치 설정
    >
      {content}
      <div className="OnboardingBox_slidetext">{contentsecond} >> </div>
    </div>
  );
};

export default SwipeGestureBox;
