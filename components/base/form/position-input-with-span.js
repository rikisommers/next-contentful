import React from "react";
import { motion } from "../../../utils/motion";
import styles from './position-input.module.css';
import SelectInput from "./select-input";
import { heroTextPositionThemes } from "../../../utils/theme";

// Helper to convert hex color to RGB
const hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string') return null;
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) return null;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
};

// Span configuration type: { key: string, label: string, color: string, positionKey: string, colSpanKey: string, colSpan: number }
export default function PositionInputWithSpan({
  label,
  value,
  onChange,
  options = heroTextPositionThemes,
  gridCols = 12,
  gridRows = 12,
  id,
  spans = [], // Array of { key, label, color, positionKey, colSpanKey, colSpan, rowSpanKey, rowSpan }
  currentTheme = null,
  currentBreakpoint = '',
  componentType = 'hero', // 'hero' or 'header'
  onColSpanChange = null, // Callback for colspan changes: (spanKey, value) => void
  colSpanOptions = null, // Options for colspan select
  colSpanValue = null, // Current colspan value
  onRowSpanChange = null, // Callback for rowspan changes: (spanKey, value) => void
  rowSpanOptions = null, // Options for rowspan select
  rowSpanValue = null, // Current rowspan value
  editableSpanKey = null // Which span's colspan/rowspan is editable (if any)
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
  let gridOptions = heroTextPositionThemes;
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

  // Get position for a span key at current breakpoint
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

  // Calculate which cells should be highlighted for a span (supports both row and col span)
  const getSpanCells = (startRow, startCol, colSpan, rowSpan = 1) => {
    const cells = [];
    for (let row = 0; row < rowSpan && startRow + row < effectiveGridRows; row++) {
      for (let col = 0; col < colSpan && startCol + col < gridCols; col++) {
        cells.push(`${startRow + row}-${startCol + col}`);
      }
    }
    return cells;
  };

  // Process spans to get their positions and cells
  const processedSpans = spans.map(span => {
    const position = getPositionForBreakpoint(span.positionKey);
    const pos = parsePosition(position);
    const colSpan = currentTheme?.data?.[`${span.colSpanKey}${currentBreakpoint}`] || 
                    currentTheme?.data?.[span.colSpanKey] || 
                    span.colSpan || 1;
    const rowSpanValue = currentTheme?.data?.[`${span.rowSpanKey}${currentBreakpoint}`] || 
                         currentTheme?.data?.[span.rowSpanKey] || 
                         span.rowSpan || 1;
    // Handle "auto" - use 1 for visualization but keep "auto" as the value
    const rowSpanDisplay = rowSpanValue === 'auto' ? 1 : (typeof rowSpanValue === 'number' ? rowSpanValue : 1);
    const cells = getSpanCells(pos.row, pos.col, colSpan, rowSpanDisplay);
    return { ...span, position, pos, colSpan, rowSpan: rowSpanValue, rowSpanDisplay, cells };
  });

  // Check if current cell is part of any span
  const getCellType = (cellId) => {
    for (const span of processedSpans) {
      if (span.cells.includes(cellId)) {
        return span.key;
      }
    }
    return 'empty';
  };

  return (
    <div className="flex flex-col gap-2 justify-between items-start">
      {label && <div className="mb-1 text-xs">{label}</div>}

      {/* Legend */}
      {processedSpans.length > 0 && (
        <div className="flex gap-3 text-xs text-[var(--text-accent)] mb-1">
          {processedSpans.map(span => (
            <div key={span.key} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded" style={{ backgroundColor: span.color }}></div>
              <span>{span.label} ({span.colSpan}×{span.rowSpan === 'auto' ? 'auto' : span.rowSpanDisplay})</span>
            </div>
          ))}
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
                backgroundColor: cellType !== 'empty' ? (() => {
                  const span = processedSpans.find(s => s.key === cellType);
                  if (span) {
                    const rgb = hexToRgb(span.color);
                    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` : undefined;
                  }
                  return undefined;
                })() : undefined,
                border: cellType !== 'empty' ? (() => {
                  const span = processedSpans.find(s => s.key === cellType);
                  if (span) {
                    const rgb = hexToRgb(span.color);
                    return rgb ? `1px solid rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)` : undefined;
                  }
                  return undefined;
                })() : undefined,
              }}
              aria-label={`${opt} ${cellType !== 'empty' ? `(${processedSpans.find(s => s.key === cellType)?.label || cellType} span)` : ''}`}
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

      {/* Colspan and Rowspan controls for editable span - shown after the grid */}
      {editableSpanKey && (
        <div className="w-full mt-2 flex flex-col gap-2">
          {onColSpanChange && colSpanOptions && (
            <SelectInput
              label="Col Span"
              value={String(colSpanValue ?? processedSpans.find(s => s.key === editableSpanKey)?.colSpan ?? 12)}
              options={colSpanOptions}
              onChange={(val) => onColSpanChange(editableSpanKey, Number(val))}
            />
          )}
          {onRowSpanChange && rowSpanOptions && (
            <SelectInput
              label="Row Span"
              value={String(rowSpanValue ?? processedSpans.find(s => s.key === editableSpanKey)?.rowSpan ?? 1)}
              options={rowSpanOptions}
              onChange={(val) => {
                // Handle "auto" as a string, otherwise convert to number
                const newValue = val === 'auto' ? 'auto' : Number(val);
                onRowSpanChange(editableSpanKey, newValue);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}