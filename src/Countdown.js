import React, { useState, useEffect } from 'react';

const Countdown = ({ onTimeUp }) => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(true);

  const countDown = () => {
    setSeconds(prevSeconds => {
      if (prevSeconds > 0) {
        return prevSeconds - 1;
      } else {
        setIsActive(false);
        onTimeUp(); // Trigger a callback when the countdown reaches 0
        return 0;
      }
    });
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      const interval = setInterval(countDown, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, seconds]);

  return (
    <div className="countdown-container">
      <p>Time Remaining:</p>
      {seconds >= 0 ? (
        <div>
          <p>{seconds}</p>
        </div>
      ) : (
        <div>
          <p>Time's up!</p>
        </div>
      )}
      
    </div>
  );
};

export default Countdown;
