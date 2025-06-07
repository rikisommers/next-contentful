import React from "react";

export default function CheckboxInput({ label, checked, onChange, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: 8 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        {...props}
        style={{ marginRight: 8 }}
      />
      {label}
    </label>
  );
} 