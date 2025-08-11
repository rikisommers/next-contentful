import React from "react";

export default function ColorInput({ label, value, onChange, ...props }) {
  return (
    <label  className="grid grid-cols-[1fr_100px] items-center justify-between gap-2">
      {label && <span className="flex-grow text-xs">{label}</span>}
      <input
        className="flex-grow w-full h-10"
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
        style={{ width: 32, height: 32, border: 'none', background: 'none' }}
      />
    </label>
  );
} 