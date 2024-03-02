import React from 'react';

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-container">
      Score: {score}
    </div>
  );
};

export default ScoreBoard;
