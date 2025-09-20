// Accessibility utilities for WCAG AA compliance

import { useEffect, useRef } from 'react';

// Skip links component for keyboard navigation
export const SkipLinks = () => {
  return (
    <nav aria-label="Skip navigation links" className="sr-only focus:not-sr-only">
      <div className="absolute top-0 left-0 z-[9999] bg-[var(--background-color)] border border-[var(--accent-pri)] p-2">
        <a 
          href="#main-content" 
          className="text-[var(--text-color)] underline focus:outline-none focus:ring-2 focus:ring-[var(--accent-pri)]"
        >
          Skip to main content
        </a>
        <a 
          href="#navigation" 
          className="ml-4 text-[var(--text-color)] underline focus:outline-none focus:ring-2 focus:ring-[var(--accent-pri)]"
        >
          Skip to navigation
        </a>
      </div>
    </nav>
  );
};

// Focus management hook
export const useFocusManagement = () => {
  const previousFocus = useRef(null);

  const saveFocus = () => {
    previousFocus.current = document.activeElement;
  };

  const restoreFocus = () => {
    if (previousFocus.current && previousFocus.current.focus) {
      previousFocus.current.focus();
    }
  };

  const trapFocus = (containerRef) => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  };

  return { saveFocus, restoreFocus, trapFocus };
};

// Color contrast checker
export const checkColorContrast = (foreground, background) => {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (rgb) => {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  
  if (!fg || !bg) return null;

  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  
  const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  return {
    ratio: contrast,
    wcagAA: contrast >= 4.5,
    wcagAALarge: contrast >= 3,
    wcagAAA: contrast >= 7
  };
};

// Reduced motion preferences
export const useReducedMotion = () => {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01s');
      document.documentElement.style.setProperty('--transition-duration', '0.01s');
    }
  }, [prefersReducedMotion]);

  return prefersReducedMotion;
};

// Screen reader announcements
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Keyboard navigation utilities
export const handleKeyboardNavigation = (e, actions = {}) => {
  const { onEnter, onSpace, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight } = actions;
  
  switch (e.key) {
    case 'Enter':
      if (onEnter) {
        e.preventDefault();
        onEnter(e);
      }
      break;
    case ' ':
      if (onSpace) {
        e.preventDefault();
        onSpace(e);
      }
      break;
    case 'Escape':
      if (onEscape) {
        e.preventDefault();
        onEscape(e);
      }
      break;
    case 'ArrowUp':
      if (onArrowUp) {
        e.preventDefault();
        onArrowUp(e);
      }
      break;
    case 'ArrowDown':
      if (onArrowDown) {
        e.preventDefault();
        onArrowDown(e);
      }
      break;
    case 'ArrowLeft':
      if (onArrowLeft) {
        e.preventDefault();
        onArrowLeft(e);
      }
      break;
    case 'ArrowRight':
      if (onArrowRight) {
        e.preventDefault();
        onArrowRight(e);
      }
      break;
  }
};

// ARIA live region component
export const LiveRegion = ({ message, level = 'polite', className = '' }) => {
  return (
    <div
      aria-live={level}
      aria-atomic="true"
      className={`sr-only ${className}`}
    >
      {message}
    </div>
  );
};

// Focus visible utility
export const useFocusVisible = () => {
  useEffect(() => {
    // Add focus-visible polyfill behavior
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('using-keyboard');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};

// Alternative text suggestions for images
export const generateAltText = (imageData) => {
  const { title, description, context } = imageData;
  
  if (description) return description;
  if (title && context) return `${title} - ${context}`;
  if (title) return title;
  
  return 'Decorative image'; // For purely decorative images
};

// Form validation accessibility
export const createAccessibleFormField = (fieldId, label, error, required = false) => {
  return {
    fieldProps: {
      id: fieldId,
      'aria-labelledby': `${fieldId}-label`,
      'aria-describedby': error ? `${fieldId}-error` : undefined,
      'aria-invalid': error ? 'true' : 'false',
      'aria-required': required ? 'true' : 'false'
    },
    labelProps: {
      id: `${fieldId}-label`,
      htmlFor: fieldId
    },
    errorProps: error ? {
      id: `${fieldId}-error`,
      role: 'alert',
      'aria-live': 'polite'
    } : null
  };
};