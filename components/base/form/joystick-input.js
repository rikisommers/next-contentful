"use client";

import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * Joystick control for 2D position input (x, y coordinates from 0-100)
 * @component
 * @category forms
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {{x: number, y: number}} props.value - Current position value (0-100 for both x and y)
 * @param {Function} props.onChange - Callback when position changes
 * @param {string} props.className - Additional CSS classes
 * @example
 * <JoystickInput
 *   label="Gradient Position"
 *   value={{ x: 50, y: 50 }}
 *   onChange={(position) => console.log(position)}
 * />
 */
const JoystickInput = ({
  label,
  value = { x: 50, y: 50 },
  onChange,
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Convert percentage to pixel position within container
  const getPixelPosition = useCallback((percentX, percentY, containerRect) => {
    const x = (percentX / 100) * containerRect.width;
    const y = (percentY / 100) * containerRect.height;
    return { x, y };
  }, []);

  // Convert pixel position to percentage
  const getPercentagePosition = useCallback((pixelX, pixelY, containerRect) => {
    const x = Math.max(0, Math.min(100, (pixelX / containerRect.width) * 100));
    const y = Math.max(0, Math.min(100, (pixelY / containerRect.height) * 100));
    return { x: Math.round(x), y: Math.round(y) };
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPosition = getPercentagePosition(x, y, rect);
    onChange?.(newPosition);
  }, [onChange, getPercentagePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPosition = getPercentagePosition(x, y, rect);
    onChange?.(newPosition);
  }, [isDragging, onChange, getPercentagePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse events for dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Calculate knob position
  const getKnobStyle = () => {
    const container = containerRef.current;
    if (!container) return { left: '50%', top: '50%' };

    const rect = container.getBoundingClientRect();
    const { x, y } = getPixelPosition(value.x, value.y, rect);

    return {
      left: `${value.x}%`,
      top: `${value.y}%`,
    };
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-[var(--text-color)]">
          {label}
        </label>
      )}

      {/* Joystick Container */}
      <div className="relative">
        <div
          ref={containerRef}
          className="relative w-32 h-32 bg-[var(--surface1)] border border-[var(--surface3)] rounded-lg cursor-crosshair overflow-hidden"
          onMouseDown={handleMouseDown}
        >
          {/* Grid lines for visual reference */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Vertical center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--surface3)] transform -translate-x-1/2"></div>
            {/* Horizontal center line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--surface3)] transform -translate-y-1/2"></div>
          </div>

          {/* Knob */}
          <div
            className="absolute w-3 h-3 bg-[var(--accent-pri)] rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-sm"
            style={getKnobStyle()}
          >
            {/* Inner dot */}
            <div className="absolute inset-1 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Position display */}
        <div className="mt-2 text-xs text-[var(--text-accent)] font-mono">
          X: {value.x}% Y: {value.y}%
        </div>
      </div>
    </div>
  );
};

JoystickInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default JoystickInput;