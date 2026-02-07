import React from 'react';
import { Noise, Pixelation, DotScreen, wrapEffect } from '@react-three/postprocessing';
import { BlendFunction, Effect } from 'postprocessing';
import * as THREE from 'three';

// Import original shaders
import asciiFragmentShader from '../shaders/halftone/ascii.glsl';

// Import new ASCII variant shaders
import asciiStandardShader from '../shaders/halftone/ascii-standard.glsl';
import asciiDenseShader from '../shaders/halftone/ascii-dense.glsl';
import asciiMinimalShader from '../shaders/halftone/ascii-minimal.glsl';
import asciiBlocksShader from '../shaders/halftone/ascii-blocks.glsl';
import asciiBrailleShader from '../shaders/halftone/ascii-braille.glsl';
import asciiTechnicalShader from '../shaders/halftone/ascii-technical.glsl';
import asciiMatrixShader from '../shaders/halftone/ascii-matrix.glsl';
import asciiHatchingShader from '../shaders/halftone/ascii-hatching.glsl';

// Import new dithering algorithm shaders
import floydSteinbergShader from '../shaders/dither/floyd-steinberg.glsl';
import atkinsonShader from '../shaders/dither/atkinson.glsl';
import jarvisJudiceNinkeShader from '../shaders/dither/jarvis-judice-ninke.glsl';
import stuckiShader from '../shaders/dither/stucki.glsl';
import burkesShader from '../shaders/dither/burkes.glsl';
import sierraShader from '../shaders/dither/sierra.glsl';
import sierra2Shader from '../shaders/dither/sierra-2.glsl';
import sierraLiteShader from '../shaders/dither/sierra-lite.glsl';

// Import new halftone variant shaders
import halftoneDotsNewShader from '../shaders/halftone/halftone-dots.glsl';
import halftoneCirclesShader from '../shaders/halftone/halftone-circles.glsl';
import halftoneSquaresShader from '../shaders/halftone/halftone-squares.glsl';
import halftoneLinesShader from '../shaders/halftone/halftone-lines.glsl';
import halftoneCrosshatchShader from '../shaders/halftone/halftone-crosshatch.glsl';
import halftoneNewspaperShader from '../shaders/halftone/halftone-newspaper.glsl';

// Custom ASCII Effect using the original shader
class ASCIIEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0, asciiTexture, charCount = [8, 1], showBackground = false } = options;
    
    super('ASCIIEffect', asciiFragmentShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['asciiTexture', new THREE.Uniform(asciiTexture)],
        ['charCount', new THREE.Uniform(new THREE.Vector2(charCount[0], charCount[1]))],
        ['showBackground', new THREE.Uniform(showBackground)]
      ])
    });
    
    this.pixelSize = pixelSize;
    this.asciiTexture = asciiTexture;
    this.charCount = charCount;
    this.showBackground = showBackground;
  }
  
  update() {
    this.uniforms.get('pixelSize').value = this.pixelSize;
    this.uniforms.get('asciiTexture').value = this.asciiTexture;
    this.uniforms.get('charCount').value.set(this.charCount[0], this.charCount[1]);
    this.uniforms.get('showBackground').value = this.showBackground;
  }
}

// Custom LEGO Effect  
class LEGOEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 16.0 } = options;
    
    super('LEGOEffect', `
      uniform float pixelSize;
      
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec2 normalizedPixelSize = pixelSize / resolution.xy;
        vec2 pixelatedUv = normalizedPixelSize * floor(uv / normalizedPixelSize);
        vec4 color = texture2D(inputBuffer, pixelatedUv);
        
        // LEGO brick pattern
        vec2 center = fract(uv / normalizedPixelSize) - 0.5;
        float dist = length(center);
        
        // Create raised circular studs like LEGO bricks
        float stud = 1.0 - smoothstep(0.15, 0.25, dist);
        float brick = 1.0 - step(0.35, max(abs(center.x), abs(center.y)));
        
        // Enhanced brick effect with more pronounced studs
        float brickEffect = max(brick * 0.8, stud);
        vec3 finalColor = mix(color.rgb * 0.6, color.rgb, brickEffect);
        outputColor = vec4(finalColor, color.a);
      }
    `, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
    
    this.pixelSize = pixelSize;
  }
  
  update() {
    this.uniforms.get('pixelSize').value = this.pixelSize;
  }
}

// Custom Rectangle Halftone Effect
class RectHalftoneEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 10.0 } = options;
    
    super('RectHalftoneEffect', `
      uniform float pixelSize;
      
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec2 normalizedPixelSize = pixelSize / resolution.xy;
        vec2 pixelatedUv = normalizedPixelSize * floor(uv / normalizedPixelSize);
        vec4 color = texture2D(inputBuffer, pixelatedUv);
        float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        
        // Rectangle pattern based on brightness
        vec2 center = abs(fract(uv / normalizedPixelSize) - 0.5);
        float rectSize = brightness * 0.45;
        float rect = step(center.x, rectSize) * step(center.y, rectSize);
        
        // Create more pronounced effect
        vec3 finalColor = mix(color.rgb * 0.2, color.rgb, rect);
        outputColor = vec4(finalColor, color.a);
      }
    `, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
    
    this.pixelSize = pixelSize;
  }
  
  update() {
    this.uniforms.get('pixelSize').value = this.pixelSize;
  }
}

// Custom Color Quantization Dither Effect
class ColorQuantDitherEffect extends Effect {
  constructor(options = {}) {
    const { levels = 4 } = options;
    
    super('ColorQuantDitherEffect', `
      uniform float levels;
      
      float dither4x4(vec2 position, float brightness) {
        int x = int(mod(position.x, 4.0));
        int y = int(mod(position.y, 4.0));
        int index = x + y * 4;
        float limit = 0.0;
        
        // Bayer 4x4 dithering matrix
        if (index == 0) limit = 0.0625;
        else if (index == 1) limit = 0.5625; 
        else if (index == 2) limit = 0.1875;
        else if (index == 3) limit = 0.6875;
        else if (index == 4) limit = 0.8125;
        else if (index == 5) limit = 0.3125;
        else if (index == 6) limit = 0.9375;
        else if (index == 7) limit = 0.4375;
        else if (index == 8) limit = 0.25;
        else if (index == 9) limit = 0.75;
        else if (index == 10) limit = 0.125;
        else if (index == 11) limit = 0.625;
        else if (index == 12) limit = 1.0;
        else if (index == 13) limit = 0.5;
        else if (index == 14) limit = 0.875;
        else if (index == 15) limit = 0.375;
        
        // Quantize to levels and apply dithering
        float quantized = floor(brightness * levels) / levels;
        float error = brightness - quantized;
        
        return quantized + (error > limit ? 1.0/levels : 0.0);
      }
      
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = texture2D(inputBuffer, uv);
        vec2 position = uv * resolution.xy;
        
        float r = dither4x4(position, color.r);
        float g = dither4x4(position, color.g);  
        float b = dither4x4(position, color.b);
        
        outputColor = vec4(r, g, b, color.a);
      }
    `, {
      uniforms: new Map([
        ['levels', new THREE.Uniform(levels)]
      ])
    });
    
    this.levels = levels;
  }
  
  update() {
    this.uniforms.get('levels').value = this.levels;
  }
}

// ASCII Texture Creation Utility
const createASCIITexture = (chars = './ノハメラマ木', pixelSize = 12) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = pixelSize * chars.length;
  canvas.height = pixelSize;
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = 'white';
  ctx.font = `${pixelSize}px monospace`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  
  chars.split('').forEach((char, i) => {
    ctx.fillText(char, (i + 0.5) * pixelSize, pixelSize / 2);
  });
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  
  return texture;
};

// Module-level ASCII texture cache (shared across all renders)
const _asciiTextureCache = new Map();

/**
 * Get or create a cached ASCII texture
 * @param {string} chars - Character set for the texture atlas
 * @param {number} pixelSize - Pixel size for rendering
 * @returns {THREE.CanvasTexture} Cached texture instance
 */
const getASCIITextureCached = (chars, pixelSize) => {
  const safePixelSize = typeof pixelSize === 'number' && Number.isFinite(pixelSize) ? pixelSize : 12;
  const key = `${chars}__${safePixelSize}`;
  if (_asciiTextureCache.has(key)) return _asciiTextureCache.get(key);
  const tex = createASCIITexture(chars, safePixelSize);
  _asciiTextureCache.set(key, tex);
  return tex;
};

// ============ NEW EFECTO-INSPIRED EFFECT CLASSES ============

// ASCII Standard Effect
class ASCIIStandardEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0, asciiTexture, charCount = [10, 1], showBackground = false } = options;
    
    super('ASCIIStandardEffect', asciiStandardShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['asciiTexture', new THREE.Uniform(asciiTexture)],
        ['charCount', new THREE.Uniform(new THREE.Vector2(charCount[0], charCount[1]))],
        ['showBackground', new THREE.Uniform(showBackground)]
      ])
    });

    this.pixelSize = pixelSize;
    this.asciiTexture = asciiTexture;
    this.charCount = charCount;
    this.showBackground = showBackground;
  }

  update() {
    if (this.uniforms?.get('pixelSize')) this.uniforms.get('pixelSize').value = this.pixelSize;
    if (this.uniforms?.get('asciiTexture')) this.uniforms.get('asciiTexture').value = this.asciiTexture;
    if (this.uniforms?.get('charCount') && this.charCount) {
      const v = this.uniforms.get('charCount').value;
      if (v?.set) v.set(this.charCount[0], this.charCount[1]);
      else this.uniforms.get('charCount').value = new THREE.Vector2(this.charCount[0], this.charCount[1]);
    }
    if (this.uniforms?.get('showBackground')) this.uniforms.get('showBackground').value = this.showBackground;
  }
}

// ASCII Dense Effect
class ASCIIDenseEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0, asciiTexture, charCount = [60, 1], showBackground = false } = options;
    
    super('ASCIIDenseEffect', asciiDenseShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['asciiTexture', new THREE.Uniform(asciiTexture)],
        ['charCount', new THREE.Uniform(new THREE.Vector2(charCount[0], charCount[1]))],
        ['showBackground', new THREE.Uniform(showBackground)]
      ])
    });

    this.pixelSize = pixelSize;
    this.asciiTexture = asciiTexture;
    this.charCount = charCount;
    this.showBackground = showBackground;
  }

  update() {
    if (this.uniforms?.get('pixelSize')) this.uniforms.get('pixelSize').value = this.pixelSize;
    if (this.uniforms?.get('asciiTexture')) this.uniforms.get('asciiTexture').value = this.asciiTexture;
    if (this.uniforms?.get('charCount') && this.charCount) {
      const v = this.uniforms.get('charCount').value;
      if (v?.set) v.set(this.charCount[0], this.charCount[1]);
      else this.uniforms.get('charCount').value = new THREE.Vector2(this.charCount[0], this.charCount[1]);
    }
    if (this.uniforms?.get('showBackground')) this.uniforms.get('showBackground').value = this.showBackground;
  }
}

// ASCII Minimal Effect
class ASCIIMinimalEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0, asciiTexture, charCount = [4, 1], showBackground = false } = options;
    
    super('ASCIIMinimalEffect', asciiMinimalShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['asciiTexture', new THREE.Uniform(asciiTexture)],
        ['charCount', new THREE.Uniform(new THREE.Vector2(charCount[0], charCount[1]))],
        ['showBackground', new THREE.Uniform(showBackground)]
      ])
    });

    this.pixelSize = pixelSize;
    this.asciiTexture = asciiTexture;
    this.charCount = charCount;
    this.showBackground = showBackground;
  }

  update() {
    if (this.uniforms?.get('pixelSize')) this.uniforms.get('pixelSize').value = this.pixelSize;
    if (this.uniforms?.get('asciiTexture')) this.uniforms.get('asciiTexture').value = this.asciiTexture;
    if (this.uniforms?.get('charCount') && this.charCount) {
      const v = this.uniforms.get('charCount').value;
      if (v?.set) v.set(this.charCount[0], this.charCount[1]);
      else this.uniforms.get('charCount').value = new THREE.Vector2(this.charCount[0], this.charCount[1]);
    }
    if (this.uniforms?.get('showBackground')) this.uniforms.get('showBackground').value = this.showBackground;
  }
}

// ASCII Blocks Effect
class ASCIIBlocksEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0 } = options;
    
    super('ASCIIBlocksEffect', asciiBlocksShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// ASCII Braille Effect
class ASCIIBrailleEffect extends Effect {
  constructor(options = {}) {
    const {
      pixelSize = 12.0,
      showBackground = false,
      contrast = 100
    } = options;

    super('ASCIIBrailleEffect', asciiBrailleShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['showBackground', new THREE.Uniform(showBackground ? 1.0 : 0.0)],
        ['contrast', new THREE.Uniform(contrast / 100)]
      ])
    });
  }
}

// ASCII Technical Effect
class ASCIITechnicalEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0, asciiTexture, charCount = [16, 1], showBackground = false } = options;
    
    super('ASCIITechnicalEffect', asciiTechnicalShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['asciiTexture', new THREE.Uniform(asciiTexture)],
        ['charCount', new THREE.Uniform(new THREE.Vector2(charCount[0], charCount[1]))],
        ['showBackground', new THREE.Uniform(showBackground)]
      ])
    });

    this.pixelSize = pixelSize;
    this.asciiTexture = asciiTexture;
    this.charCount = charCount;
    this.showBackground = showBackground;
  }

  update() {
    if (this.uniforms?.get('pixelSize')) this.uniforms.get('pixelSize').value = this.pixelSize;
    if (this.uniforms?.get('asciiTexture')) this.uniforms.get('asciiTexture').value = this.asciiTexture;
    if (this.uniforms?.get('charCount') && this.charCount) {
      const v = this.uniforms.get('charCount').value;
      if (v?.set) v.set(this.charCount[0], this.charCount[1]);
      else this.uniforms.get('charCount').value = new THREE.Vector2(this.charCount[0], this.charCount[1]);
    }
    if (this.uniforms?.get('showBackground')) this.uniforms.get('showBackground').value = this.showBackground;
  }
}

// Wrap custom Effects so they register consistently in EffectComposer (matches ascii.jsx pattern)
const ASCIIStandardEffectWrapped = wrapEffect(ASCIIStandardEffect);
const ASCIIDenseEffectWrapped = wrapEffect(ASCIIDenseEffect);
const ASCIIMinimalEffectWrapped = wrapEffect(ASCIIMinimalEffect);
const ASCIITechnicalEffectWrapped = wrapEffect(ASCIITechnicalEffect);

// ASCII Matrix Effect
class ASCIIMatrixEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0 } = options;
    
    super('ASCIIMatrixEffect', asciiMatrixShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['time', new THREE.Uniform(0)]
      ])
    });
  }
  
  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('time').value += deltaTime;
  }
}

// ASCII Hatching Effect
class ASCIIHatchingEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 12.0 } = options;
    
    super('ASCIIHatchingEffect', asciiHatchingShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Floyd-Steinberg Dithering Effect
class FloydSteinbergEffect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('FloydSteinbergEffect', floydSteinbergShader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Atkinson Dithering Effect
class AtkinsonEffect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('AtkinsonEffect', atkinsonShader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Jarvis-Judice-Ninke Dithering Effect
class JarvisJudiceNinkeEffect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('JarvisJudiceNinkeEffect', jarvisJudiceNinkeShader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Stucki Dithering Effect
class StuckiEffect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('StuckiEffect', stuckiShader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Burkes Dithering Effect
class BurkesEffect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('BurkesEffect', burkesShader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Sierra Dithering Effect
class SierraEffect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('SierraEffect', sierraShader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Sierra 2 Dithering Effect
class Sierra2Effect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('Sierra2Effect', sierra2Shader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Sierra Lite Dithering Effect
class SierraLiteEffect extends Effect {
  constructor(options = {}) {
    const { colorLevels = 4, pixelSize = 1.0 } = options;
    
    super('SierraLiteEffect', sierraLiteShader, {
      uniforms: new Map([
        ['colorLevels', new THREE.Uniform(colorLevels)],
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Halftone Dots (New) Effect
class HalftoneDotsNewEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 8.0 } = options;
    
    super('HalftoneDotsNewEffect', halftoneDotsNewShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Halftone Circles Effect
class HalftoneCirclesEffect extends Effect {
  constructor(options = {}) {
    const {
      pixelSize = 8.0,
      angle = 45,
      contrast = 100,
      spread = 50,
      paperColor = '#ffffff',
      inkColor = '#000000',
      inverted = false
    } = options;

    super('HalftoneCirclesEffect', halftoneCirclesShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)],
        ['angle', new THREE.Uniform(angle * Math.PI / 180)], // Convert to radians
        ['contrast', new THREE.Uniform(contrast / 100)], // Normalize to 0-1
        ['spread', new THREE.Uniform(spread / 100)], // Normalize to 0-1
        ['paperColor', new THREE.Uniform(new THREE.Color(paperColor))],
        ['inkColor', new THREE.Uniform(new THREE.Color(inkColor))],
        ['inverted', new THREE.Uniform(inverted ? 1.0 : 0.0)]
      ])
    });
  }
}

// Halftone Squares Effect
class HalftoneSquaresEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 8.0 } = options;
    
    super('HalftoneSquaresEffect', halftoneSquaresShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Halftone Lines Effect
class HalftoneLinesEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 8.0 } = options;
    
    super('HalftoneLinesEffect', halftoneLinesShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Halftone Crosshatch Effect
class HalftoneCrosshatchEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 8.0 } = options;
    
    super('HalftoneCrosshatchEffect', halftoneCrosshatchShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

// Halftone Newspaper Effect
class HalftoneNewspaperEffect extends Effect {
  constructor(options = {}) {
    const { pixelSize = 8.0 } = options;
    
    super('HalftoneNewspaperEffect', halftoneNewspaperShader, {
      uniforms: new Map([
        ['pixelSize', new THREE.Uniform(pixelSize)]
      ])
    });
  }
}

/**
 * Custom Halftone Effect using DotScreen
 */
export const HalftoneDotsEffect = ({ pixelSize = 6.0, intensity = 1.0 }) => {
  return (
    <DotScreen
      blendFunction={BlendFunction.NORMAL}
      angle={Math.PI * 0.5}
      scale={pixelSize}
    />
  );
};

/**
 * Blue Noise Dither Effect
 */
export const BlueNoiseDitherEffect = ({ intensity = 1.0 }) => {
  return (
    <Noise
      blendFunction={BlendFunction.COLOR_BURN}
      premultiply={false}
    />
  );
};

// Custom Ordered Dither Effect with proper Bayer matrix
class OrderedDitherEffectShader extends Effect {
  constructor(options = {}) {
    const { intensity = 1.0, ditherSize = 4 } = options;
    
    super('OrderedDitherEffect', `
      uniform float intensity;
      uniform float ditherSize;
      
      float getDitherThreshold(vec2 position, int size) {
        // Bayer matrix values for different sizes
        if (size == 2) {
          // 2x2 Bayer matrix
          int x = int(mod(position.x, 2.0));
          int y = int(mod(position.y, 2.0));
          int index = x + y * 2;
          if (index == 0) return 0.0;
          else if (index == 1) return 0.5;
          else if (index == 2) return 0.75;
          else return 0.25;
        } else {
          // 4x4 Bayer matrix (default)
          int x = int(mod(position.x, 4.0));
          int y = int(mod(position.y, 4.0));
          int index = x + y * 4;
          if (index == 0) return 0.0;
          else if (index == 1) return 0.5;
          else if (index == 2) return 0.125;
          else if (index == 3) return 0.625;
          else if (index == 4) return 0.75;
          else if (index == 5) return 0.25;
          else if (index == 6) return 0.875;
          else if (index == 7) return 0.375;
          else if (index == 8) return 0.1875;
          else if (index == 9) return 0.6875;
          else if (index == 10) return 0.0625;
          else if (index == 11) return 0.5625;
          else if (index == 12) return 0.9375;
          else if (index == 13) return 0.4375;
          else if (index == 14) return 0.8125;
          else return 0.3125;
        }
      }
      
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec4 color = texture2D(inputBuffer, uv);
        vec2 position = uv * resolution.xy;
        
        // Apply ordered dithering to each color channel
        float threshold = getDitherThreshold(position, int(ditherSize));
        
        float r = floor(color.r + threshold - 0.5);
        float g = floor(color.g + threshold - 0.5);
        float b = floor(color.b + threshold - 0.5);
        
        // Mix original and dithered based on intensity
        vec3 dithered = vec3(r, g, b);
        vec3 final = mix(color.rgb, dithered, intensity);
        
        outputColor = vec4(final, color.a);
      }
    `, {
      uniforms: new Map([
        ['intensity', new THREE.Uniform(intensity)],
        ['ditherSize', new THREE.Uniform(ditherSize)]
      ])
    });
    
    this.intensity = intensity;
    this.ditherSize = ditherSize;
  }
  
  update() {
    this.uniforms.get('intensity').value = this.intensity;
    this.uniforms.get('ditherSize').value = this.ditherSize;
  }
}

/**
 * Ordered Dither Effect
 */
export const OrderedDitherEffect = ({ intensity = 1.0, ditherSize = 4 }) => {
  return React.createElement(
    'primitive',
    {
      object: new OrderedDitherEffectShader({ intensity, ditherSize })
    }
  );
};

/**
 * Custom Pixelation Effect
 */
export const PixelationEffect = ({ pixelSize = 8.0 }) => {
  return (
    <Pixelation
      granularity={pixelSize}
    />
  );
};

/**
 * Custom Noise Effect
 */
export const NoiseEffect = ({ intensity = 0.1 }) => {
  return (
    <Noise
      blendFunction={BlendFunction.OVERLAY}
      premultiply={false}
    />
  );
};

/**
 * ASCII Braille Effect Component
 */
export const ASCIIBrailleEffectComponent = ({ pixelSize = 12.0, showBackground = false, contrast = 100 }) => {
  return React.createElement(
    'primitive',
    {
      object: new ASCIIBrailleEffect({ pixelSize, showBackground, contrast })
    }
  );
};

/**
 * Creates a single effect React element based on effect configuration.
 * This is a pure function (no hooks) so it can be called directly inside
 * EffectComposer's children, ensuring effects are direct children of the composer.
 *
 * @param {Object} effect - Effect configuration object with type and parameters
 * @param {number} index - Array index for React key generation
 * @returns {React.ReactElement|null} The effect element or null
 */
const createEffectElement = (effect, index) => {
  if (!effect || !effect.type) return null;

  try {
  switch (effect.type) {
    case 'halftone-dots':
    case 'halftone_dots':
      return (
        <HalftoneDotsEffect
          key={`${effect.type}-${index}`}
          pixelSize={effect.pixelSize || 6.0}
          intensity={effect.intensity || 1.0}
        />
      );

    case 'halftone-ascii':
    case 'halftone_ascii':
    {
      const asciiTexture = getASCIITextureCached('ノハメラマ木', effect.pixelSize || 12.0);
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new ASCIIEffect({
            pixelSize: effect.pixelSize || 12.0,
            asciiTexture,
            charCount: [8, 1],
            showBackground: false
          })
        }
      );
    }

    case 'halftone-led':
    case 'halftone_led':
      return (
        <DotScreen
          key={`${effect.type}-${index}`}
          blendFunction={BlendFunction.NORMAL}
          angle={0}
          scale={effect.pixelSize || 8.0}
        />
      );

    case 'halftone-lego':
    case 'halftone_lego':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new LEGOEffect({ pixelSize: effect.pixelSize || 16.0 })
        }
      );

    case 'halftone-rect':
    case 'halftone_rect':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new RectHalftoneEffect({ pixelSize: effect.pixelSize || 10.0 })
        }
      );

    case 'pixelation':
      return (
        <Pixelation
          key={`${effect.type}-${index}`}
          granularity={effect.pixelSize || 8.0}
        />
      );

    case 'noise':
      return (
        <NoiseEffect
          key={`${effect.type}-${index}`}
          intensity={effect.intensity || 0.1}
        />
      );

    case 'dither-blue-noise':
    case 'dither_blue_noise':
      return (
        <Noise
          key={`${effect.type}-${index}`}
          blendFunction={BlendFunction.COLOR_BURN}
          premultiply={false}
        />
      );

    case 'dither-ordered':
    case 'dither_ordered':
      return (
        <Noise
          key={`${effect.type}-${index}`}
          blendFunction={BlendFunction.COLOR_BURN}
          premultiply={false}
        />
      );

    case 'dither-color-quant':
    case 'dither_color_quant':
      return (
        <DotScreen
          key={`${effect.type}-${index}`}
          blendFunction={BlendFunction.NORMAL}
          angle={0}
          scale={effect.pixelSize || 8.0}
        />
      );

    // ============ ASCII VARIANTS ============
    case 'ascii-standard':
    case 'ascii_standard':
    {
      const stdChars = effect.asciiChars || ' .:-=+*#%@';
      const asciiStdTexture = getASCIITextureCached(stdChars, effect.pixelSize || 12.0);
      return (
        <ASCIIStandardEffectWrapped
          key={`${effect.type}-${index}`}
          pixelSize={effect.pixelSize || 12.0}
          showBackground={effect.showBackground || false}
          asciiTexture={asciiStdTexture}
          charCount={[stdChars.length, 1]}
        />
      );
    }

    case 'ascii-dense':
    case 'ascii_dense':
    {
      const denseChars = effect.asciiChars || " .'`^\\\",:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
      const asciiDenseTexture = getASCIITextureCached(denseChars, effect.pixelSize || 12.0);
      return (
        <ASCIIDenseEffectWrapped
          key={`${effect.type}-${index}`}
          pixelSize={effect.pixelSize || 12.0}
          showBackground={effect.showBackground || false}
          asciiTexture={asciiDenseTexture}
          charCount={[denseChars.length, 1]}
        />
      );
    }

    case 'ascii-minimal':
    case 'ascii_minimal':
    {
      const minimalChars = effect.asciiChars || ' .o0@';
      const asciiMinimalTexture = getASCIITextureCached(minimalChars, effect.pixelSize || 12.0);
      return (
        <ASCIIMinimalEffectWrapped
          key={`${effect.type}-${index}`}
          pixelSize={effect.pixelSize || 12.0}
          showBackground={effect.showBackground || false}
          asciiTexture={asciiMinimalTexture}
          charCount={[minimalChars.length, 1]}
        />
      );
    }

    case 'ascii-blocks':
    case 'ascii_blocks':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new ASCIIBlocksEffect({
            pixelSize: effect.pixelSize || 12.0,
            showBackground: effect.showBackground || false,
            contrast: effect.contrast || 100
          })
        }
      );

    case 'ascii-braille':
    case 'ascii_braille':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new ASCIIBrailleEffect({
            pixelSize: effect.pixelSize || 12.0,
            showBackground: effect.showBackground || false,
            contrast: effect.contrast || 100
          })
        }
      );

    case 'ascii-technical':
    case 'ascii_technical':
    {
      const technicalChars = effect.asciiChars || '0123456789ABCDEF';
      const asciiTechnicalTexture = getASCIITextureCached(technicalChars, effect.pixelSize || 12.0);
      return (
        <ASCIITechnicalEffectWrapped
          key={`${effect.type}-${index}`}
          pixelSize={effect.pixelSize || 12.0}
          showBackground={effect.showBackground || false}
          asciiTexture={asciiTechnicalTexture}
          charCount={[technicalChars.length, 1]}
        />
      );
    }

    case 'ascii-matrix':
    case 'ascii_matrix':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new ASCIIMatrixEffect({
            pixelSize: effect.pixelSize || 12.0
          })
        }
      );

    case 'ascii-hatching':
    case 'ascii_hatching':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new ASCIIHatchingEffect({
            pixelSize: effect.pixelSize || 12.0
          })
        }
      );

    // ============ DITHERING ALGORITHMS ============
    case 'dither-floyd-steinberg':
    case 'dither_floyd_steinberg':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new FloydSteinbergEffect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    case 'dither-atkinson':
    case 'dither_atkinson':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new AtkinsonEffect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    case 'dither-jarvis-judice-ninke':
    case 'dither_jarvis_judice_ninke':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new JarvisJudiceNinkeEffect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    case 'dither-stucki':
    case 'dither_stucki':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new StuckiEffect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    case 'dither-burkes':
    case 'dither_burkes':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new BurkesEffect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    case 'dither-sierra':
    case 'dither_sierra':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new SierraEffect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    case 'dither-sierra2':
    case 'dither_sierra2':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new Sierra2Effect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    case 'dither-sierra-lite':
    case 'dither_sierra_lite':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new SierraLiteEffect({
            colorLevels: effect.colorLevels || 4,
            pixelSize: effect.pixelSize || 1.0
          })
        }
      );

    // ============ HALFTONE VARIANTS ============
    case 'halftone-dots-new':
    case 'halftone_dots_new':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new HalftoneDotsNewEffect({
            pixelSize: effect.pixelSize || 8.0
          })
        }
      );

    case 'halftone-circles':
    case 'halftone_circles':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new HalftoneCirclesEffect({
            pixelSize: effect.pixelSize || 8.0,
            angle: effect.angle ?? 45,
            contrast: effect.contrast ?? 100,
            spread: effect.spread ?? 50,
            paperColor: effect.paperColor,
            inkColor: effect.inkColor,
            inverted: effect.inverted ?? false
          })
        }
      );

    case 'halftone-squares':
    case 'halftone_squares':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new HalftoneSquaresEffect({
            pixelSize: effect.pixelSize || 8.0
          })
        }
      );

    case 'halftone-lines':
    case 'halftone_lines':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new HalftoneLinesEffect({
            pixelSize: effect.pixelSize || 8.0
          })
        }
      );

    case 'halftone-crosshatch':
    case 'halftone_crosshatch':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new HalftoneCrosshatchEffect({
            pixelSize: effect.pixelSize || 8.0
          })
        }
      );

    case 'halftone-newspaper':
    case 'halftone_newspaper':
      return React.createElement(
        'primitive',
        {
          key: `${effect.type}-${index}`,
          object: new HalftoneNewspaperEffect({
            pixelSize: effect.pixelSize || 8.0
          })
        }
      );

    default:
      console.warn(`Unknown effect type: ${effect.type}`);
      return null;
  }
  } catch (err) {
    console.error(`[PostProcessing] FAILED to create effect "${effect.type}":`, err);
    return null;
  }
};

/**
 * Renders an array of effect configuration objects into React elements.
 * Returns an array of elements suitable for use as direct children of EffectComposer.
 *
 * IMPORTANT: Call this as a function inside EffectComposer's JSX, NOT as a component.
 * Effects must be direct children of EffectComposer for proper discovery.
 *
 * @example
 * <EffectComposer>
 *   {renderEffectElements(effects)}
 * </EffectComposer>
 *
 * @param {Array} effects - Array of effect config objects from createEffect()
 * @returns {Array<React.ReactElement>} Array of effect elements (nulls filtered out)
 */
export const renderEffectElements = (effects = []) => {
  return effects
    .map((effect, index) => createEffectElement(effect, index))
    .filter(Boolean);
};

/**
 * Effect Router Component - legacy wrapper, prefer renderEffectElements() for new code.
 * Kept for backward compatibility but delegates to renderEffectElements.
 */
export const EffectRouter = ({ effects = [] }) => {
  return <>{renderEffectElements(effects)}</>;
};