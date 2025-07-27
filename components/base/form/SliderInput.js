export default function SliderInput({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className = "",
  ...props
}) {
  const progressPercent = ((value - min) / (max - min)) * 100;

  const styleVars = {
    "--progress": `${progressPercent}%`,
    "--track-filled": "#1597ff",
    "--track-empty": "#ddd"
  };

  return (
    <label className="grid grid-cols-[1fr_100px_30px] items-center gap-2">
      {label && <span className="text-xs">{label}</span>}
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`modern-slider ${className}`}
        style={styleVars}
        {...props}
      />
      <span className="text-xs text-right">{value}</span>
    </label>
  );
}