import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { EffectRouter } from '../effects/postprocessing-effects';

/**
 * Three.js Image Plane Component
 */
function ImagePlane({ src, effects = [], theme, onLoad, onError, fit = 'cover' }) {
  const meshRef = useRef();
  const { viewport, camera } = useThree();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (!src) return;

    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
        onLoad?.();
      },
      undefined,
      (error) => {
        console.error('Failed to load image:', error);
        onError?.(error);
      }
    );
  }, [src, onLoad, onError]);

  // Calculate scale based on fit mode
  const getScale = useCallback(() => {
    if (!texture) return [1, 1, 1];

    const imageAspect = texture.image.width / texture.image.height;
    const viewportAspect = viewport.width / viewport.height;

    let scaleX = 1;
    let scaleY = 1;

    switch (fit) {
      case 'cover':
        if (imageAspect > viewportAspect) {
          scaleX = viewport.height * imageAspect;
          scaleY = viewport.height;
        } else {
          scaleX = viewport.width;
          scaleY = viewport.width / imageAspect;
        }
        break;
      case 'contain':
        if (imageAspect > viewportAspect) {
          scaleX = viewport.width;
          scaleY = viewport.width / imageAspect;
        } else {
          scaleX = viewport.height * imageAspect;
          scaleY = viewport.height;
        }
        break;
      case 'fill':
      default:
        scaleX = viewport.width;
        scaleY = viewport.height;
        break;
    }

    return [scaleX, scaleY, 1];
  }, [texture, viewport, fit]);

  if (!texture) return null;

  return (
    <mesh ref={meshRef} scale={getScale()}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

/**
 * Image Canvas Component - Three.js implementation
 */
const ImageCanvas = ({
  src,
  effects = [],
  theme,
  className = '',
  style = {},
  onLoad,
  onError,
  fit = 'cover',
  position = 'center',
  ...props
}) => {
  const [error, setError] = useState(null);

  // Debug effects
  React.useEffect(() => {
    if (effects.length > 0) {
      console.log('Image Canvas Effects:', effects);
    }
  }, [effects]);

  if (error) {
    return (
      <div 
        className={`absolute inset-0 w-full h-full flex items-center justify-center ${className}`}
        style={{
          backgroundColor: theme?.data?.backgroundColor || '#000000',
          color: theme?.data?.textColor || '#ffffff',
          fontSize: '12px',
          ...style
        }}
      >
        Image Canvas Error: {error.message}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`} style={style} {...props}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ImagePlane 
          src={src}
          effects={effects}
          theme={theme}
          onLoad={onLoad}
          onError={(err) => {
            setError(err);
            onError?.(err);
          }}
          fit={fit}
        />
        {effects.length > 0 && (
          <EffectComposer>
            <EffectRouter effects={effects} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default ImageCanvas;