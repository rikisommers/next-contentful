import { useThemeContext } from '../context/themeContext';

// export const imageTextureThemes = {
//   none: 'none',
//   noise: 'noise',
//   paper: 'paper',
//   grain: 'grain',
//   pixelated: 'pixelated',
// }


export default function TextureContainer({children}) {

  const { currentTheme } = useThemeContext();
const contrast = currentTheme.data.imageTextureContrast || "100%";
const brightness = currentTheme.data.imageTextureBrightness || "100%";
const texture = currentTheme.data.imageTexture || "none";

// Set CSS variables for the gradient
const gradientStyle = {
  '--image-texture-contrast': contrast,
  '--image-texture-brightness': brightness,
};

  return (
    <div className={`relative w-full h-full ${texture}`}>
      {children}
    </div>
  );
}