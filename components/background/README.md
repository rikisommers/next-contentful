# Canvas Background Components

This directory contains React components for creating dynamic, WebGL-powered backgrounds that can be controlled via theme settings.

## Components

### 1. CanvasGradientBackground

A WebGL-powered gradient background that supports:
- Linear gradients
- Conic gradients
- Color customization
- Gradient midpoint adjustment

```jsx
import CanvasGradientBackground from '../components/background/canvasGradientBackground';

// Basic usage with theme defaults
<CanvasGradientBackground />

// Specify gradient type
<CanvasGradientBackground gradientType="conic" />

// Customize conic gradient
<CanvasGradientBackground 
  gradientType="conic"
  conicCenterX={0.7}
  conicCenterY={0.3}
  conicRotation={45}
/>
```

### 2. CanvasImageComponent

A Three.js powered component for rendering various visual effects:
- Watercolor effect
- Noise effect
- Pixelation effect
- Halftone effect (newspaper-style dot patterns)

The component can apply effects to:
- A default 3D object (when no image is provided)
- An image provided via the `src` prop

```jsx
import CanvasImageComponent from '../components/background/canvasImageComponent';

// Basic usage with theme defaults
<CanvasImageComponent />

// Specify effect
<CanvasImageComponent effect="watercolor" />
<CanvasImageComponent effect="noise" />
<CanvasImageComponent effect="pixel" />
<CanvasImageComponent effect="halftone" />

// Apply effect to an image
<CanvasImageComponent 
  effect="noise" 
  src="https://example.com/your-image.jpg" 
/>

// Use in a block component
return <CanvasImageComponent effect="watercolor" src={image.url} />;
```

### 3. CanvasEffectDemo

A demo component that showcases the CanvasImageComponent with interactive controls.

```jsx
import CanvasEffectDemo from '../components/background/canvasEffectDemo';

// Use in your app
<CanvasEffectDemo />
```

## Theme Integration

Both components read settings from the theme context. You can configure the following theme properties:

### For CanvasGradientBackground:

```js
const theme = {
  data: {
    // Gradient colors
    gradStart: '#ff00ff',
    gradStop: '#00ffff',
    
    // Gradient type
    gradientType: 'linear', // or 'conic'
    
    // Linear gradient settings
    gradMidPoint: 0.5,
    
    // Conic gradient settings
    conicCenterX: 0.5,
    conicCenterY: 0.5,
    conicRotation: 0 // in radians
  }
};
```

### For CanvasImageComponent:

```js
const theme = {
  data: {
    // Common settings
    canvasEffect: 'watercolor', // or 'noise', 'pixel', 'halftone'
    effectColor: 'hotpink',
    backgroundColor: '#3386E0',
    imageSrc: 'https://example.com/your-image.jpg', // Optional image URL
    
    // Watercolor specific settings
    effectScale: 9.0,
    effectColorLevels: 4.0,
    
    // Noise specific settings
    noiseScale: 5.0,
    noiseIntensity: 0.15,
    
    // Pixel specific settings
    pixelDensity: 20.0,
    
    // Halftone specific settings
    halftoneSize: 10.0,
    halftoneShape: 'circle', // or 'square'
    halftoneInvert: false
  }
};
```

## Dependencies

These components require:

- React
- Three.js
- @react-three/fiber
- @react-three/drei
- uuid

Make sure these dependencies are installed in your project.

## Performance Considerations

- The WebGL backgrounds can be resource-intensive on lower-end devices
- Consider adding a setting to disable effects on mobile devices
- Use the `dpr` prop in Canvas to adjust resolution based on device capabilities 