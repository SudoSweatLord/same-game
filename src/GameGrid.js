import React from "react";

const GameGrid = ({ grid, width, height, onTileClick }) => {
  return (
    <div 
      className="game"
      style={{
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridTemplateRows: `repeat(${height}, 1fr)`
      }}
    >
      {grid.map((tile, index) => (
        <div
          key={tile?.id || `empty-${index}`}
          onClick={() => onTileClick(index)}
          className="tile"
          style={{
            minWidth: '100%',
            minHeight: '100%'
          }}
        >
          {tile?.color && <img src={tile.color} alt="game tile" />}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
