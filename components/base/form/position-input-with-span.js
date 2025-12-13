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

export default function PositionInputWithSpan({
  label,
  value,
  onChange,
  options = defaultOptions,
  gridCols = 12,
  gridRows = 12,
  id,
  textColSpan = 6,
  subtextColSpan = 4,
  currentTheme = null,
  showTextSpan = true,
  showSubtextSpan = true,
  currentBreakpoint = '',
  componentType = 'hero' // 'hero' or 'header'
}) {
  // Override gridRows for header (single row layout)
  const effectiveGridRows = componentType === 'header' ? 1 : gridRows;
  // Generate unique ID if not provided
  const layoutId = id ? `positionIndicator-${id}` : `positionIndicator-${Math.random().toString(36).substr(2, 9)}`;

  // Generate dynamic grid options based on gridCols and effectiveGridRows
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
    if (componentType === 'header') {
      // For header, use all 12 columns in row 0: 0-0 through 0-11
      gridOptions = Object.keys(options).filter(key => key.match(/^0-(0|[1-9]|1[0-1])$/));
    } else {
      // For hero, use the original complex pattern
      const maxRow = effectiveGridRows - 1;
      const maxCol = gridCols - 1;
      const pattern = new RegExp(`^([0-9]|1[0-${maxRow > 9 ? '1' : ''}][${maxRow % 10}])-([0-9]|1[0-${maxCol > 9 ? '1' : ''}][${maxCol % 10}])$`);
      gridOptions = Object.keys(options).filter(key => pattern.test(key));
    }
  } else if (Array.isArray(options)) {
    gridOptions = options;
  } else {
    gridOptions = generateGridOptions(gridCols, effectiveGridRows);
  }

  // Determine the current selected option
  let selectedOption = value;
  if (options && typeof options === 'object' && !Array.isArray(options)) {
    if (options[value] && typeof options[value] === 'string' && options[value].match(/^(0|[1-9]|1[01])-([0-9]|1[01])$/)) {
      selectedOption = options[value];
    }
    else if (typeof value === 'string' && value.match(/^(0|[1-9]|1[01])-([0-9]|1[01])$/)) {
      selectedOption = value;
    }
  }

  // Parse the position to get row and column
  const parsePosition = (position) => {
    if (!position || typeof position !== 'string') return { row: 0, col: 0 };
    const [row, col] = position.split('-').map(Number);
    return { row: row || 0, col: col || 0 };
  };

  const selectedPos = parsePosition(selectedOption);

  // Use the passed column span values directly
  const effectiveTextColSpan = textColSpan;
  const effectiveSubtextColSpan = subtextColSpan;

  // Calculate which cells should be highlighted for text and subtext spans
  const getSpanCells = (startRow, startCol, span) => {
    const cells = [];
    for (let i = 0; i < span && startCol + i < gridCols; i++) {
      cells.push(`${startRow}-${startCol + i}`);
    }
    return cells;
  };

  // Get text and subtext positions for the current breakpoint
  const getPositionForBreakpoint = (baseKey) => {
    if (!currentTheme?.data) return '0-0';

    if (currentBreakpoint) {
      // For responsive breakpoints, use the specific breakpoint value
      return currentTheme.data[`${baseKey}${currentBreakpoint}`] ||
             currentTheme.data[baseKey] ||
             '0-0';
    } else {
      // For legacy/default, use the old keys
      return currentTheme.data[baseKey] ||
             '0-0';
    }
  };

  const textPosition = getPositionForBreakpoint(componentType === 'header' ? 'headerTextPosition' : 'heroTextPosition');
  const subtextPosition = getPositionForBreakpoint('heroSubTextPosition'); // Only for hero

  const textPos = parsePosition(textPosition);
  const subtextPos = parsePosition(subtextPosition);

  const textSpanCells = showTextSpan ? getSpanCells(textPos.row, textPos.col, effectiveTextColSpan) : [];
  const subtextSpanCells = showSubtextSpan ? getSpanCells(subtextPos.row, subtextPos.col, effectiveSubtextColSpan) : [];

  // Check if current cell is part of text or subtext span
  const getCellType = (cellId) => {
    if (textSpanCells.includes(cellId)) return 'text';
    if (subtextSpanCells.includes(cellId)) return 'subtext';
    return 'empty';
  };

  return (
    <div className="flex flex-col gap-2 justify-between items-start">
      {label && <div className="mb-1 text-xs">{label}</div>}

      {/* Legend */}
      {(showTextSpan || showSubtextSpan) && (
        <div className="flex gap-3 text-xs text-[var(--text-accent)] mb-1">
          {showTextSpan && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded"></div>
              <span>Text ({effectiveTextColSpan} cols)</span>
            </div>
          )}
          {showSubtextSpan && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded"></div>
              <span>Subtext ({effectiveSubtextColSpan} cols)</span>
            </div>
          )}
        </div>
      )}

      <div
        className={`${styles.positionInput} ${componentType === 'header' ? styles.singleRow : ''}`}
        style={{
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        }}
      >
        {gridOptions.map((opt) => {
          const cellType = getCellType(opt);
          const isSelected = selectedOption === opt;

          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`${styles.positionInputItem} ${isSelected ? styles.positionInputItemSelected : ''}`}
              style={{
                backgroundColor: cellType === 'text' ? 'rgba(59, 130, 246, 0.3)' :
                              cellType === 'subtext' ? 'rgba(34, 197, 94, 0.3)' : undefined,
                border: cellType === 'text' ? '1px solid rgba(59, 130, 246, 0.5)' :
                       cellType === 'subtext' ? '1px solid rgba(34, 197, 94, 0.5)' : undefined,
              }}
              aria-label={`${opt} ${cellType === 'text' ? '(text span)' : cellType === 'subtext' ? '(subtext span)' : ''}`}
            >
              {isSelected && (
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
          );
        })}
      </div>
    </div>
  );
}