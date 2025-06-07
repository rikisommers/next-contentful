import React from "react";

export default function SliderInput({ label, value, min = 0, max = 100, step = 1, onChange, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {label && <span style={{ marginRight: 8 }}>{label}</span>}
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
      <span>{value}</span>
    </label>
  );
} 