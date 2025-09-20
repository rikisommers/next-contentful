import React from 'react';
import UnifiedCanvas from './unified-canvas';

/**
 * Canvas Shader Background Component
 * 
 * Replacement for the old Three.js implementation
 * Uses the new unified canvas system with native WebGL water shader
 */
export default function CanvasShaderBackground({
  effects = [],
  controls = {},
  className = '',
  style = {},
  onLoad,
  onError,
  ...props
}) {
  
  // Default water shader controls (matching experience2.js parameters)
  const defaultControls = {
    uBigWavesElevation: 0.07,
    uBigWavesFrequencyX: 0.44,
    uBigWavesFrequencyY: 0.4,
    uBigWavesSpeed: 0.20,
    uColorOffset: 0.07,
    uColorMultiplier: 2.98,
    uSmallWavesElevation: 0.31,
    uSmallWavesFrequency: 1.74,
    uSmallWavesSpeed: 0.1,
    uSmallIterations: 1.2,
    ...controls
  };

  // Default effects can be applied
  const defaultEffects = effects.length > 0 ? effects : [
    // Example: Add subtle effects if needed
    // { type: 'noise', intensity: 0.05, scale: 2.0 }
  ];

  return (
    <div className="absolute inset-0 w-full h-full">
      <h1 className="fixed top-48 left-0 z-40 text-white text-sm">Native Canvas Shader</h1>
      <UnifiedCanvas
        type="shader"
        shaderType="water"
        effects={defaultEffects}
        controls={defaultControls}
        className={className}
        style={style}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    </div>
  );
}