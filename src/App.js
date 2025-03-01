import { useEffect, useState, useCallback } from "react";
import "./index.css";
import blueTile from "./resources/blue.png";
import greenTile from "./resources/green.png";
import orangeTile from "./resources/orange.png";
import purpleTile from "./resources/purple.png";
import ScoreBoard from "./ScoreBoard";
import RestartButton from "./RestartButton";
import GameGrid from "./GameGrid";

const width = 20;
const height = 10;
const tileColors = [greenTile, blueTile, purpleTile, orangeTile];

const App = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [topScores, setTopScores] = useState(() => {
    const savedTopScores = JSON.parse(localStorage.getItem("topScores")) || [];
    return savedTopScores;
  });

  const createGrid = useCallback(() => {
    const newGrid = [];
    for (let i = 0; i < width * height; i++) {
      const randomTile = {
        id: Date.now() + i,
        color: tileColors[Math.floor(Math.random() * tileColors.length)]
      };
      newGrid.push(randomTile);
    }
    setGrid(newGrid);
  }, []);

  const restartGame = () => {
    saveScore(score);
    createGrid();
    setScore(0);
    setGameOver(false);
  };

  const handleContinue = () => {
    restartGame();
  };

  const removeLinkedTiles = useCallback((position) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const color = newGrid[position]?.color;
      if (!color) return newGrid;

      const visited = new Array(width * height).fill(false);
      const stack = [position];
      const sameColorTiles = [];

      while (stack.length > 0) {
        const current = stack.pop();
        if (visited[current]) continue;
        visited[current] = true;
        
        if (newGrid[current]?.color === color) {
          sameColorTiles.push(current);
          const row = Math.floor(current / width);
          const col = current % width;

          if (row > 0) stack.push(current - width);
          if (row < height - 1) stack.push(current + width);
          if (col > 0) stack.push(current - 1);
          if (col < width - 1) stack.push(current + 1);
        }
      }

      if (sameColorTiles.length >= 3) {
        setScore(prev => prev + sameColorTiles.length * sameColorTiles.length);
        sameColorTiles.forEach(idx => {
          newGrid[idx] = null;
        });
      }
      
      return newGrid;
    });
  }, []);

  const moveTilesDown = useCallback(() => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      for (let col = 0; col < width; col++) {
        const column = [];
        for (let row = height - 1; row >= 0; row--) {
          const idx = col + row * width;
          if (newGrid[idx] !== null) {
            column.push(newGrid[idx]);
          }
        }
        while (column.length < height) {
          column.push(null);
        }
        for (let row = 0; row < height; row++) {
          const idx = col + (height - 1 - row) * width;
          newGrid[idx] = column[row];
        }
      }
      return newGrid;
    });
  }, []);

  const handleClick = (position) => {
    if (gameOver || isProcessing) return;
    setIsProcessing(true);
    removeLinkedTiles(position);
    setTimeout(() => {
      moveTilesDown();
      setIsProcessing(false);
    }, 300);
  };

  const hasValidMoves = (grid) => {
    const visited = new Array(grid.length).fill(false);
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === null || visited[i]) continue;
      const color = grid[i]?.color;
      let count = 0;
      const stack = [i];
      while (stack.length > 0) {
        const current = stack.pop();
        if (visited[current]) continue;
        visited[current] = true;
        if (grid[current]?.color !== color) continue;
        count++;
        if (count >= 3) return true;
        const row = Math.floor(current / width);
        const col = current % width;
        if (row > 0 && grid[current - width]?.color === color)
          stack.push(current - width);
        if (row < height - 1 && grid[current + width]?.color === color)
          stack.push(current + width);
        if (col > 0 && grid[current - 1]?.color === color) stack.push(current - 1);
        if (col < width - 1 && grid[current + 1]?.color === color)
          stack.push(current + 1);
      }
    }
    return false;
  };

  useEffect(() => {
    createGrid();
    const savedTopScores = JSON.parse(localStorage.getItem("topScores")) || [];
    setTopScores(savedTopScores);
  }, [createGrid]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && !isProcessing) {
        moveTilesDown();
      }
    }, 200);
    return () => clearInterval(interval);
  }, [moveTilesDown, gameOver, isProcessing]);

  useEffect(() => {
    if (!isProcessing && grid.length > 0 && !hasValidMoves(grid) && !gameOver) {
      setTimeout(() => {
        if (!hasValidMoves(grid)) {
          setGameOver(true);
        }
      }, 300);
    }
  }, [grid, isProcessing, gameOver]);

  const saveScore = (newScore) => {
    localStorage.setItem("score", newScore.toString());
    const updatedTopScores = [...topScores, newScore]
      .sort((a, b) => b - a)
      .slice(0, 5);
    localStorage.setItem("topScores", JSON.stringify(updatedTopScores));
    setTopScores(updatedTopScores);
  };

  return (
    <div className="app">
      <div className="game-container">
        <GameGrid
          grid={grid}
          width={width}
          height={height}
          onTileClick={handleClick}
        />
      </div>
      <div className="sidebar">
        <ScoreBoard score={score} topScores={topScores} />
        <RestartButton onClick={restartGame} disabled={gameOver} />
      </div>
      {gameOver && (
        <div className="modal-overlay">
          <div className="modal">
            <p>YOUR SCORE IS: {score}</p>
            <button onClick={handleContinue}>Click to restart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;