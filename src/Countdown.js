import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [seconds, setSeconds] = useState(60);

  const countDown = () => {
    setSeconds(prevSeconds => prevSeconds - 1);
  };

  useEffect(() => {
    const interval = setInterval(countDown, 1000);

    return () => clearInterval(interval);
  }, []);

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