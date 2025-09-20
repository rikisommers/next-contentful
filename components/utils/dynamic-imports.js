// Dynamic import utility for heavy components
// This ensures components are only loaded when actually needed

import { lazy } from 'react';

// Heavy Three.js components - only import when required
export const DynamicBackground = lazy(() => 
  import('../background/background').then(module => ({
    default: module.default
  }))
);

export const DynamicCanvasImageComponent = lazy(() => 
  import('../background/canvasImageComponent').then(module => ({
    default: module.default
  }))
);

export const DynamicExperience = lazy(() => 
  import('../background/experience').then(module => ({
    default: module.default
  }))
);

export const DynamicCanvasGradientBackground = lazy(() => 
  import('../background/canvasGradientBackground').then(module => ({
    default: module.default
  }))
);

export const DynamicCanvasEffectDemo = lazy(() => 
  import('../background/canvasEffectDemo').then(module => ({
    default: module.default
  }))
);

// Dynamic import helper with fallback
export const dynamicImportWithFallback = async (importFn, fallback) => {
  try {
    const module = await importFn();
    return module.default || module;
  } catch (error) {
    console.warn('Dynamic import failed, using fallback:', error);
    return fallback;
  }
};

// Preload function for critical components
export const preloadCanvas = () => {
  // Preload canvas components when user interaction is detected
  if (typeof window !== 'undefined') {
    const preloadComponents = [
      () => import('../background/canvas-effects-optimized'),
    ];
    
    // Preload on first user interaction
    const handleFirstInteraction = () => {
      preloadComponents.forEach(importFn => {
        importFn().catch(err => 
          console.warn('Preload failed:', err)
        );
      });
      
      // Remove listeners after first use
      ['mousedown', 'touchstart', 'keydown'].forEach(event => {
        window.removeEventListener(event, handleFirstInteraction, { passive: true });
      });
    };
    
    // Add listeners for first interaction
    ['mousedown', 'touchstart', 'keydown'].forEach(event => {
      window.addEventListener(event, handleFirstInteraction, { passive: true });
    });
  }
};

// Intersection observer for lazy loading
export const createLazyLoader = (threshold = 0.1, rootMargin = '100px') => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const loadFn = target.dataset.lazyLoad;
          
          if (loadFn && window[loadFn]) {
            window[loadFn]();
          }
        }
      });
    },
    { threshold, rootMargin }
  );
};

// Resource loading state manager
export class ResourceLoader {
  constructor() {
    this.loaded = new Set();
    this.loading = new Set();
    this.failed = new Set();
  }
  
  async load(key, importFn) {
    if (this.loaded.has(key)) {
      return Promise.resolve();
    }
    
    if (this.loading.has(key)) {
      // Return existing promise
      return this.getLoadingPromise(key);
    }
    
    this.loading.add(key);
    
    try {
      const promise = importFn();
      this.setLoadingPromise(key, promise);
      
      await promise;
      
      this.loading.delete(key);
      this.loaded.add(key);
      
      return promise;
    } catch (error) {
      this.loading.delete(key);
      this.failed.add(key);
      throw error;
    }
  }
  
  setLoadingPromise(key, promise) {
    if (!this.loadingPromises) {
      this.loadingPromises = new Map();
    }
    this.loadingPromises.set(key, promise);
  }
  
  getLoadingPromise(key) {
    return this.loadingPromises?.get(key) || Promise.resolve();
  }
  
  isLoaded(key) {
    return this.loaded.has(key);
  }
  
  isLoading(key) {
    return this.loading.has(key);
  }
  
  hasFailed(key) {
    return this.failed.has(key);
  }
}

// Global resource loader instance
export const globalResourceLoader = new ResourceLoader();

// Performance monitoring
export const measurePerformance = (name, fn) => {
  if (typeof performance === 'undefined') {
    return fn();
  }
  
  const startTime = performance.now();
  const result = fn();
  
  if (result && typeof result.then === 'function') {
    return result.finally(() => {
      const endTime = performance.now();
      console.log(`${name} took ${endTime - startTime} milliseconds`);
    });
  }
  
  const endTime = performance.now();
  console.log(`${name} took ${endTime - startTime} milliseconds`);
  
  return result;
};