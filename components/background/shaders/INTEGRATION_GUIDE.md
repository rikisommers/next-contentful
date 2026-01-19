# Integration Guide for Efecto-Inspired Shader Effects

## Overview

This guide explains how to integrate the new efecto-inspired shader effects into your canvas background system.

## Files Created

### Theme Configuration
- **Updated:** `utils/theme.js` - Added 22 new effect types to `shaderEffect` object

### ASCII Shader Files (Halftone Directory)
- `halftone/ascii-standard.glsl` - Classic ASCII art
- `halftone/ascii-dense.glsl` - High-density characters
- `halftone/ascii-minimal.glsl` - Minimalist style
- `halftone/ascii-blocks.glsl` - Block characters
- `halftone/ascii-braille.glsl` - Braille patterns
- `halftone/ascii-technical.glsl` - Hex/technical display
- `halftone/ascii-matrix.glsl` - Matrix digital rain
- `halftone/ascii-hatching.glsl` - Cross-hatch patterns

### Dithering Shader Files (Dither Directory)
- `dither/floyd-steinberg.glsl` - Floyd-Steinberg (1976)
- `dither/atkinson.glsl` - Atkinson (Macintosh, 1984)
- `dither/jarvis-judice-ninke.glsl` - JJN smooth gradients
- `dither/stucki.glsl` - Stucki balanced
- `dither/burkes.glsl` - Burkes simplified
- `dither/sierra.glsl` - Sierra three-row
- `dither/sierra-2.glsl` - Sierra two-row
- `dither/sierra-lite.glsl` - Sierra minimal

### Halftone Shader Files (Halftone Directory)
- `halftone/halftone-dots.glsl` - Circular dots (newspaper)
- `halftone/halftone-circles.glsl` - Concentric circles
- `halftone/halftone-squares.glsl` - Square grid
- `halftone/halftone-lines.glsl` - Horizontal lines
- `halftone/halftone-crosshatch.glsl` - Crosshatch pattern
- `halftone/halftone-newspaper.glsl` - CMYK-style angled dots

### Documentation
- `shaders/EFECTO_EFFECTS_README.md` - Comprehensive effect documentation
- `shaders/INTEGRATION_GUIDE.md` - This file

---

## Integration Steps

### Step 1: Import Shader Files

You'll need to import the GLSL shader files in your canvas background component. Follow the existing pattern:

```javascript
// Example for ASCII effects
import asciiStandardShader from './shaders/halftone/ascii-standard.glsl';
import asciiDenseShader from './shaders/halftone/ascii-dense.glsl';
import asciiMinimalShader from './shaders/halftone/ascii-minimal.glsl';
// ... etc

// Example for dithering effects
import floydSteinbergShader from './shaders/dither/floyd-steinberg.glsl';
import atkinsonShader from './shaders/dither/atkinson.glsl';
// ... etc

// Example for halftone effects
import halftoneDots from './shaders/halftone/halftone-dots.glsl';
import halftoneCircles from './shaders/halftone/halftone-circles.glsl';
// ... etc
```

### Step 2: Create Effect Implementations

For each shader, create an Effect class implementation following the postprocessing library pattern:

```javascript
import { Effect } from 'postprocessing';
import * as THREE from 'three';

// ASCII Effects
class ASCIIStandardEffectImpl extends Effect {
  constructor({ pixelSize = 12.0, asciiTexture, charCount, showBackground = false }) {
    const uniforms = new Map([
      ['pixelSize', new THREE.Uniform(pixelSize)],
      ['asciiTexture', new THREE.Uniform(asciiTexture)],
      ['charCount', new THREE.Uniform(new THREE.Vector2(charCount, 1))],
      ['showBackground', new THREE.Uniform(showBackground)],
    ]);

    super('ASCIIStandardEffect', asciiStandardShader, { uniforms });
    this.uniforms = uniforms;
  }
}

// Dithering Effects
class FloydSteinbergEffectImpl extends Effect {
  constructor({ colorLevels = 4 }) {
    const uniforms = new Map([
      ['colorLevels', new THREE.Uniform(colorLevels)],
    ]);

    super('FloydSteinbergEffect', floydSteinbergShader, { uniforms });
    this.uniforms = uniforms;
  }
}

// Halftone Effects
class HalftoneDotsEffectImpl extends Effect {
  constructor({ pixelSize = 8.0 }) {
    const uniforms = new Map([
      ['pixelSize', new THREE.Uniform(pixelSize)],
    ]);

    super('HalftoneDotsEffect', halftoneDots, { uniforms });
    this.uniforms = uniforms;
  }
}
```

### Step 3: Wrap Effects

Wrap each effect using the postprocessing library's `wrapEffect`:

```javascript
import { wrapEffect } from '@react-three/postprocessing';

const ASCIIStandardEffect = wrapEffect(ASCIIStandardEffectImpl);
const FloydSteinbergEffect = wrapEffect(FloydSteinbergEffectImpl);
const HalftoneDotsEffect = wrapEffect(HalftoneDotsEffectImpl);
// ... etc
```

### Step 4: Create Effect Mapper

Create a mapper function to select the appropriate effect based on the theme setting:

```javascript
export const getShaderEffect = (effectType, params = {}) => {
  const effectMap = {
    // ASCII effects
    'ascii_standard': () => <ASCIIStandardEffect {...params} />,
    'ascii_dense': () => <ASCIIDenseEffect {...params} />,
    'ascii_minimal': () => <ASCIIMinimalEffect {...params} />,
    'ascii_blocks': () => <ASCIIBlocksEffect {...params} />,
    'ascii_braille': () => <ASCIIBrailleEffect {...params} />,
    'ascii_technical': () => <ASCIITechnicalEffect {...params} />,
    'ascii_matrix': () => <ASCIIMatrixEffect {...params} />,
    'ascii_hatching': () => <ASCIIHatchingEffect {...params} />,
    
    // Dithering effects
    'dither_floyd_steinberg': () => <FloydSteinbergEffect {...params} />,
    'dither_atkinson': () => <AtkinsonEffect {...params} />,
    'dither_jarvis_judice_ninke': () => <JarvisJudiceNinkeEffect {...params} />,
    'dither_stucki': () => <StuckiEffect {...params} />,
    'dither_burkes': () => <BurkesEffect {...params} />,
    'dither_sierra': () => <SierraEffect {...params} />,
    'dither_sierra2': () => <Sierra2Effect {...params} />,
    'dither_sierra_lite': () => <SierraLiteEffect {...params} />,
    
    // Halftone effects
    'halftone_dots': () => <HalftoneDotsEffect {...params} />,
    'halftone_circles': () => <HalftoneCirclesEffect {...params} />,
    'halftone_squares': () => <HalftoneSquaresEffect {...params} />,
    'halftone_lines': () => <HalftoneLinesEffect {...params} />,
    'halftone_crosshatch': () => <HalftoneCrosshatchEffect {...params} />,
    'halftone_newspaper': () => <HalftoneNewspaperEffect {...params} />,
  };

  return effectMap[effectType] ? effectMap[effectType]() : null;
};
```

### Step 5: Use in Canvas Background Component

Apply the effect in your canvas background component:

```javascript
import { EffectComposer } from '@react-three/postprocessing';
import { useThemeContext } from '../context/themeContext';

const CanvasBackgroundWithEffect = () => {
  const { currentTheme } = useThemeContext();
  const effectType = currentTheme?.data?.heroShaderEffect;
  
  // Set parameters based on theme or defaults
  const effectParams = {
    pixelSize: currentTheme?.data?.halftoneSize || 12.0,
    colorLevels: currentTheme?.data?.ditherLevels || 4,
    showBackground: true,
  };

  return (
    <>
      {/* Your 3D scene content */}
      <mesh>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={yourImageTexture} />
      </mesh>
      
      {/* Apply effects */}
      <EffectComposer>
        {getShaderEffect(effectType, effectParams)}
      </EffectComposer>
    </>
  );
};
```

---

## Configuration Options

### ASCII Effects

**Common Parameters:**
- `pixelSize` (number, default: 12.0): Size of each ASCII character cell
- `asciiTexture` (THREE.Texture): Texture containing rendered ASCII characters
- `charCount` (number): Number of characters in the ASCII set
- `showBackground` (boolean, default: false): Show original image colors

**ASCII Character Sets:**

```javascript
const ASCII_SETS = {
  standard: ' .:-=+*#%@',
  dense: ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
  minimal: ' .o0@',
  technical: '01234567890ABCDEF',
};
```

### Dithering Effects

**Common Parameters:**
- `colorLevels` (number, default: 4): Number of quantization levels (2-16)
  - 2: Black & white
  - 4: Game Boy style
  - 8: Retro computing
  - 16: Smoother gradients

**Effect-Specific Notes:**
- **Atkinson:** Works best with `colorLevels: 2` for authentic Mac look
- **JJN:** Best with `colorLevels: 8-16` for smooth gradients
- **Sierra Lite:** Faster, use for real-time applications

### Halftone Effects

**Common Parameters:**
- `pixelSize` (number, default: 8.0): Size of halftone pattern cells
  - Small (4-8): Fine detail, more processing
  - Medium (8-16): Balanced
  - Large (16-32): Bold, graphic look

---

## Performance Optimization

### Effect Performance Tiers

**Tier 1 (Fastest):**
- `ascii_minimal`
- `ascii_blocks`
- `dither_sierra_lite`
- `halftone_lines`

**Tier 2 (Medium):**
- `ascii_standard`
- `dither_floyd_steinberg`
- `dither_burkes`
- `halftone_dots`
- `halftone_squares`

**Tier 3 (Slower):**
- `ascii_dense`
- `dither_jarvis_judice_ninke`
- `halftone_newspaper`

**Tier 4 (Heaviest):**
- `ascii_matrix` (animated, includes time calculations)

### Optimization Tips

1. **Reduce Resolution:**
   ```javascript
   <Canvas dpr={[1, 1.5]}> {/* Lower device pixel ratio */}
   ```

2. **Increase Pixel Size:**
   ```javascript
   effectParams={{ pixelSize: 16 }} // Larger = fewer calculations
   ```

3. **Use Lower Color Levels:**
   ```javascript
   effectParams={{ colorLevels: 2 }} // Fewer levels = faster
   ```

4. **Lazy Load Effects:**
   ```javascript
   import { lazy, Suspense } from 'react';
   const HeavyEffect = lazy(() => import('./effects/heavy-effect'));
   ```

---

## Troubleshooting

### Common Issues

**Issue: Effect not displaying**
- Check that GLSL file is imported correctly
- Verify uniforms are properly initialized
- Check browser console for shader compilation errors

**Issue: Effect looks pixelated/blocky**
- Increase `pixelSize` parameter
- Check image texture resolution
- Verify `resolution` uniform is passed correctly

**Issue: ASCII characters not rendering**
- Ensure ASCII texture is generated correctly
- Check `charCount` matches actual character set length
- Verify texture filtering is set to `NearestFilter`

**Issue: Poor performance**
- Reduce pixel size (counter-intuitive but reduces shader calls)
- Lower color levels for dithering
- Use lower device pixel ratio
- Consider switching to a Tier 1 or Tier 2 effect

### Shader Compilation Errors

If you see shader compilation errors:

1. Check GLSL syntax in shader files
2. Verify all uniforms are declared
3. Ensure `mainImage` function signature is correct:
   ```glsl
   void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
   ```

---

## Testing Checklist

- [ ] All shader files compile without errors
- [ ] Effects render correctly on different devices
- [ ] Parameters can be adjusted via theme controls
- [ ] Performance is acceptable on target devices
- [ ] Effects work with different image types/sizes
- [ ] No memory leaks when switching effects
- [ ] Effects clean up properly when unmounted

---

## Example Implementation

See the comprehensive example in `canvasImageComponent.js` for a complete implementation showing how to:
- Import and initialize effects
- Create ASCII textures dynamically
- Handle effect switching
- Manage performance
- Integrate with theme system

---

## Next Steps

1. Create JSX wrapper files for each effect (optional, can be done incrementally)
2. Add theme control UI for effect parameters
3. Create preset configurations for common use cases
4. Add effect previews in theme selector
5. Implement color palette support (future enhancement)
6. Add CRT post-effects (scanlines, curvature, etc.)

---

## Resources

- [postprocessing library docs](https://pmndrs.github.io/postprocessing/public/docs/)
- [React Three Fiber docs](https://docs.pmnd.rs/react-three-fiber/)
- [Efecto.app](https://efecto.app/)
- [The Book of Shaders](https://thebookofshaders.com/)
- [Shadertoy](https://www.shadertoy.com/)

---

## Support

For questions or issues:
1. Check the EFECTO_EFFECTS_README.md for effect details
2. Review existing shader implementations in the codebase
3. Test shaders in isolation using the demo components
4. Check browser console for WebGL errors

