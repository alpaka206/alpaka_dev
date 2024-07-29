import React, { useState, useEffect } from "react";
import Board from "./Board/Board";
import "./Game2048.css";

const Game2048 = () => {
  const [board, setBoard] = useState(generateInitialBoard());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => localStorage.getItem("highScore") || 0
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newBoard;
      if (event.key === "ArrowUp") {
        newBoard = moveUp(board);
      } else if (event.key === "ArrowDown") {
        newBoard = moveDown(board);
      } else if (event.key === "ArrowLeft") {
        newBoard = moveLeft(board);
      } else if (event.key === "ArrowRight") {
        newBoard = moveRight(board);
      }

      if (newBoard) {
        const newScore = calculateScore(newBoard);
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("highScore", newScore);
        }
        setBoard(newBoard);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, score, highScore]);

  return (
    <div className="game">
      <h1>2048</h1>
      <div className="score-board">
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
      <Board board={board} />
    </div>
  );
};

const generateInitialBoard = () => {
  const board = Array(4)
    .fill(null)
    .map(() => Array(4).fill(0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

const addRandomTile = (board) => {
  const emptyTiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyTiles.push([i, j]);
      }
    }
  }
  if (emptyTiles.length > 0) {
    const [x, y] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
  }
};

const moveLeft = (board) => {
  const newBoard = board.map((row) => {
    const newRow = row.filter((val) => val);
    while (newRow.length < 4) newRow.push(0);
    return newRow;
  });

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (newBoard[i][j] && newBoard[i][j] === newBoard[i][j + 1]) {
        newBoard[i][j] *= 2;
        newBoard[i][j + 1] = 0;
      }
    }
    const newRow = newBoard[i].filter((val) => val);
    while (newRow.length < 4) newRow.push(0);
    newBoard[i] = newRow;
  }

  addRandomTile(newBoard);
  return newBoard;
};

const moveRight = (board) => {
  const newBoard = board.map((row) => row.reverse());
  const newLeftBoard = moveLeft(newBoard);
  return newLeftBoard.map((row) => row.reverse());
};

const moveUp = (board) => {
  const newBoard = rotateLeft(board);
  const newLeftBoard = moveLeft(newBoard);
  return rotateRight(newLeftBoard);
};

const moveDown = (board) => {
  const newBoard = rotateRight(board);
  const newLeftBoard = moveLeft(newBoard);
  return rotateLeft(newLeftBoard);
};

const rotateLeft = (board) => {
  const newBoard = [];
  for (let i = 0; i < 4; i++) {
    newBoard[i] = [];
    for (let j = 0; j < 4; j++) {
      newBoard[i][j] = board[j][4 - i - 1];
    }
  }
  return newBoard;
};

const rotateRight = (board) => {
  const newBoard = [];
  for (let i = 0; i < 4; i++) {
    newBoard[i] = [];
    for (let j = 0; j < 4; j++) {
      newBoard[i][j] = board[4 - j - 1][i];
    }
  }
  return newBoard;
};

const calculateScore = (board) => {
  return board.flat().reduce((acc, val) => acc + val, 0);
};

export default Game2048;
