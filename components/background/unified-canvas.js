import React, { Suspense, lazy } from 'react';
import { useThemeContext } from '../context/themeContext';

// Lazy load the specific canvas implementations
const ImageCanvas = lazy(() => import('./canvases/image-canvas'));
const ShaderCanvas = lazy(() => import('./canvases/shader-canvas'));

/**
 * Unified Canvas Component - Entry point for all background canvas effects
 * 
 * Supports two main types:
 * - "image": Renders images with post-processing effects
 * - "shader": Generates procedural effects (water, etc.) with post-processing
 * 
 * @param {string} type - Canvas type: "image" or "shader"
 * @param {string} src - Image source (required for image type)
 * @param {string} shaderType - Shader variant (required for shader type): "water"
 * @param {Array} effects - Array of effect objects to apply
 * @param {Object} theme - Theme context (auto-provided)
 * @param {string} className - Additional CSS classes
 * @param {Object} style - Inline styles
 * @param {Function} onLoad - Callback when canvas is loaded
 * @param {Function} onError - Callback for error handling
 */
const UnifiedCanvas = ({
  type = 'shader',
  src,
  shaderType = 'water',
  effects = [],
  className = '',
  style = {},
  onLoad,
  onError,
  ...props
}) => {
  const { currentTheme } = useThemeContext();

  // Validation
  React.useEffect(() => {
    if (type === 'image' && !src) {
      console.error('UnifiedCanvas: src is required when type="image"');
      onError?.('Missing src for image canvas');
    }
    if (type === 'shader' && !shaderType) {
      console.error('UnifiedCanvas: shaderType is required when type="shader"');
      onError?.('Missing shaderType for shader canvas');
    }
  }, [type, src, shaderType, onError]);

  // Common props passed to both canvas types
  const commonProps = {
    effects,
    theme: currentTheme,
    className,
    style,
    onLoad,
    onError,
    ...props
  };

  // Fallback component while loading
  const LoadingFallback = () => (
    <div 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        backgroundColor: currentTheme?.data?.backgroundColor || '#000000',
        ...style
      }}
    />
  );

  // Error boundary fallback
  const ErrorFallback = ({ error }) => (
    <div 
      className={`absolute inset-0 w-full h-full flex items-center justify-center ${className}`}
      style={{
        backgroundColor: currentTheme?.data?.backgroundColor || '#000000',
        color: currentTheme?.data?.textColor || '#ffffff',
        fontSize: '12px',
        ...style
      }}
    >
      Canvas Error: {error.message}
    </div>
  );

  // Canvas type routing
  const renderCanvas = () => {
    switch (type) {
      case 'image':
        if (!src) return <ErrorFallback error={{ message: 'No image source provided' }} />;
        return (
          <ImageCanvas
            src={src}
            {...commonProps}
          />
        );
      
      case 'shader':
        return (
          <ShaderCanvas
            shaderType={shaderType}
            {...commonProps}
          />
        );
      
      default:
        return <ErrorFallback error={{ message: `Unknown canvas type: ${type}` }} />;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderCanvas()}
    </Suspense>
  );
};

// Effect type definitions for TypeScript/documentation
export const EffectTypes = {
  // Halftone effects (from existing shaders)
  HALFTONE_DOTS: 'halftone-dots',
  HALFTONE_ASCII: 'halftone-ascii',
  HALFTONE_LED: 'halftone-led',
  HALFTONE_LEGO: 'halftone-lego',
  HALFTONE_RECT: 'halftone-rect',
  HALFTONE_LUMA: 'halftone-luma',
  
  // Processing effects
  NOISE: 'noise',
  PIXELATION: 'pixelation',
  DITHER_BLUE_NOISE: 'dither-blue-noise',
  DITHER_ORDERED: 'dither-ordered',
  DITHER_COLOR_QUANT: 'dither-color-quant',
  
  // Color effects
  HUE_SHIFT: 'hue-shift',
  SATURATION: 'saturation',
  CONTRAST: 'contrast',
  BRIGHTNESS: 'brightness'
};

// Shader type definitions
export const ShaderTypes = {
  WATER: 'water'
  // Future: PLASMA, NOISE_FIELD, etc.
};

// Canvas type definitions
export const CanvasTypes = {
  IMAGE: 'image',
  SHADER: 'shader'
};

export default UnifiedCanvas;