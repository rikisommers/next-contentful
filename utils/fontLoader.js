// utils/fontLoader.js
import { useEffect } from 'react';

const loadGoogleFont = (fontName) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      / /g,
      '+'
    )}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontName]);
};

export default loadGoogleFont;
