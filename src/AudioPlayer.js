import React, { useRef } from "react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  return (
    <div>
      <audio ref={audioRef} src={src} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};

export default AudioPlayer;
