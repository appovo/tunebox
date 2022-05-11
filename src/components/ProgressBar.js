export function ProgressBar({ progressWidth }) {
  return (
    <div className="ProgressBar1">
      <span
        className="ProgressBar2"
        style={{ width: progressWidth.toString() + "%" }}
      ></span>
    </div>
  );
}
