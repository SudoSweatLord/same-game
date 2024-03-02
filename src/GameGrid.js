import React from "react";

const GameGrid = ({ grid, width, height, tileColors, onTileClick }) => {
  return (
    <div className="game">
      {grid.map((tileColor, index) => {
        const colorName = tileColor.split("/").pop().split(".")[0];
        return tileColor ? (
          <img
            key={index}
            src={tileColor}
            alt={colorName}
            data-id={index}
            onClick={() => onTileClick(index)}
          />
        ) : (
          <canvas key={index} id="empty" width="50" height="50"></canvas>
        );
      })}
    </div>
  );
};

export default GameGrid;
