import React, { useMemo, useRef, useEffect } from 'react';
import { Noise, Pixelation, DotScreen, Glitch, ShaderPass } from '@react-three/postprocessing';
import { BlendFunction, Effect } from 'postprocessing';
import * as THREE from 'three';

// Import the actual ASCII shader
import asciiFragmentShader from '../shaders/halftone/ascii.glsl';

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
 * Effect Router Component - renders the appropriate effect based on type
 */
export const EffectRouter = ({ effects = [] }) => {
  console.log('EffectRouter: Processing effects:', effects);

  return (
    <>
      {effects.map((effect, index) => {
        console.log(`Rendering effect ${index}:`, effect.type);
        
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
            const asciiTexture = useMemo(() => createASCIITexture('./ノハメラマ木', effect.pixelSize || 12.0), [effect.pixelSize]);
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
              <PixelationEffect
                key={`${effect.type}-${index}`}
                pixelSize={effect.pixelSize || 8.0}
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
              <BlueNoiseDitherEffect
                key={`${effect.type}-${index}`}
                intensity={effect.intensity || 1.0}
              />
            );
            
          case 'dither-ordered':
          case 'dither_ordered':
            return (
              <OrderedDitherEffect
                key={`${effect.type}-${index}`}
                intensity={effect.intensity || 1.0}
                ditherSize={effect.ditherSize || 4}
              />
            );
            
          case 'dither-color-quant':
          case 'dither_color_quant':
            return React.createElement(
              'primitive',
              {
                key: `${effect.type}-${index}`,
                object: new ColorQuantDitherEffect({ levels: effect.levels || 4 })
              }
            );
            
          default:
            console.warn(`Unknown effect type: ${effect.type}`);
            return null;
        }
      })}
    </>
  );
};