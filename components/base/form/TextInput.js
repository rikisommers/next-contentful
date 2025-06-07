import React from "react";

export default function TextInput({ label, value, onChange, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {label && <span style={{ marginRight: 8 }}>{label}</span>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
        style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
      />
    </label>
  );
} 