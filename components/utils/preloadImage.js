import { useEffect } from 'react';

const PreloadImage = ({ src, alt }) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return <img src={src} alt={alt} style={{ display: 'none' }} />;
};

export default PreloadImage;