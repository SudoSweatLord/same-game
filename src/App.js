import { useEffect, useState } from "react";
import "./index.css";
import blueTile from "./resources/blue.png";
import greenTile from "./resources/green.png";
import orangeTile from "./resources/orange.png";
import purpleTile from "./resources/purple.png";
import Header from "./Header";
import Background from "./Background";

// grid
const width = 20;
const height = 10;

const tileColors = [greenTile, blueTile, purpleTile, orangeTile];

const App = () => {
  const [grid, setGrid] = useState([]);

  const removeLinkedTiles = (position) => {
    console.log("position ===", position);
    const newGrid = [...grid];
    // const color = newGrid[position];
    const tile = newGrid[position];

    const checkAdjacentTiles = (adjacentPosition) => {
      if (
        adjacentPosition >= 0 &&
        adjacentPosition < width * height &&
        newGrid[adjacentPosition] === tile
      ) {
        newGrid[adjacentPosition] = "";

        const adjacentTiles = [
          adjacentPosition - 1, // left tile
          adjacentPosition + 1, // right tile
          adjacentPosition - width, // top tile
          adjacentPosition + width, // bottom tile
        ];

        adjacentTiles.forEach((adjacent) => {
          if (newGrid[adjacent] === tile) {
            checkAdjacentTiles(adjacent);
          }
        });
      }
    };

    checkAdjacentTiles(position);
    setGrid(newGrid);
  };

  const handleClick = (position) => {
    removeLinkedTiles(position);
    moveTilesDown()
  };

  const moveTilesDown = () => {
    for (let i = 0; i < width * (height - 1); i++) {
      const firstRow = [...Array(width).keys()].map((n) => n + i);
      const isFirstRow = firstRow.includes(i);

      if (grid[i + width] === "") {
        grid[i + width] = grid[i];
        grid[i] = "";
      }
    }
  };

  const createGrid = () => {
    const grid = [];
    for (let i = 0; i < width * height; i++) {
      const randomTile =
        tileColors[Math.floor(Math.random() * tileColors.length)];
      grid.push(randomTile);
    }
    setGrid(grid);
  };

  useEffect(() => {
    createGrid();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      removeLinkedTiles();
      moveTilesDown();
      setGrid([...grid]);
    }, 200);
    return () => clearInterval(interval);
  }, [removeLinkedTiles, moveTilesDown, grid]);

  return (
    <div className="app">
      <Header />
      <Background />
      <div className="game">
        {grid.map((tileColor, index) => {
          const colorName = tileColor.split("/").pop().split(".")[0];
          return (
            <img
              key={index}
              src={tileColor}
              alt={colorName}
              data-id={index}
              onClick={() => handleClick}
            ></img>
          );
        })}
      </div>
    </div>
  );
};
export default App;
