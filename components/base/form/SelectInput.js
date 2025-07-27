import React from "react";

export default function SelectInput({ label, value, options, onChange, ...props }) {
  return (
    <label className="grid grid-cols-[1fr_100px] items-center justify-between gap-2">
      {label && <span className="flex-grow text-xs">{label}</span>}
      <select
        className="flex-grow text-xs p-1 bg-[var(--surface3)] rounded-md  text-[var(--text-color)] "
        value={value}
        onChange={e => onChange(e.target.value)}
        {...props}
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