# Effect Name Mapping Reference

This document shows how the theme configuration names map to the actual shader files.

## heroShaderEffectThemes Configuration

When using effects in your theme configuration, use these keys from `heroShaderEffectThemes`:

---

## ASCII Variants

| Theme Config Key | Maps to Shader File | Description |
|-----------------|---------------------|-------------|
| `ascii_standard` | `halftone/ascii-standard.glsl` | Classic ASCII art |
| `ascii_dense` | `halftone/ascii-dense.glsl` | High-density characters |
| `ascii_minimal` | `halftone/ascii-minimal.glsl` | Minimalist style |
| `ascii_blocks` | `halftone/ascii-blocks.glsl` | Block characters (░▒▓█) |
| `ascii_braille` | `halftone/ascii-braille.glsl` | Braille dot patterns |
| `ascii_technical` | `halftone/ascii-technical.glsl` | Hex terminal display |
| `ascii_matrix` | `halftone/ascii-matrix.glsl` | Matrix digital rain (animated) |
| `ascii_hatching` | `halftone/ascii-hatching.glsl` | Cross-hatch sketch |

---

## Dithering Algorithms

| Theme Config Key | Maps to Shader File | Description |
|-----------------|---------------------|-------------|
| `dither_floyd_steinberg` | `dither/floyd-steinberg.glsl` | Classic 1976 algorithm |
| `dither_atkinson` | `dither/atkinson.glsl` | Macintosh 1984 style |
| `dither_jarvis_judice_ninke` | `dither/jarvis-judice-ninke.glsl` | Ultra-smooth gradients |
| `dither_stucki` | `dither/stucki.glsl` | Balanced structure |
| `dither_burkes` | `dither/burkes.glsl` | Fast simplified |
| `dither_sierra` | `dither/sierra.glsl` | Natural looking |
| `dither_sierra2` | `dither/sierra-2.glsl` | Two-row faster |
| `dither_sierra_lite` | `dither/sierra-lite.glsl` | Minimal fastest |

---

## Halftone Variants

| Theme Config Key | Maps to Shader File | Description |
|-----------------|---------------------|-------------|
| `halftone_dots_new` | `halftone/halftone-dots.glsl` | Newspaper print dots (new) |
| `halftone_circles` | `halftone/halftone-circles.glsl` | Concentric wave patterns |
| `halftone_squares` | `halftone/halftone-squares.glsl` | Geometric grid |
| `halftone_lines` | `halftone/halftone-lines.glsl` | CRT scanlines |
| `halftone_crosshatch` | `halftone/halftone-crosshatch.glsl` | Engraving style |
| `halftone_newspaper` | `halftone/halftone-newspaper.glsl` | CMYK 45° authentic |

---

## Original Effects (Already Implemented)

| Theme Config Key | Description |
|-----------------|-------------|
| `halftone_dots` | Original halftone dots |
| `halftone_ascii` | Original ASCII effect |
| `halftone_led` | LED display effect |
| `halftone_lego` | LEGO brick effect |
| `halftone_rect` | Rectangle pattern |
| `noise` | Noise effect |
| `pixelation` | Pixelation effect |
| `dither_blue_noise` | Blue noise dithering |
| `dither_ordered` | Ordered dithering |
| `dither_color_quant` | Color quantization |

---

## Usage Examples

### In Theme Configuration

```javascript
import { heroShaderEffectThemes } from '@/utils/theme';

// ASCII effects
heroShaderEffect: heroShaderEffectThemes.ascii_standard
heroShaderEffect: heroShaderEffectThemes.ascii_matrix
heroShaderEffect: heroShaderEffectThemes.ascii_technical

// Dithering effects
heroShaderEffect: heroShaderEffectThemes.dither_floyd_steinberg
heroShaderEffect: heroShaderEffectThemes.dither_atkinson
heroShaderEffect: heroShaderEffectThemes.dither_jarvis_judice_ninke

// Halftone effects
heroShaderEffect: heroShaderEffectThemes.halftone_newspaper
heroShaderEffect: heroShaderEffectThemes.halftone_circles
heroShaderEffect: heroShaderEffectThemes.halftone_crosshatch
```

### In Component Implementation

When implementing the effect loader, map the theme value to the shader file:

```javascript
import asciiStandardShader from './shaders/halftone/ascii-standard.glsl';
import floydSteinbergShader from './shaders/dither/floyd-steinberg.glsl';
import halftoneDotsShader from './shaders/halftone/halftone-dots.glsl';

const shaderMap = {
  'ascii-standard': asciiStandardShader,
  'dither-floyd-steinberg': floydSteinbergShader,
  'halftone-dots-new': halftoneDotsShader,
  // ... etc
};

const getShader = (effectName) => shaderMap[effectName];
```

---

## File Naming Conventions

**Theme Keys:** Use underscores (`_`)
- Example: `ascii_standard`, `dither_floyd_steinberg`

**Theme Values:** Use hyphens (`-`)
- Example: `'ascii-standard'`, `'dither-floyd-steinberg'`

**Shader Files:** Use hyphens (`-`)
- Example: `ascii-standard.glsl`, `floyd-steinberg.glsl`

---

## Complete Effect List (33 Total)

### By Category

**ASCII (9 total):**
- 1 original (`halftone_ascii`)
- 8 new (`ascii_standard`, `ascii_dense`, `ascii_minimal`, `ascii_blocks`, `ascii_braille`, `ascii_technical`, `ascii_matrix`, `ascii_hatching`)

**Dithering (11 total):**
- 3 original (`dither_blue_noise`, `dither_ordered`, `dither_color_quant`)
- 8 new (`dither_floyd_steinberg`, `dither_atkinson`, `dither_jarvis_judice_ninke`, `dither_stucki`, `dither_burkes`, `dither_sierra`, `dither_sierra2`, `dither_sierra_lite`)

**Halftone (11 total):**
- 5 original (`halftone_dots`, `halftone_led`, `halftone_lego`, `halftone_rect`, `halftone_ascii`)
- 6 new (`halftone_dots_new`, `halftone_circles`, `halftone_squares`, `halftone_lines`, `halftone_crosshatch`, `halftone_newspaper`)

**Other (2):**
- `noise`
- `pixelation`

---

## Quick Selection Guide

### Want Retro Computing?
```javascript
heroShaderEffect: heroShaderEffectThemes.ascii_technical
heroShaderEffect: heroShaderEffectThemes.dither_atkinson
heroShaderEffect: heroShaderEffectThemes.ascii_blocks
```

### Want Newspaper Print?
```javascript
heroShaderEffect: heroShaderEffectThemes.halftone_newspaper
heroShaderEffect: heroShaderEffectThemes.dither_floyd_steinberg
```

### Want Artistic Sketch?
```javascript
heroShaderEffect: heroShaderEffectThemes.ascii_hatching
heroShaderEffect: heroShaderEffectThemes.halftone_crosshatch
```

### Want Cyberpunk/Matrix?
```javascript
heroShaderEffect: heroShaderEffectThemes.ascii_matrix  // Animated!
heroShaderEffect: heroShaderEffectThemes.ascii_technical
```

### Want Modern/Minimal?
```javascript
heroShaderEffect: heroShaderEffectThemes.ascii_minimal
heroShaderEffect: heroShaderEffectThemes.halftone_squares
```

---

## Performance Tiers

**Fast:**
- `ascii_minimal`
- `ascii_blocks`
- `dither_sierra_lite`
- `halftone_lines`

**Medium:**
- `ascii_standard`
- `dither_floyd_steinberg`
- `dither_burkes`
- `halftone_dots_new`
- `halftone_squares`

**Slower:**
- `ascii_dense`
- `dither_jarvis_judice_ninke`
- `halftone_newspaper`
- `ascii_hatching`

**Special (Animated):**
- `ascii_matrix` (requires animation loop)

---

## Notes

1. All new effects require implementation in your canvas background component
2. Effects marked as "new" need shader wrapper components created
3. The original effects are already implemented and working
4. Parameter names (pixelSize, colorLevels, etc.) are documented in EFECTO_EFFECTS_README.md

---

## See Also

- **EFECTO_EFFECTS_README.md** - Complete effect descriptions
- **INTEGRATION_GUIDE.md** - Implementation instructions
- **VISUAL_REFERENCE.md** - Visual selection guide
- **IMPLEMENTATION_SUMMARY.md** - Project overview

