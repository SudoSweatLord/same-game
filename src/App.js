import { useState } from "react";
// grid
const width = 20;
const height = 10;

const tileColors = ["green", "blue", "purple", "orange"];

const App = () => {
  const [grid, setGrid] = useState([]);
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

  createGrid();
  console.log(grid)

  return (
    <div>
      <div>Grid</div>
    </div>
  );
};
export default App;
