import React from "react";

export default function SliderInput({ label, value, min = 0, max = 100, step = 1, onChange, ...props }) {
  return (
    <label  className="grid grid-cols-[1fr_100px_30px] items-center justify-between gap-2">
      {label && <span className="flex-grow text-xs">{label}</span>}
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
        {...props}
        style={{ verticalAlign: 'middle', marginRight: 8 }}
      />
      <span className="text-xs text-right">{value}</span>
    </label>
  );
} 