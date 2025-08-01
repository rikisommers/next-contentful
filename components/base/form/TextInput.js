import React from "react";

export default function TextInput({ label, value, onChange, ...props }) {
  return (
    <div className="flex gap-2 justify-between items-center">
    <label>
      {label && <span className="flex-grow text-xs">{label}</span>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
        style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
      />
    </label>
    </div>
  );
} 