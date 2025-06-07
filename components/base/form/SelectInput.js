import React from "react";

export default function SelectInput({ label, value, options, onChange, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      {label && <span style={{ marginRight: 8 }}>{label}</span>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
        style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc' }}
      >
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </label>
  );
} 