import React from "react";

const defaultOptions = [
  'top-left', 'top-center', 'top-right',
  'center-left', 'center', 'center-right',
  'bottom-left', 'bottom-center', 'bottom-right'
];

export default function PositionInput({ label, value, onChange, options = defaultOptions }) {
  return (
    <div className="flex items-start justify-between gap-2">
      {label && <div style={{ marginBottom: 4, fontSize: 12 }}>{label}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 16px)', gap: 4 }}>
        {options.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              width: 16,
              height: 16,
              border: value === opt ? '2px solid #0070f3' : '1px solid #ccc',
              background: value === opt ? '#e0f0ff' : '#fff',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 10,
              fontWeight: value === opt ? 'bold' : 'normal',
              outline: 'none',
              transition: 'border 0.2s, background 0.2s',
            }}
            aria-label={opt}
          >
            {opt.replace(/-/g, '\n')}
          </button>
        ))}
      </div>
    </div>
  );
} 