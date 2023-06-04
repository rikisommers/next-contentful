import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback, options = {}, runOnce = true) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          callback(); // Invoke the provided callback when the ref is not intersecting
          if (runOnce) {
            observer.unobserve(ref.current); // Unobserve the ref if runOnce is set to true
          }
        }
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return ref;
};

export default useIntersectionObserver;