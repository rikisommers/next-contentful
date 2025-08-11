import styles from './slider-input.module.css';

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
    "--track-filled": "var(--accent-pri, red)",
    "--track-empty": "var(--surface3, white)",
    "--track-height": "16px",
    "--thumb-color": "var(--accent-sec, transparent)"
  };

  return (
    <label className="grid grid-cols-[1fr_30px_100px] items-center gap-0">
      
      {label && <span className="text-xs">{label}</span>}
      <span className="pr-2 text-xs text-right">{value}</span>

      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${styles.slider} ${className}`}
        style={styleVars}
        {...props}
      />
    </label>
  );
}