import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { useThemeContext } from '../../context/themeContext';
import { renderEffectElements } from '../effects/postprocessing-effects';

/**
 * Gradient Canvas Component - Canvas-based gradient background
 * Uses Three.js to create procedural gradients that can be post-processed
 */
const GradientCanvas = ({
  effects = [],
  theme,
  className = '',
  style = {},
  onLoad,
  onError,
  ...props
}) => {
  const { currentTheme } = useThemeContext();

  // Filter to only valid effects (non-null with a type)
  const validEffects = React.useMemo(
    () => effects.filter((e) => e != null && e.type),
    [effects]
  );

  // For now, use a simple colored plane that can be post-processed
  // This could be enhanced with procedural gradient shaders in the future
  const GradientPlane = () => {
    const gradStart = currentTheme?.data?.gradStart || '#ff6b6b';
    const gradStop = currentTheme?.data?.gradStop || '#4ecdc4';

    return (
      <mesh position={[0, 0, 0]} scale={[10, 10, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={gradStart} />
      </mesh>
    );
  };

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={style} {...props}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ preserveDrawingBuffer: true }}
        orthographic
      >
        <GradientPlane />
        {validEffects.length > 0 && (
          <EffectComposer>
            {renderEffectElements(validEffects)}
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default GradientCanvas;