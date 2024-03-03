import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div style={{ position: 'absolute', top: 10, left: 10 }}>
      Countdown: {seconds}
    </div>
  );
};

export default Countdown;
