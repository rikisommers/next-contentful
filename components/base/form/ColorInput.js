import React from "react";

export default function ColorInput({ label, value, onChange, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {label && <span style={{ marginRight: 8 }}>{label}</span>}
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
        style={{ width: 32, height: 32, border: 'none', background: 'none' }}
      />
    </label>
  );
} 