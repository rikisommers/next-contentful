import Lenis from "lenis";

let lenisInstance = null;

export function getLenisInstance() {
  if (!lenisInstance && typeof window !== 'undefined') {
    // Respect the visitor's motion preference: native scrolling instead of smoothing.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lenisInstance = new Lenis({
      duration: 0.6,
      smoothWheel: !reduceMotion,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  return lenisInstance;
}

export function destroyLenisInstance() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}