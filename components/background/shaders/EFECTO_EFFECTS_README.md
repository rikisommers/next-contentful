# Efecto-Inspired WebGL Shader Effects

This implementation extends the canvas background image effects with various ASCII, dithering, and halftone algorithms inspired by [efecto.app](https://efecto.app/).

## Overview

These shaders can be applied when the background type is `canvasImage`. They transform the source image using real-time WebGL processing to create retro, artistic, and CRT-era visual effects.

## Effect Categories

### 1. ASCII Variants

ASCII art effects that convert images into text-based representations using different character sets and styles.

#### `ascii_standard`
**File:** `halftone/ascii-standard.glsl`  
**Character Set:** ` .:-=+*#%@`  
**Description:** Classic ASCII art with a full range of characters ordered by density from light to dark.  
**Use Case:** Traditional ASCII art look, good for readability.

#### `ascii_dense`
**File:** `halftone/ascii-dense.glsl`  
**Character Set:** ` .'^\`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$`  
**Description:** High-density character set for detailed rendering with smoother gradients.  
**Use Case:** When you need more detail and smoother transitions.

#### `ascii_minimal`
**File:** `halftone/ascii-minimal.glsl`  
**Character Set:** ` .o0@`  
**Description:** Simple character set for bold, clean look with high contrast.  
**Use Case:** Modern, minimalist aesthetic with strong visual impact.

#### `ascii_blocks`
**File:** `halftone/ascii-blocks.glsl`  
**Character Set:** ` ░▒▓█` (block drawing characters)  
**Description:** Creates a mosaic/pixelated look using Unicode block characters.  
**Use Case:** Retro pixelated effect, reminiscent of early computer graphics.

#### `ascii_braille`
**File:** `halftone/ascii-braille.glsl`  
**Pattern:** Braille dot patterns (2×4 grid)  
**Description:** Uses Braille patterns to create fine-grained texture with dot-based representation.  
**Use Case:** Unique tactile-looking texture, great for abstract effects.

#### `ascii_technical`
**File:** `halftone/ascii-technical.glsl`  
**Character Set:** `01234567890ABCDEF`  
**Description:** Hex characters with green tint for technical/terminal aesthetic.  
**Use Case:** Matrix-style, hacker/tech aesthetic, terminal displays.

#### `ascii_matrix`
**File:** `halftone/ascii-matrix.glsl`  
**Description:** Matrix-style digital rain effect with scanning animation.  
**Use Case:** Cyberpunk, sci-fi interfaces, dynamic animated backgrounds.  
**Note:** Includes time-based animation with vertical scanning effect.

#### `ascii_hatching`
**File:** `halftone/ascii-hatching.glsl`  
**Pattern:** Cross-hatching lines (/, \, X, #)  
**Description:** Pencil sketch effect using cross-hatching patterns.  
**Use Case:** Artistic hand-drawn look, technical illustrations.

---

### 2. Dithering Algorithms

Error diffusion algorithms that create the illusion of color depth with limited palettes. Each algorithm distributes quantization error differently.

#### `dither_floyd_steinberg`
**File:** `dither/floyd-steinberg.glsl`  
**Year:** 1976  
**Distribution:** Right(7/16), Below-left(3/16), Below(5/16), Below-right(1/16)  
**Description:** The classic error diffusion algorithm. Distributes 100% of error.  
**Characteristics:** Balanced, organic patterns, industry standard.  
**Use Case:** Best all-around dithering for most images.

#### `dither_atkinson`
**File:** `dither/atkinson.glsl`  
**Year:** 1984  
**Distribution:** Only 75% of error (6/8)  
**Description:** Created by Bill Atkinson for the original Macintosh.  
**Characteristics:** Higher contrast, "crunchy" quality, slightly lost detail.  
**Use Case:** High-contrast images, retro Mac aesthetic, artistic effect.

#### `dither_jarvis_judice_ninke`
**File:** `dither/jarvis-judice-ninke.glsl`  
**Year:** 1976  
**Distribution:** 12 neighbors across 3 rows  
**Description:** Spreads error widely for ultra-smooth gradients.  
**Characteristics:** Smoothest gradients, minimal artifacts, slower processing.  
**Use Case:** High-quality images requiring smooth transitions.

#### `dither_stucki`
**File:** `dither/stucki.glsl`  
**Distribution:** Similar to JJN with different weights  
**Description:** Balanced error distribution with slightly more structure.  
**Characteristics:** Smooth gradients with defined edges.  
**Use Case:** Balance between smoothness and structure.

#### `dither_burkes`
**File:** `dither/burkes.glsl`  
**Distribution:** Simplified Stucki with fewer neighbors  
**Description:** Good balance between speed and quality.  
**Characteristics:** Fast, clean results, less smooth than JJN.  
**Use Case:** Performance-conscious applications.

#### `dither_sierra`
**File:** `dither/sierra.glsl`  
**Distribution:** Three-row filter  
**Description:** Balanced, natural-looking dithering.  
**Characteristics:** Natural appearance, good for photos.  
**Use Case:** Photographic images, natural content.

#### `dither_sierra2`
**File:** `dither/sierra-2.glsl`  
**Distribution:** Two-row version of Sierra  
**Description:** Faster with similar quality to full Sierra.  
**Characteristics:** Good performance/quality balance.  
**Use Case:** When Sierra quality is needed with better performance.

#### `dither_sierra_lite`
**File:** `dither/sierra-lite.glsl`  
**Distribution:** Minimal Sierra filter  
**Description:** Fastest Sierra variant with clean results.  
**Characteristics:** Very fast, subtle dithering.  
**Use Case:** Subtle effects, real-time processing.

---

### 3. Halftone Variants

Halftone effects simulate classic printing techniques with various pattern styles.

#### `halftone_dots`
**File:** `halftone/halftone-dots.glsl`  
**Pattern:** Circular dots  
**Description:** Classic newspaper print effect with varying dot sizes.  
**Use Case:** Newspaper/comic book aesthetic, retro print look.

#### `halftone_circles`
**File:** `halftone/halftone-circles.glsl`  
**Pattern:** Concentric circles  
**Description:** Creates circular wave patterns based on luminance.  
**Use Case:** Psychedelic effect, artistic backgrounds.

#### `halftone_squares`
**File:** `halftone/halftone-squares.glsl`  
**Pattern:** Square grid  
**Description:** Varying square sizes based on image brightness.  
**Use Case:** Geometric, modern aesthetic, pixelated look.

#### `halftone_lines`
**File:** `halftone/halftone-lines.glsl`  
**Pattern:** Horizontal lines  
**Description:** Line thickness varies with luminance.  
**Use Case:** Scan-line effect, CRT monitors, retro displays.

#### `halftone_crosshatch`
**File:** `halftone/halftone-crosshatch.glsl`  
**Pattern:** Intersecting horizontal and vertical lines  
**Description:** Density of crosshatching varies with luminance.  
**Use Case:** Technical drawings, engraving effect, artistic style.

#### `halftone_newspaper`
**File:** `halftone/halftone-newspaper.glsl`  
**Pattern:** 45° rotated dots (CMYK-style)  
**Description:** Classic CMYK printing with angled dot screen and print imperfections.  
**Use Case:** Authentic vintage newspaper look.

---

## Usage

### In theme.js

All effects are defined in the `shaderEffect` object:

```javascript
export const shaderEffect = {
  // ASCII variants
  ascii_standard: 'ascii_standard',
  ascii_dense: 'ascii_dense',
  ascii_minimal: 'ascii_minimal',
  ascii_blocks: 'ascii_blocks',
  ascii_braille: 'ascii_braille',
  ascii_technical: 'ascii_technical',
  ascii_matrix: 'ascii_matrix',
  ascii_hatching: 'ascii_hatching',
  
  // Dithering algorithms
  dither_floyd_steinberg: 'dither_floyd_steinberg',
  dither_atkinson: 'dither_atkinson',
  dither_jarvis_judice_ninke: 'dither_jarvis_judice_ninke',
  dither_stucki: 'dither_stucki',
  dither_burkes: 'dither_burkes',
  dither_sierra: 'dither_sierra',
  dither_sierra2: 'dither_sierra2',
  dither_sierra_lite: 'dither_sierra_lite',
  
  // Halftone variants
  halftone_dots: 'halftone_dots',
  halftone_circles: 'halftone_circles',
  halftone_squares: 'halftone_squares',
  halftone_lines: 'halftone_lines',
  halftone_crosshatch: 'halftone_crosshatch',
  halftone_newspaper: 'halftone_newspaper',
};
```

### Applying Effects

```javascript
// In your theme configuration
themeContent: {
  heroBackground: heroBackgroundThemes.canvasImage,
  heroShaderEffect: shaderEffect.dither_floyd_steinberg,
  // ... other settings
}
```

---

## Technical Details

### Shader Format

All shaders follow the postprocessing library's effect format:

```glsl
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // Effect implementation
}
```

### Common Uniforms

- `pixelSize`: Controls the size of effect cells/patterns (ASCII, halftone)
- `colorLevels`: Number of color levels for dithering (2-16 typical)
- `time`: Animation time for dynamic effects (Matrix)
- `resolution`: Screen resolution for pixel-accurate calculations

### Performance Considerations

**Fast Effects:**
- `ascii_minimal`
- `ascii_blocks`
- `dither_sierra_lite`
- `halftone_lines`

**Medium Effects:**
- `ascii_standard`
- `dither_floyd_steinberg`
- `halftone_dots`

**Slower Effects:**
- `ascii_dense`
- `dither_jarvis_judice_ninke`
- `ascii_matrix` (animated)

---

## Effect Selection Guide

### By Use Case

**Retro Computing:**
- `ascii_technical`, `ascii_matrix`, `ascii_blocks`
- `dither_atkinson` (Mac aesthetic)
- `halftone_dots`

**Print/Newspaper:**
- `halftone_newspaper`
- `halftone_dots`
- `dither_floyd_steinberg`

**Artistic:**
- `ascii_hatching`
- `halftone_crosshatch`
- `dither_jarvis_judice_ninke`

**Modern/Minimal:**
- `ascii_minimal`
- `halftone_squares`
- `dither_burkes`

**Psychedelic/Experimental:**
- `ascii_braille`
- `halftone_circles`
- `ascii_matrix`

---

## References

- [Efecto.app](https://efecto.app/) - Original inspiration
- [Codrops Article](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/)
- Floyd & Steinberg (1976): "An adaptive algorithm for spatial grey scale"
- Jarvis, Judice & Ninke (1976): "A survey of techniques for the display of continuous tone pictures on bilevel displays"

---

## Implementation Notes

### ASCII Effects
- Character rendering can use texture-based or procedural generation
- Procedural generation is used for blocks, braille, matrix, and hatching
- Texture-based rendering requires ASCII texture atlas for standard and dense variants

### Dithering Algorithms
- True error diffusion requires sequential pixel processing (CPU-based)
- These implementations use ordered dithering matrices to approximate error diffusion in parallel
- Results are visually similar but not identical to sequential algorithms
- Each algorithm uses a unique matrix pattern to simulate its error distribution characteristics

### Halftone Effects
- All effects are purely procedural and GPU-accelerated
- Pixel size parameter controls the resolution/granularity
- Effects work best with medium to large pixel sizes (6-20 pixels typical)

---

## Future Enhancements

Possible additions based on efecto.app features:
- Color palette support (Game Boy, Synthwave, CGA, etc.)
- CRT effects (scanlines, curvature, chromatic aberration, bloom)
- Multiple color quantization levels
- Adjustable error diffusion strength
- Custom character sets for ASCII variants
- Animation controls for matrix effect

