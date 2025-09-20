import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { useThemeContext } from '../../context/themeContext';
import Experience2 from '../experience2';
import { EffectRouter } from '../effects/postprocessing-effects';

/**
 * Shader Canvas Component - Three.js implementation using experience2
 */
const ShaderCanvas = ({
  shaderType = 'water',
  effects = [],
  theme,
  className = '',
  style = {},
  onLoad,
  onError,
  controls = {},
  ...props
}) => {
  const { currentTheme } = useThemeContext();

  // Debug effects
  React.useEffect(() => {
    if (effects.length > 0) {
      console.log('Shader Canvas Effects:', effects);
    }
  }, [effects]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={style} {...props}>
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Experience2 />
        {effects.length > 0 && (
          <EffectComposer>
            <EffectRouter effects={effects} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default ShaderCanvas;