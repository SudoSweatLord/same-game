import { useEffect, useState, useCallback } from "react";
import "./index.css";
import blueTile from "./resources/blue.png";
import greenTile from "./resources/green.png";
import orangeTile from "./resources/orange.png";
import purpleTile from "./resources/purple.png";
import Header from "./Header";
import Background from "./Background";

// grid is a 1-dimensional array
const width = 20;
const height = 10;

const tileColors = [greenTile, blueTile, purpleTile, orangeTile];

const App = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  // declared with useCallback hook to return memorized version
  
    // Function to restart the game
    const restartGame = () => {
      createGrid();
      setScore(0);
    };
  
  const removeLinkedTiles = useCallback(
    (position) => {
      console.log("position ===", position);
      // search same color and connected tiles using a breadth-first algorithm

      const sameColorTiles = [];
      const color = grid[position];
      const visited = new Array(width * height).fill(false);
      const queue = [position];
      while (queue.length > 0) {
        const current = queue.shift();
        if (visited[current]) {
          continue;
        }
        visited[current] = true;
        if (grid[current] === color) {
          sameColorTiles.push(current);
          const currentRow = Math.floor(current / width);
          const currentColumn = current % width;
          if (currentRow > 0) {
            queue.push(current - width);
          }
          if (currentRow < height - 1) {
            queue.push(current + width);
          }
          if (currentColumn > 0) {
            queue.push(current - 1);
          }
          if (currentColumn < width - 1) {
            queue.push(current + 1);
          }
        }
      }
      console.log("sameColorTiles ===", sameColorTiles);
      if (sameColorTiles.length >= 3) {
        sameColorTiles.forEach((position) => {
          grid[position] = "";
        });
      }
      // Create a copy of the grid and remove the linked tiles
      let newGrid = [...grid];
      if (sameColorTiles.length >= 3) {
        sameColorTiles.forEach((position) => {
          newGrid[position] = "";
        });
        
      }
      

      // Update the grid state with the new grid
      setGrid(newGrid);
    },
    [grid]
  );

  const moveTilesDown = useCallback(() => {
    let newGrid = [...grid]; // Create a copy of the grid
    for (let i = 0; i < width; i++) {
      let column = [];
      for (let j = 0; j < height; j++) {
        if (newGrid[i + j * width] !== "") {
          column.push(newGrid[i + j * width]);
        }
      }
      while (column.length < height) {
        column.unshift(""); // Add empty tiles at the top
      }
      for (let j = 0; j < height; j++) {
        newGrid[i + j * width] = column[j];
      }
    }

    setGrid(newGrid); // Update the grid state with the new grid
  }, [grid, setGrid]);

  const createGrid = () => {
    const grid = [];
    for (let i = 0; i < width * height; i++) {
      const randomTile =
        tileColors[Math.floor(Math.random() * tileColors.length)];
      grid.push(randomTile);
    }
    setGrid(grid);
  };

  const handleClick = (position) => {
    removeLinkedTiles(position);
    moveTilesDown();
  };

  useEffect(() => {
    createGrid();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveTilesDown();
      setGrid([...grid]);
    }, 200);
    return () => clearInterval(interval);
  }, [moveTilesDown, grid]);

  return (
    <div className="app">
      <button className="restart-button" onClick={restartGame}>
      <div className="score">Score: {score}</div>
        Restart
      </button>
      <Header />
      <Background />
      <div className="game">
        {grid.map((tileColor, index) => {
          const colorName = tileColor.split("/").pop().split(".")[0];
          return tileColor ? (
            <img
              key={index}
              src={tileColor}
              alt={colorName}
              data-id={index}
              onClick={() => handleClick(index)}
            />
          ) : (
            <canvas
              key={index}
              id="empty"
              width="50"
              height="50"
              // style={{ backgroundColor: 'red' }}
            ></canvas>
          );
        })}
      </div>
    </div>
    
  );
};
export default App;
