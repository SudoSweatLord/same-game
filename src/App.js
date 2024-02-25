import { useEffect, useState } from "react";
import "./index.css";
import blueTile from "./tiles/blue.png";
import greenTile from "./tiles/green.png";
import orangeTile from "./tiles/orange.png";
import  purpleTile from "./tiles/purple.png";

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
   if ( verticalThree.every(number => grid[number] === checkColor) ) {
    verticalThree.forEach(number => grid[number] = "");
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
    // console.log(grid);
  };
  useEffect(() => {
    createGrid();
  }, []);
  
  useEffect(() => {
    checkForVerticalThree();
  }, [grid]);

  return (
    <div className="app">
      <div className="game">
        {grid.map((tileColors, index) => (
          <img
            key={index}
            src={tileColors}
            alt="tile"

          ></img>
        ))}
      </div>
    </div>
  );
};
export default App;
