import { useThemeContext } from '../context/themeContext';
import BlueNoise from './shaders/dither/blue-noise-dither';
import OrderedDither from './shaders/dither/ordered-dither';
import ColorQuant from './shaders/dither/color-quant-dither';
import ColorQuant2 from './shaders/dither/color-quant-dither2';
import Rect from './shaders/halftone/rect';
import Dots from './shaders/halftone/dots';
import Ascii from './shaders/halftone/ascii';
import Ascii2 from './shaders/halftone/ascii2';
import Luma from './shaders/halftone/luma';
import Led from './shaders/halftone/led';
import Lego from './shaders/halftone/lego';
import Progress from './shaders/dynamic/progress';
import NoiseDither from './shaders/dither/noise-dither';

export default function CanvasShader() {
  const { currentTheme } = useThemeContext();
  const activeEffect = currentTheme.data.shaderType;
    const accentPrimary = currentTheme.data.accentPrimary;
    const accentSecondary = currentTheme.data.accentSecondary;


  // Render different effects based on active effect
  const renderEffect = () => {
    switch (activeEffect) {
      case 'blueNoise':
        return (
          <BlueNoise theme={currentTheme} />
        );
      case 'noiseDither':
        return (
          <NoiseDither />
        );
      case 'orderedDither':
        return (
          <OrderedDither theme={currentTheme} />
        );
      case 'colorQuant':
        return (
          <ColorQuant theme={currentTheme} />
        );
      case 'colorQuant2':
        return (
          <ColorQuant2 theme={currentTheme} />
        );
      case 'rect':
        return (
          <Rect theme={currentTheme} />
        );
      case 'dots':
        return (
          <Dots theme={currentTheme} />
        );
      case 'ascii':
        return (
          <Ascii theme={currentTheme} />
        );
      case 'ascii2':
        return (
          <Ascii2 theme={currentTheme} />
        );
      case 'luma':
        return (
          <Luma theme={currentTheme} />
        );
      case 'led':
        return (
          <Led theme={currentTheme} />
        );
      case 'lego':
        return (
          <Lego />
        );
      case 'progress':
        return (
          <Progress />
        );
      default:
        return <rect />;
    }
  };

  return renderEffect();

} 