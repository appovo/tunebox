import { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

export function PlayerButtons({
  audioUrl,
  audioContext,
  decodedAudio,
  audioObj,
  audioRef
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  // Let's reset the play button look after a file
  // has been dropped while another being played
  useEffect(() => {
    setIsStopped(true);
  }, [audioUrl]);

  // const [audioBuffer, setaAudioBuffer] = useState({});

  // function play() {
  //   const playSound = audioContext?.createBufferSource();
  //   playSound.buffer = decodedAudio;
  //   playSound.connect(audioContext.destination);
  //   playSound.start(audioContext.currentTime);
  //   setaAudioBuffer(playSound);
  // }

  // function stop() {
  //   if (audioBuffer !== {}) {
  //     audioBuffer.stop();
  //   }
  // }

  // function suspend() {
  //   audioContext.suspend();
  // }

  // function resume() {
  //   audioContext.resume();
  // }

  return (
    <div>
      <button
        onClick={() => {
          // stop();
          audioObj.load();
          setIsPaused(false);
          setIsStopped(true);
          console.log(audioObj.currentTime);
        }}
      >
        <StopIcon />
      </button>
      {isPaused || isStopped ? (
        <button
          onClick={() => {
            audioObj.play();
            // audioContext.state === "suspended" ? resume() : play();
            setIsPaused(false);
            setIsStopped(false);
            console.log(audioObj.currentTime);
          }}
          style={{ backgroundColor: isStopped ? "lightblue" : "goldenrod" }}
        >
          <PlayArrowIcon />
        </button>
      ) : (
        <button
          onClick={() => {
            audioObj.pause();
            // suspend();
            setIsPaused(true);
            setIsStopped(false);
            console.log(audioObj.currentTime);
          }}
          style={{ backgroundColor: "goldenrod" }}
        >
          <PauseIcon />
        </button>
      )}
    </div>
  );
}
