/**
 * AW Motion Utilities
 * Simplified vanilla JavaScript animation utilities using @motionone/dom
 * Replacement for Framer Motion patterns from source project
 */

import { animate, stagger } from '@motionone/dom';

/**
 * Animation timing constants matching source project
 */
export const ANIMATION_TIMING = {
  FAST: 0.15,
  DEFAULT: 0.2,
  SLOW: 0.3,
  STAGGER_GAP: 0.03,
} as const;

/**
 * Simple animate function wrapper with consistent API
 */
export function animateElements(
  elements: Element | Element[] | NodeListOf<Element>,
  keyframes: any,
  options: any = {}
): Promise<void> {
  return animate(elements, keyframes, options).finished;
}

/**
 * Stagger animation wrapper
 */
export function animateWithStagger(
  elements: Element[] | NodeListOf<Element>,
  keyframes: any,
  options: { duration?: number; delay?: number; staggerDelay?: number } = {}
): Promise<void> {
  const { duration = 0.6, delay = 0, staggerDelay = 0.03 } = options;
  
  return animate(
    elements,
    keyframes,
    {
      duration,
      delay: stagger(staggerDelay, { start: delay }),
      easing: [0, 0, 0.2, 1],
    }
  ).finished;
}

/**
 * Simple fade in animation
 */
export function fadeIn(
  element: Element,
  options: { duration?: number; delay?: number } = {}
): Promise<void> {
  const { duration = 0.6, delay = 0 } = options;
  
  return animate(
    element,
    { opacity: [0, 1] },
    {
      duration,
      delay,
      easing: [0, 0, 0.2, 1],
    }
  ).finished;
}

/**
 * Slide up animation
 */
export function slideUp(
  element: Element,
  options: { duration?: number; delay?: number; distance?: string } = {}
): Promise<void> {
  const { duration = 0.6, delay = 0, distance = '20px' } = options;
  
  return animate(
    element,
    {
      opacity: [0, 1],
      transform: [`translateY(${distance})`, 'translateY(0px)'],
    },
    {
      duration,
      delay,
      easing: [0, 0, 0.2, 1],
    }
  ).finished;
}

/**
 * Scale animation
 */
export function scaleIn(
  element: Element,
  options: { duration?: number; delay?: number; scale?: number } = {}
): Promise<void> {
  const { duration = 0.3, delay = 0, scale = 0.95 } = options;
  
  return animate(
    element,
    {
      opacity: [0, 1],
      transform: [`scale(${scale})`, 'scale(1)'],
    },
    {
      duration,
      delay,
      easing: [0, 0, 0.2, 1],
    }
  ).finished;
}

/**
 * Create intersection observer for scroll-triggered animations
 */
export function createScrollObserver(
  element: Element,
  callback: () => void,
  options: { threshold?: number; once?: boolean } = {}
): IntersectionObserver {
  const { threshold = 0.4, once = true } = options;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold }
  );
  
  observer.observe(element);
  return observer;
}

/**
 * Animation utilities for common UI patterns
 */
export const AwMotion = {
  // Core functions
  animate: animateElements,
  stagger: animateWithStagger,
  
  // Common animations
  fadeIn,
  slideUp,
  scaleIn,
  
  // Observers
  scrollObserver: createScrollObserver,
  
  // Constants
  timing: ANIMATION_TIMING,
} as const;

export default AwMotion;