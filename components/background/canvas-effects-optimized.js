import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useThemeContext } from '../context/themeContext';

// Custom hook for canvas animation frame management
const useAnimationFrame = (callback, isActive = true) => {
  const requestRef = useRef();
  
  const animate = useCallback((time) => {
    if (isActive && callback) {
      callback(time);
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [callback, isActive]);
  
  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, isActive]);
};

// Optimized Gradient Background (replaces CanvasGradientBackground)
export const OptimizedGradientCanvas = ({ 
  className = '',
  gradientType = 'radial',
  animate = true,
  conicRotation = 0
}) => {
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);
  
  const draw = useCallback((time) => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Get theme colors
    const startColor = currentTheme?.data?.gradStart || '#ff8800';
    const stopColor = currentTheme?.data?.gradStop || '#196180';
    
    let gradient;
    
    if (gradientType === 'conic') {
      const centerX = width / 2;
      const centerY = height / 2;
      gradient = ctx.createConicGradient(
        (time * 0.001 * conicRotation) % (2 * Math.PI), 
        centerX, 
        centerY
      );
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(0.5, stopColor);
      gradient.addColorStop(1, startColor);
    } else {
      gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, stopColor);
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    if (animate) {
      // Add subtle noise for texture
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
  }, [currentTheme, gradientType, animate, conicRotation, isVisible]);
  
  useAnimationFrame(draw, animate && isVisible);
  
  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, []);
  
  // Intersection observer for visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);
    
    return () => observer.disconnect();
  }, []);
  
  // Setup canvas
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  
  return (
    <>
    <h1 className="fixed top-0 left-0 z-40 text-white">CNA GRad</h1>
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        imageRendering: 'pixelated' 
      }}
    />
    </>
  );
};

// Optimized Noise Effect (replaces complex shader)
export const OptimizedNoiseCanvas = ({
  className = '',
  intensity = 0.15,
  scale = 5.0,
  animate = true
}) => {
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);
  const noiseCache = useRef({});
  
  // Pre-generate noise pattern for performance
  const generateNoise = useCallback((width, height, scale) => {
    const key = `${width}-${height}-${scale}`;
    if (noiseCache.current[key]) return noiseCache.current[key];
    
    const noise = new Array(width * height);
    for (let y = 0; y < height; y += scale) {
      for (let x = 0; x < width; x += scale) {
        const value = Math.random();
        const index = Math.floor(y / scale) * Math.ceil(width / scale) + Math.floor(x / scale);
        noise[index] = value;
      }
    }
    
    noiseCache.current[key] = noise;
    return noise;
  }, []);
  
  const draw = useCallback((time) => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Base color from theme
    const baseColor = currentTheme?.data?.backgroundColor || '#ffffff';
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, width, height);
    
    // Apply noise overlay
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const noise = generateNoise(width, height, scale);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const noiseIndex = Math.floor(y / scale) * Math.ceil(width / scale) + Math.floor(x / scale);
        const noiseValue = (noise[noiseIndex] - 0.5) * intensity * 255;
        
        const pixelIndex = (y * width + x) * 4;
        data[pixelIndex] = Math.min(255, Math.max(0, data[pixelIndex] + noiseValue));
        data[pixelIndex + 1] = Math.min(255, Math.max(0, data[pixelIndex + 1] + noiseValue));
        data[pixelIndex + 2] = Math.min(255, Math.max(0, data[pixelIndex + 2] + noiseValue));
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [currentTheme, intensity, scale, isVisible, generateNoise]);
  
  useAnimationFrame(draw, animate && isVisible);
  
  // Setup similar to gradient canvas
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Use lower resolution for performance
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.min(rect.width, 800);
    canvas.height = Math.min(rect.height, 600);
    
    // Clear noise cache on resize
    noiseCache.current = {};
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        filter: 'contrast(1.1) brightness(0.95)'
      }}
    />
  );
};

// Optimized Pixelated Effect
export const OptimizedPixelCanvas = ({
  className = '',
  pixelSize = 8,
  animate = false
}) => {
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);
  
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Low resolution rendering
    const lowWidth = Math.floor(width / pixelSize);
    const lowHeight = Math.floor(height / pixelSize);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Disable image smoothing for pixelated effect
    ctx.imageSmoothingEnabled = false;
    
    // Draw pixelated pattern
    const primaryColor = currentTheme?.data?.accentPri || '#7645e8';
    const secondaryColor = currentTheme?.data?.accentSec || '#2a7aa2';
    
    for (let y = 0; y < lowHeight; y++) {
      for (let x = 0; x < lowWidth; x++) {
        // Create pattern based on position
        const value = (x + y) % 2;
        ctx.fillStyle = value ? primaryColor : secondaryColor;
        ctx.fillRect(
          x * pixelSize, 
          y * pixelSize, 
          pixelSize, 
          pixelSize
        );
      }
    }
  }, [currentTheme, pixelSize, isVisible]);
  
  useAnimationFrame(draw, animate && isVisible);
  
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  // Draw once on mount if not animating
  useEffect(() => {
    if (!animate && isVisible) {
      draw();
    }
  }, [draw, animate, isVisible]);
  
  return (
    <>
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        imageRendering: 'pixelated'
      }}
    />
    </>
  );
};

// Lazy loading wrapper component
export const LazyCanvasEffect = ({ 
  type = 'gradient',
  fallbackClassName = 'bg-gradient-to-r from-orange-400 to-blue-600',
  ...props 
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const triggerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Preload before visible
      }
    );
    
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // CSS fallback while loading
  if (!shouldRender) {
    return (
      <div 
        ref={triggerRef}
        className={`absolute inset-0 w-full h-full ${fallbackClassName}`}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
      />
    );
  }
  
  // Render appropriate canvas effect
  switch (type) {
    case 'gradient':
      return <OptimizedGradientCanvas {...props} />;
    case 'noise':
      return <OptimizedNoiseCanvas {...props} />;
    case 'pixel':
      return <OptimizedPixelCanvas {...props} />;
    default:
      return <OptimizedGradientCanvas {...props} />;
  }
};