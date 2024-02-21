import { useEffect, useState } from "react";
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
  useEffect(() => {
    createGrid();
  }, []);
  // createGrid();

  return (
    <div className="app">
      <div className="game"></div>
    </div>
  );
};
export default App;
