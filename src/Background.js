import React from 'react';
function Background() {
  return (
    <video id="background-video" autoPlay loop muted poster="">
      <source src="./resources/background.mp4" type="video/mp4" />
    </video>
  );
}
export default Background;