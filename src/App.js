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
  // const [tilebeingDragged, setTileBeingDragged] = useState([]);
  // const [tileBeingReplaced, setTileBeingReplaced] = useState(null);

  /**
   * Checks for vertical groups of three or more tiles with the same color and removes them from the grid.
   */
  // const checkForVerticalThree = () => {
  //   for (let i = 0; i < width * (height - 2); i++) {
  //     const verticalThree = [i, i + width, i + width * 2];
  //     const checkColor = grid[i];
  //     if (
  //       verticalThree.every((tilePosition) => grid[tilePosition] === checkColor)
  //     ) {
  //       verticalThree.forEach((tilePosition) => (grid[tilePosition] = ""));
  //     }
  //   }
  // };
const removeLinkedTiles = (position) => {
  const newGrid = [...grid];
  const color = newGrid[position];

  const checkAdjacentTiles = (adjacentPosition) => {
    if (
      adjacentPosition >= 0 &&
      adjacentPosition < width * height &&
      newGrid[adjacentPosition] === color
    ) {
      newGrid[adjacentPosition] = "";

      const adjacentTiles = [
        adjacentPosition - 1, // left tile
        adjacentPosition + 1, // right tile
        adjacentPosition - width, // top tile
        adjacentPosition + width // bottom tile
      ];

      adjacentTiles.forEach((adjacent) => {
        if (newGrid[adjacent] === color) {
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
};

const renderGrid = () => {
  return grid.map((tile, position) => (
    <div
      key={position}
      className="tile"
      style={{ backgroundColor: tile }}
      onClick={() => handleClick(position)}
    ></div>
  ));
};

// ... rest of the code


  // const checkForHorizontalThree = () => {
  //   for (let i = 0; i < (width - 2) * height; i++) {
  //     const horizontalThree = [i, i + 1, i + 2];
  //     const checkColor = grid[i];
  //     if (
  //       horizontalThree.every(
  //         (tilePosition) => grid[tilePosition] === checkColor
  //       )
  //     ) {
  //       horizontalThree.forEach((tilePosition) => (grid[tilePosition] = ""));
  //     }
  //   }
  // };
  const moveTilesDown = () => {
    for (let i = 0; i < width * (height - 1); i++) {
      const firstRow = [...Array(width).keys()].map((n) => n + i);
      const isFirstRow = firstRow.includes(i);

      // if (isFirstRow && grid[i] === "") {
      //   let randomTile = Math.floor(Math.random() * tileColors.length);
      //   grid[i] = tileColors[randomTile];
      // }

      if (grid[i + width] === "") {
        grid[i + width] = grid[i];
        grid[i] = "";
      }
    }
  };

  // const dragStart = (e) => {
  //   // console.log("drag start", e.target);
  //   setTileBeingDragged(e.target);
  // };
  // const dragDrop = (e) => {
  //   // console.log("drag drop", e.target);
  //   setTileBeingReplaced(e.target);
  // };
  // const dragEnd = (e) => {
  //   // console.log("drag end", e.target);
  //   const tileBeingDraggedID = parseInt(
  //     tilebeingDragged.getAttribute("data-id")
  //   );
  //   const tileBeingReplacedID = parseInt(
  //     tileBeingReplaced.getAttribute("data-id")
  //   );
  //   grid[tileBeingReplacedID] = tilebeingDragged.getAttribute("src");
  //   grid[tileBeingDraggedID] = tileBeingReplaced.getAttribute("src");
  //   console.log(tileBeingReplacedID, tileBeingDraggedID);
  // };

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
      // check for 4 would be here so it gets executed prior to the 3
      removeLinkedTiles();
      moveTilesDown();
      setGrid([...grid]);
    }, 200);
    return () => clearInterval(interval);
  }, [/*checkForVerticalThree, checkForHorizontalThree,*/ removeLinkedTiles, moveTilesDown, grid]);
  return (
    <div className="app">
      <Header/>
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
              onClick={removeLinkedTiles}
              // draggable={true}
              // onDragStart={dragStart}
              // onDragOver={(e) => e.preventDefault()}
              // onDragEnter={(e) => e.preventDefault()}
              // onDragLeave={(e) => e.preventDefault()}
              // onDrop={dragDrop}
              // onDragEnd={dragEnd}
            ></img>
          );
        })}
      </div>
    </div>
  );
};
export default App;
