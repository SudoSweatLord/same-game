import { useEffect, useState } from "react";
import "./index.css";
import blueTile from "./tiles/blue.png";
import greenTile from "./tiles/green.png";
import orangeTile from "./tiles/orange.png";
import purpleTile from "./tiles/purple.png";

// grid
const width = 20;
const height = 10;

const tileColors = [greenTile, blueTile, purpleTile, orangeTile];

const App = () => {
  const [grid, setGrid] = useState([]);

  const checkForVerticalThree = () => {
    for (let i = 0; i < width * (height - 2); i++) {
      const verticalThree = [i, i + width, i + width * 2];
      const checkColor = grid[i];
      if (verticalThree.every((tilePosition) => grid[tilePosition] === checkColor)) {
        verticalThree.forEach((tilePosition) => (grid[tilePosition] = ""));
      }
    }
  };

  const checkForHorizontalThree = () => {
    for (let i = 0; i < (width -2) * height; i++) {
        const horizontalThree = [i, i + 1, i + 2];
        const checkColor = grid[i];
        if (horizontalThree.every((tilePosition) => grid[tilePosition] === checkColor)) {
          horizontalThree.forEach((tilePosition) => (grid[tilePosition] = ""));
        }
    }
  }
  const moveTilesDown = () => {
    for (let i = 0; i < width * (height - 1); i++) {
      const firstRow = [...Array(width).keys()].map((n) => n + i);
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && grid[i] === "") {
        let randomTile = Math.floor(Math.random() * tileColors.length);
        grid[i] = tileColors[randomTile];
      }

      if (grid[i + width] === "") {
        grid[i + width] = grid[i];
        grid[i] = "";
      }
    }
  }
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
    const interval = setInterval(
      () => {
        // check for 4 would be here so it gets executed prior to the 3
        checkForVerticalThree();
        checkForHorizontalThree();
        moveTilesDown();
        setGrid([...grid]);
      }, 1000)
      return () => clearInterval(interval)
    },
      [checkForVerticalThree, checkForHorizontalThree, moveTilesDown, grid]

  );
  return (
    <div className="app">
      <div className="game">
        {grid.map((tileColor, index) => {
          const colorName = tileColor.split("/").pop().split(".")[0];
          return <img key={index} src={tileColor} alt={colorName}></img>;
        })}
      </div>
    </div>
  );
};
export default App;
