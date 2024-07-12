import React, { useEffect, useRef } from "react";
import "./GrowingTree.css";
import Tree from "./Tree";

const GrowingTree = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  const resize = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    ctx.clearRect(0, 0, stageWidth, stageHeight);
  };

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    const { clientX } = event;
    Tree(ctx, clientX, canvas.height / pixelRatio); // 여기서 Tree를 함수로 호출
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext("2d");

    window.addEventListener("resize", resize);
    window.addEventListener("click", handleClick);

    // Initial resize
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas"></canvas>;
};

export default GrowingTree;
