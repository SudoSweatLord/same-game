import React from "react";

const ScoreBoard = ({ score, topScores }) => {
  return (
    <div className="score-container">
      <div>Score: {score}</div>
      <h2>Top 5 Scores</h2>
      <ul>
        {topScores.map((score, index) => (
          <li key={index}>{score}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBoard;