import Lenis from "@studio-freight/lenis";

let lenisInstance = null;

export function getLenisInstance() {
  if (!lenisInstance && typeof window !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 0.6,
      smoothWheel: true,
      // Add any other Lenis options you need
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