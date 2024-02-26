import React from 'react';
import background from "./resources/background.mp4";
function Background() {
  return (
    <video id="background-video" autoPlay loop muted poster="">
      <source src="./resources/background.mp4" type="video/mp4" />
    </video>
  );
}
export default Background;