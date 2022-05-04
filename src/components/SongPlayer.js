import { useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import "./SongPlayer.css";
import { Spectrum } from "./Spectrum";

export function SongPlayer({ showControls = false, song, audioContext }) {
  const audioRef = useRef();
  const { audioUrl } = song;
  const [isPaused, setIsPaused] = useState(true);
  const [isStopped, setIsStopped] = useState(true);

  // setInterval(() => {
  //   console.log(audioContext.currentTime?.toFixed(2));
  // }, 1000);

  return (
    <>
      <Spectrum audioUrl={audioUrl} />
      <div className="ProgressBar1">
        <span className="ProgressBar2"></span>
      </div>
      <section className="SongPlayer">
        <audio
          ref={audioRef}
          key={audioUrl}
          controls={showControls}
          id={audioUrl}
        >
          <source src={audioUrl} />
        </audio>
        <div>
          <button
            onClick={() => {
              audioRef.current.load();
              setIsPaused(true);
              setIsStopped(true);
            }}
          >
            <StopIcon />
          </button>
          {isPaused ? (
            <button
              onClick={() => {
                audioRef.current.play();
                setIsPaused(false);
              }}
              style={{ backgroundColor: isStopped ? "lightblue" : "goldenrod" }}
            >
              <PlayArrowIcon />
            </button>
          ) : (
            <button
              onClick={() => {
                audioRef.current.pause();
                setIsPaused(true);
                setIsStopped(false);
              }}
              style={{ backgroundColor: "goldenrod" }}
            >
              <PauseIcon />
            </button>
          )}
        </div>
      </section>
    </>
  );
}
