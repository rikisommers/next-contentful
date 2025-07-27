import React from "react";
import './position-input.module.css';

const defaultOptions = [
  '0-0', '0-1', '0-2',
  '1-0', '1-1', '1-2',
  '2-0', '2-1', '2-2'
];

export default function PositionInput({ label, value, onChange, options = defaultOptions }) {
  // Convert options object to array of matrix coordinates if needed
  let gridOptions = defaultOptions;
  if (options && typeof options === 'object' && !Array.isArray(options)) {
    // Extract only the matrix coordinate keys (e.g., '0-0', '1-1', etc.)
    gridOptions = Object.keys(options).filter(key => key.match(/^\d-\d$/));
  } else if (Array.isArray(options)) {
    gridOptions = options;
  }

  // Determine the current selected option
  // If value is a matrix coordinate string, use it directly
  // If value is something else, try to find it in the options object
  let selectedOption = value;
  if (options && typeof options === 'object' && !Array.isArray(options)) {
    // If value is a key in options that maps to a matrix coordinate, use the mapped value
    if (options[value] && typeof options[value] === 'string' && options[value].match(/^\d-\d$/)) {
      selectedOption = options[value];
    }
    // If value is already a matrix coordinate, use it as is
    else if (typeof value === 'string' && value.match(/^\d-\d$/)) {
      selectedOption = value;
    }
  }

  return (
    <div className="flex gap-2 justify-between items-start">
      {label && <div style={{ marginBottom: 4, fontSize: 12 }}>{label}</div>}
      <div className="position-input" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 16px)', gap: 4 }}>
        {gridOptions.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              width: 16,
              height: 16,
              border: selectedOption === opt ? '2px solid #0070f3' : '1px solid #ccc',
              background: selectedOption === opt ? '#e0f0ff' : '#fff',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 10,
              fontWeight: selectedOption === opt ? 'bold' : 'normal',
              outline: 'none',
              transition: 'border 0.2s, background 0.2s',
            }}
            aria-label={opt}
          >
            {selectedOption === opt ? '●' : ''}
          </button>
        ))}
      </div>
    </div>
  );
} 