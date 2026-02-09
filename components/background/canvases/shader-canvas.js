import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import { useThemeContext } from '../../context/themeContext';
import CanvasBgPlane from '../canvasBgPlane';
import CanvasBgSphere from '../canvasBgSphere';
import CanvasBgPerlinBlob from '../canvasBgPerlinBlob';
import Experience from '../experience';
import { renderEffectElements } from '../effects/postprocessing-effects';

/**
 * Camera Controller Component - Handles camera position and orbit controls
 */
const CameraController = ({ orbitControlsEnabled, updateTheme }) => {
  const { camera } = useThree();
  const controlsRef = React.useRef();
  const saveTimeoutRef = React.useRef();
  const lastSavedPosition = React.useRef({ x: 0, y: 1.5, z: 3 });

  // Save current camera position to theme
  const saveCameraPosition = React.useCallback(() => {
    if (camera && updateTheme) {
      const position = camera.position;
      const roundedPosition = {
        canvasCameraPositionX: Math.round(position.x * 100) / 100,
        canvasCameraPositionY: Math.round(position.y * 100) / 100,
        canvasCameraPositionZ: Math.round(position.z * 100) / 100
      };

      // Only update if position actually changed
      const lastPos = lastSavedPosition.current;
      if (lastPos.x !== roundedPosition.canvasCameraPositionX ||
          lastPos.y !== roundedPosition.canvasCameraPositionY ||
          lastPos.z !== roundedPosition.canvasCameraPositionZ) {

        updateTheme(roundedPosition);
        lastSavedPosition.current = {
          x: roundedPosition.canvasCameraPositionX,
          y: roundedPosition.canvasCameraPositionY,
          z: roundedPosition.canvasCameraPositionZ
        };
      }
    }
  }, [camera, updateTheme]);

  // Handle controls change with proper debouncing
  const handleControlsChange = React.useCallback(() => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      saveCameraPosition();
    }, 300); // Reduced timeout for more responsive updates
  }, [saveCameraPosition]);

  // Alternative: Use frame-based position tracking as backup
  React.useEffect(() => {
    if (!orbitControlsEnabled) return;

    let frameId;
    let lastPosition = { x: 0, y: 1.5, z: 3 };

    const trackCameraPosition = () => {
      if (camera) {
        const pos = camera.position;
        const threshold = 0.01; // Minimum change to trigger update

        if (Math.abs(pos.x - lastPosition.x) > threshold ||
            Math.abs(pos.y - lastPosition.y) > threshold ||
            Math.abs(pos.z - lastPosition.z) > threshold) {

          // Clear existing timeout and set new one
          if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
          }

          saveTimeoutRef.current = setTimeout(() => {
            saveCameraPosition();
          }, 500);

          lastPosition = { x: pos.x, y: pos.y, z: pos.z };
        }
      }

      frameId = requestAnimationFrame(trackCameraPosition);
    };

    frameId = requestAnimationFrame(trackCameraPosition);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [orbitControlsEnabled, camera, saveCameraPosition]);

  // Keyboard shortcut to save camera position (Ctrl+S)
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (orbitControlsEnabled && e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveCameraPosition();
      }
    };

    if (orbitControlsEnabled) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [orbitControlsEnabled, saveCameraPosition]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!orbitControlsEnabled) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping={true}
      dampingFactor={0.1}
      onChange={handleControlsChange}
      makeDefault
    />
  );
};

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
  const { currentTheme, updateTheme, isThemeDialogOpen } = useThemeContext();

  // Get camera settings from theme with fallbacks to defaults
  const cameraPosition = [
    currentTheme?.data?.canvasCameraPositionX ?? 0,
    currentTheme?.data?.canvasCameraPositionY ?? 1.5,
    currentTheme?.data?.canvasCameraPositionZ ?? 3
  ];
  const cameraFov = currentTheme?.data?.canvasCameraFov ?? 75;
  const orbitControlsEnabled = currentTheme?.data?.canvasOrbitControlsEnabled ?? true;
  const canvasBackgroundColor = currentTheme?.data?.bodyBackgroundColor ?? '#fafafa';

  // Create a function to update only camera-related theme values
  const updateCameraTheme = React.useCallback((cameraData) => {
    if (updateTheme) {
      updateTheme((prevTheme) => {
        return {
          ...prevTheme,
          data: {
            ...prevTheme.data,
            ...cameraData
          }
        };
      });
    } else {
      console.warn('❌ updateTheme function not available');
    }
  }, [updateTheme]);

  // Filter to only valid effects (non-null with a type)
  const validEffects = React.useMemo(
    () => effects.filter((e) => e != null && e.type),
    [effects]
  );

  // Render the appropriate shader component based on shaderType
  const renderShaderComponent = () => {
    switch (shaderType) {
      case 'water':
        return <CanvasBgPlane />;
      case 'sphere':
        return <CanvasBgSphere />;
      case 'perlinBlob':
        return <CanvasBgPerlinBlob />;
      case 'experience':
        return <Experience />;
      default:
        console.warn(`Unknown shader type: ${shaderType}, falling back to water`);
        return <CanvasBgPlane />;
    }
  };

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={style} {...props}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        style={{ width: '100%', height: '100%' }}
        gl={{ preserveDrawingBuffer: true, clearColor: canvasBackgroundColor }}
      >
        <CameraController
          orbitControlsEnabled={orbitControlsEnabled}
          updateTheme={updateCameraTheme}
        />
        {renderShaderComponent()}
        {validEffects.length > 0 && (
          <EffectComposer>
            {renderEffectElements(validEffects)}
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default ShaderCanvas;