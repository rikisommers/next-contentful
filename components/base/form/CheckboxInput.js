import React from "react";

export default function CheckboxInput({ label, checked, onChange, ...props }) {
  return (
    <label  className="flex items-center gap-2">
      {label && <span className="text-xs">{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        {...props}
        style={{ marginRight: 8 }}
      />
    </label>
  );
} 