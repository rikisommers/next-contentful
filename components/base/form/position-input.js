import React from "react";  
import { motion } from "../../../utils/motion";
import styles from './position-input.module.css';

const defaultOptions = [
  '0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7', '0-8', '0-9', '0-10', '0-11',
  '1-0', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11',
  '2-0', '2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9', '2-10', '2-11',
  '3-0', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8', '3-9', '3-10', '3-11',
  '4-0', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9', '4-10', '4-11',
  '5-0', '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8', '5-9', '5-10', '5-11',
  '6-0', '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11',
  '7-0', '7-1', '7-2', '7-3', '7-4', '7-5', '7-6', '7-7', '7-8', '7-9', '7-10', '7-11',
  '8-0', '8-1', '8-2', '8-3', '8-4', '8-5', '8-6', '8-7', '8-8', '8-9', '8-10', '8-11',
  '9-0', '9-1', '9-2', '9-3', '9-4', '9-5', '9-6', '9-7', '9-8', '9-9', '9-10', '9-11',
  '10-0', '10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8', '10-9', '10-10', '10-11',
  '11-0', '11-1', '11-2', '11-3', '11-4', '11-5', '11-6', '11-7', '11-8', '11-9', '11-10', '11-11'
];

export default function PositionInput({ label, value, onChange, options = defaultOptions, gridCols = 12, gridRows = 12, id }) {
  // Generate unique ID if not provided
  const layoutId = id ? `positionIndicator-${id}` : `positionIndicator-${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate dynamic grid options based on gridCols and gridRows
  const generateGridOptions = (cols, rows) => {
    const options = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        options.push(`${row}-${col}`);
      }
    }
    return options;
  };
  
  // Convert options object to array of matrix coordinates if needed
  let gridOptions = defaultOptions;
  if (options && typeof options === 'object' && !Array.isArray(options)) {
    // Extract only the matrix coordinate keys (e.g., '0-0', '1-1', etc.)
    const maxRow = gridRows - 1;
    const maxCol = gridCols - 1;
    const pattern = new RegExp(`^([0-9]|1[0-${maxRow > 9 ? '1' : ''}][${maxRow % 10}])-([0-9]|1[0-${maxCol > 9 ? '1' : ''}][${maxCol % 10}])$`);
    gridOptions = Object.keys(options).filter(key => pattern.test(key));
  } else if (Array.isArray(options)) {
    gridOptions = options;
  } else {
    // Use dynamic generation if no specific options provided
    gridOptions = generateGridOptions(gridCols, gridRows);
  }

  // Determine the current selected option
  let selectedOption = value;
  if (options && typeof options === 'object' && !Array.isArray(options)) {
    // If value is a key in options that maps to a matrix coordinate, use the mapped value
    if (options[value] && typeof options[value] === 'string' && options[value].match(/^(0|[1-9]|1[01])-([0-9]|1[01])$/)) {
      selectedOption = options[value];
    }
    // If value is already a matrix coordinate, use it as is
    else if (typeof value === 'string' && value.match(/^(0|[1-9]|1[01])-([0-9]|1[01])$/)) {
      selectedOption = value;
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-between items-start">
      {label && <div className="mb-1 text-xs">{label}</div>}
      <div
        className={styles.positionInput}
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        }}
      >
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
                layoutid={layoutId}
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