// Minesweeper.js
import React, { useState, useEffect } from "react";
import "./Minesweeper.css"; // 스타일링을 위한 CSS 파일

const generateBoard = (rows, cols, mines) => {
  let board = Array(rows)
    .fill()
    .map(() =>
      Array(cols).fill({ mine: false, revealed: false, flagged: false })
    );
  let mineCount = 0;

  while (mineCount < mines) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    if (!board[r][c].mine) {
      board[r][c] = { ...board[r][c], mine: true }; // 깊은 복사
      mineCount++;
    }
  }

  return board;
};

const countAdjacentMines = (board, x, y) => {
  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];
  let count = 0;

  directions.forEach(([dx, dy]) => {
    const nx = x + dx,
      ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < board.length && ny < board[0].length) {
      if (board[nx][ny].mine) count++;
    }
  });

  return count;
};

const revealCell = (board, x, y) => {
  if (board[x][y].revealed || board[x][y].flagged) return board;

  const newBoard = board.map((row) => row.map((cell) => ({ ...cell }))); // 깊은 복사
  newBoard[x][y].revealed = true;

  if (countAdjacentMines(newBoard, x, y) === 0) {
    const directions = [
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ];
    directions.forEach(([dx, dy]) => {
      const nx = x + dx,
        ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < board.length && ny < board[0].length) {
        if (!newBoard[nx][ny].revealed) {
          revealCell(newBoard, nx, ny);
        }
      }
    });
  }

  return newBoard;
};

const revealAdjacentCells = (board, x, y) => {
  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];
  let newBoard = revealCell(board, x, y);

  directions.forEach(([dx, dy]) => {
    const nx = x + dx,
      ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < board.length && ny < board[0].length) {
      if (!newBoard[nx][ny].revealed && !newBoard[nx][ny].mine) {
        newBoard = revealCell(newBoard, nx, ny);
      }
    }
  });

  return newBoard;
};

const Minesweeper = ({ rows = 10, cols = 10, mines = 20 }) => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setBoard(generateBoard(rows, cols, mines));
  }, [rows, cols, mines]); // 초기 생성 후 다시 생성되지 않도록 의존성 배열 사용

  const handleCellClick = (x, y) => {
    if (gameOver || win) return;
    if (board[x][y].mine) {
      setGameOver(true);
    } else {
      const newBoard = revealAdjacentCells(board, x, y);
      setBoard(newBoard);
      // Check for win condition
      if (newBoard.flat().filter((cell) => !cell.revealed).length === mines) {
        setWin(true);
      }
    }
  };

  const handleRightClick = (e, x, y) => {
    e.preventDefault();
    if (gameOver || win) return;
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell }))); // 깊은 복사
    newBoard[x][y].flagged = !newBoard[x][y].flagged;
    setBoard(newBoard);
  };

  return (
    <div>
      <h1>Minesweeper</h1>
      {gameOver && <div className="message">Game Over!</div>}
      {win && <div className="message">You Win!</div>}
      <div
        className="Minesweeperboard"
        style={{ gridTemplateColumns: `repeat(${cols}, 50px)` }}
      >
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                className={`cell ${cell.revealed ? "revealed" : ""} ${
                  cell.mine && cell.revealed ? "mine" : ""
                } ${cell.flagged ? "flagged" : ""}`}
                onClick={() => handleCellClick(rIdx, cIdx)}
                onContextMenu={(e) => handleRightClick(e, rIdx, cIdx)}
              >
                {cell.revealed &&
                  !cell.mine &&
                  countAdjacentMines(board, rIdx, cIdx) > 0 &&
                  countAdjacentMines(board, rIdx, cIdx)}
                {cell.revealed && cell.mine && "💣"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Minesweeper;
