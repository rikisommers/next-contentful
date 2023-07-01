import React, { useRef, useEffect } from 'react';

const ScrollingComponent = ({children}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const scrollMax = container.scrollWidth - container.clientWidth;
      const scrollPos = container.scrollLeft;

      if (scrollPos === 0) {
        container.scrollLeft = scrollMax;
      } else if (scrollPos === scrollMax) {
        container.scrollLeft = 0;
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '200px',
        overflow: 'scroll',
        scrollBehavior: 'smooth',
        display: 'flex',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollingComponent;
