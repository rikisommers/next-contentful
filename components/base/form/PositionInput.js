import React from "react";  
import { motion } from "../../../utils/motion";
import './position-input.css';

const defaultOptions = [
  '0-0', '0-1', '0-2',
  '1-0', '1-1', '1-2',
  '2-0', '2-1', '2-2'
];

export default function PositionInput({ label, value, onChange, options = defaultOptions, id }) {
  // Generate unique ID if not provided
  const layoutId = id ? `positionIndicator-${id}` : `positionIndicator-${Math.random().toString(36).substr(2, 9)}`;
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
    <div className="flex flex-col gap-2 justify-between items-start">
      {label && <div style={{ marginBottom: 4, fontSize: 12 }}>{label}</div>}
      <div className="grid grid-cols-3 gap-[1px] rounded-sm overflow-hidden" 
      
      >
        {gridOptions.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="relative flex justify-center items-center w-[24px] h-[24px] bg-[var(--surface3)] cursor-pointer"
            style={{
     
             
            }}
            aria-label={opt}
          >
            
            {selectedOption === opt && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-gray-200 rounded-sm dark:bg-gray-700"
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              />
            )}
            <span className="relative z-10">{selectedOption === opt ? '' : ''}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 