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




  // Render different effects based on active effect
  const renderEffect = () => {
    switch (activeEffect) {
      case 'blueNoise':
        return (
          <BlueNoise />
        );
      case 'noiseDither':
        return (
          <NoiseDither />
        );
      case 'orderedDither':
        return (
          <OrderedDither />
        );
      case 'colorQuant':
        return (
          <ColorQuant />
        );
      case 'colorQuant2':
        return (
          <ColorQuant2 />
        );
      case 'rect':
        return (
          <Rect />
        );
      case 'dots':
        return (
          <Dots />
        );
      case 'ascii':
        return (
          <Ascii />
        );
      case 'ascii2':
        return (
          <Ascii2 />
        );
      case 'luma':
        return (
          <Luma />
        );
      case 'led':
        return (
          <Led />
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