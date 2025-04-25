import Image from 'next/image'
import { useThemeContext } from '../context/themeContext';

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}
//priority eager
const BlendImage = (props) => {
  const { currentTheme } = useThemeContext();
  const contrast = currentTheme.data.imageTextureContrast || "100%";
  const brightness = currentTheme.data.imageTextureBrightness || "100%";
  const texture = currentTheme.data.imageTexture || "none";

  // Set CSS variables for the gradient
  const gradientStyle = {
    '--image-texture-contrast': contrast,
    '--image-texture-brightness': brightness,
  };

  // Render different image styles based on texture type
  switch (texture) {
    case 'noise':
      return (
        <div className="relative w-full h-full grainy">
          <Image 
            loading='lazy'   
            alt="fdd"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            loader={contentfulLoader} 
            {...props} 
            width={400}
            height={200}
            style={{
              filter: `contrast(${contrast}) brightness(${brightness})`,
              backgroundColor: 'var(--accent-sec)',
            }}
            className="object-cover w-full h-full greyscale"
          />
        </div>
      );
    
    case 'pixelated':
      return (
        <div className="relative">
          {/* SVG filter definition */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="pixelate" x="0" y="0">
                <feFlood x="4" y="4" height="2" width="2"/>
                <feComposite width="10" height="10"/>
                <feTile result="a"/>
                <feComposite in="SourceGraphic" in2="a" operator="in"/>
                <feMorphology operator="dilate" radius="5"/>
              </filter>
            </defs>
          </svg>
          
          <Image 
            loading='lazy'   
            alt="fdd"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            loader={contentfulLoader} 
            {...props} 
            width={400}
            height={200}
            style={{
              mixBlendMode: currentTheme.data.imageMixBlendMode,
              filter: `url(#pixelate) contrast(${contrast}) brightness(${brightness})`,
            }}
            className="object-cover w-full h-full greyscale"
          />
        </div>
      );
    
    default:
      return (
        <div>
          <Image 
            loading='lazy'   
            alt="fdd"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
            loader={contentfulLoader} 
            {...props} 
            width={400}
            height={200}
            style={{
              mixBlendMode: currentTheme.data.imageMixBlendMode,
            }}
            className="object-cover w-full h-full greyscale"
          />
        </div>
      );
  }
}

export default BlendImage
