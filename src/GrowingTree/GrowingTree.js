import React, { useCallback, useEffect, useRef } from "react";
import "./GrowingTree.css";
import Tree from "./Tree";
import debounce from "lodash.debounce"; // lodash의 debounce 함수 사용

const GrowingTree = () => {
  const canvasRef = useRef(null); // 캔버스 DOM을 참조하기 위한 Ref
  const ctxRef = useRef(null); // 캔버스의 2D 컨텍스트를 참조하기 위한 Ref
  const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1; // 고해상도 디스플레이 대응을 위한 픽셀 비율 설정

  // 캔버스 크기 조정 함수
  const resize = useCallback(
    debounce(() => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;

      const stageWidth = document.body.clientWidth; // 화면 너비
      const stageHeight = document.body.clientHeight; // 화면 높이

      canvas.width = stageWidth * pixelRatio; // 픽셀 비율에 맞춘 캔버스 너비
      canvas.height = stageHeight * pixelRatio; // 픽셀 비율에 맞춘 캔버스 높이
      ctx.scale(pixelRatio, pixelRatio); // 픽셀 비율에 따라 스케일링

      ctx.clearRect(0, 0, stageWidth, stageHeight); // 캔버스 초기화
    }, 100), // 100ms 지연 시간
    []
  );

  // 클릭 이벤트 핸들러
  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    const { clientX } = event; // 클릭 위치의 X 좌표
    Tree(ctx, clientX, canvas.height / pixelRatio); // Tree 함수 호출
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth; // 초기 캔버스 너비 설정
    canvas.height = window.innerHeight; // 초기 캔버스 높이 설정
    ctxRef.current = canvas.getContext("2d"); // 2D 컨텍스트 설정

    window.addEventListener("resize", resize); // 리사이즈 이벤트 리스너 추가
    window.addEventListener("click", handleClick); // 클릭 이벤트 리스너 추가

    // 초기 리사이즈 실행
    resize();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
    };
  }, [resize]);

  return <canvas ref={canvasRef} className="canvas"></canvas>; // 캔버스 렌더링
};

export default GrowingTree;
