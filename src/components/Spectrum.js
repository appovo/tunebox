import AudioSpectrum from "react-audio-spectrum";
import { useState, useEffect } from "react";
import "./Spectrum.css";

export function Spectrum({ audioEle, audioUrl }) {
  return (
    <div className="AudioSpectrum">
      <AudioSpectrum
        id="audio-canvas"
        height={200}
        width={520}
        audioEle={audioEle}
        capColor={"lightgreen"}
        capHeight={2}
        meterWidth={2}
        meterCount={512}
        meterColor={[
          { stop: 0, color: "red" },
          { stop: 0.5, color: "rgb(194, 248, 0)" },
          { stop: 1, color: "rgb(194, 248, 0)" }
        ]}
        gap={4}
      />
    </div>
  );
}
