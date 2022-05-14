import { useEffect, useState } from "react";

export function ProgressBar({ audioRef }) {
  const [progressWidth, setProgressWidth] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth(audioRef.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ProgressBar1">
      <span
        className="ProgressBar2"
        style={{ width: progressWidth + "%" }}
      ></span>
    </div>
  );
}
