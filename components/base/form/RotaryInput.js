import React, { useRef, useState } from "react";
import { RotarySize, getRotaryClasses, getRotarySize } from './rotary-input.util';

export default function RotaryInput({ 
  label,
  value = 0,
  onChange,
  size = RotarySize.MD,
  sensitivity = 0.5,
  className = "",
  ...props 
}) {
  const classes = getRotaryClasses({ size, className });
  const radius = getRotarySize(size);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const lastY = useRef(0);
  const accumulatedRotation = useRef(0);
  const knobRef = useRef(null);

  const updateRotation = (clientY) => {
    console.log('updateRotation called with clientY:', clientY);
    
    const delta = (lastY.current - clientY) * sensitivity;
    accumulatedRotation.current += delta;
    
    console.log('Rotation calculation:', {
      lastY: lastY.current,
      currentY: clientY,
      delta,
      accumulatedRotation: accumulatedRotation.current,
      currentRotation: rotation,
      isDragging: isDragging.current
    });
    
    setRotation(prev => {
      const newRotation = prev + delta;
      console.log('Setting new rotation:', newRotation);
      return newRotation;
    });
    
    const normalizedValue = (accumulatedRotation.current % 360) / 360;
    const positiveValue = normalizedValue < 0 ? normalizedValue + 1 : normalizedValue;
    onChange(positiveValue);
    
    lastY.current = clientY;
  };

  const handleMouseMove = (e) => {
    console.log('Mouse move event:', e.clientY, 'isDragging:', isDragging.current);
    
    if (!isDragging.current) {
      console.log('Not dragging, ignoring move');
      return;
    }
    
    e.preventDefault();
    updateRotation(e.clientY);
  };

  const handleMouseUp = (e) => {
    console.log('Mouse up - ending drag');
    isDragging.current = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e) => {
    console.log('Mouse down - starting drag');
    e.preventDefault();
    e.stopPropagation();
    
    isDragging.current = true;
    lastY.current = e.clientY;
    console.log('Initial Y position:', e.clientY);
    
    document.body.style.cursor = 'ns-resize';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={classes.container}>
      {label && <span className={classes.label}>{label}</span>}
      <div 
        className={classes.rotaryContainer}
        style={{
          width: radius * 2,
          height: radius * 2
        }}
      >
        <div 
          ref={knobRef}
          className={classes.rotaryKnob}
          onMouseDown={handleMouseDown}
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          <div className={classes.knobIndicator} />
        </div>
        <div className={classes.rotaryTrack} />
      </div>
    </div>
  );
}
