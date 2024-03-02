import React from "react";

const RestartButton = ({ onClick }) => {
  return (
    <button className="restart-button" onClick={onClick}>
      Restart
    </button>
  );
};

export default RestartButton;