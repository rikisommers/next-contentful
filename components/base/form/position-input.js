import React from "react";  
import { motion } from "../../../utils/motion";
import styles from './position-input.module.css';

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
      {label && <div className="mb-1 text-xs">{label}</div>}
      <div className={styles.positionInput}>
        {gridOptions.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`${styles.positionInputItem} ${selectedOption === opt ? styles.positionInputItemSelected : ''}`}
            aria-label={opt}
          >
            {selectedOption === opt && (
              <motion.div
                layoutId={layoutId}
                className={styles.indicator}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}