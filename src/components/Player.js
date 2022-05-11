import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { PlayerButtons } from "./PlayerButtons";
import "./Spectrum.css";
import "./Player.css";
import { Spectrum } from "./Spectrum";

export function Player({
  showControls = false,
  song
  // audioContext,
  // decodedAudio
}) {
  const { audioUrl } = song;
  const audioObj = new Audio(audioUrl);

  const [progressWidth, setProgressWidth] = useState(1);

  useEffect(() => {
    // setIsStopped(true);
    console.log("here");
  }, [audioUrl]);

  return (
    <>
      <Spectrum audioUrl={audioUrl} audioEle={audioObj} />
      <ProgressBar progressWidth={progressWidth} />
      <section className="Player">
        <PlayerButtons
          audioUrl={audioUrl}
          audioObj={audioObj}
          // audioContext={audioContext}
          // decodedAudio={decodedAudio}
        />
        <audio key={audioUrl} controls={showControls} id={audioUrl}>
          <source src={audioUrl} />
        </audio>
      </section>
    </>
  );
}
