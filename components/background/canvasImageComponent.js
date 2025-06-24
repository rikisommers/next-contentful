import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, useTexture, useAspect ,  useFBO} from '@react-three/drei';
import { wrapEffect, EffectComposer } from "@react-three/postprocessing";

import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { useThemeContext } from '../context/themeContext';

// Custom watercolor material
class WaterColorMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('hotpink') },
        uTime: { value: 0 },
        uScale: { value: 9.0 },
        uColorLevels: { value: 1.0 },
        uPaintNormalMap: { value: null },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uScale;
        uniform float uColorLevels;
        uniform sampler2D uPaintNormalMap;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform vec2 uResolution;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          // Sample normal map
          vec3 normalMap = texture2D(uPaintNormalMap, vUv * uScale).rgb * 2.0 - 1.0;
          
          // Combine with surface normal
          vec3 normal = normalize(vNormal + normalMap * 0.5);
          
          // Basic lighting
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          float diffuse = max(dot(normal, lightDir), 0.0);
          
          // Posterize the lighting
          diffuse = floor(diffuse * uColorLevels) / uColorLevels;
          
          // Final color - either from texture or uniform color
          vec3 color;
          if (uUseTexture == 1) {
            color = texture2D(uTexture, vUv).rgb * diffuse;
          } else {
            color = uColor * diffuse;
          }
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }
}

// Custom noise material
class NoiseMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('hotpink') },
        uTime: { value: 0 },
        uNoiseScale: { value: 5.0 },
        uNoiseIntensity: { value: 0.15 },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uNoiseScale;
        uniform float uNoiseIntensity;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform vec2 uResolution;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                           + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          // Lighting
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          float diffuse = max(dot(vNormal, lightDir), 0.2);
          
          // Noise
          float noise = snoise(vUv * uNoiseScale + uTime * 0.1) * uNoiseIntensity;
          
          // Final color with noise
          vec3 color;
          if (uUseTexture == 1) {
            color = texture2D(uTexture, vUv).rgb * (diffuse + noise);
          } else {
            color = uColor * (diffuse + noise);
          }
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }
}

// Custom pixelation material
class PixelMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('hotpink') },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) },
        uPixelDensity: { value: 20.0 },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uAccentPrimary: { value: new THREE.Color('#ffffff') },
        uAccentSecondary: { value: new THREE.Color('#000000') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uPixelDensity;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform vec3 uAccentPrimary;
        uniform vec3 uAccentSecondary;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Pixelation effect
          vec2 pixelSize = vec2(1.0) / uPixelDensity;
          vec2 pixelatedUV = floor(vUv / pixelSize) * pixelSize + pixelSize * 0.5;
          
          // Sample the texture or use the uniform color
          vec3 texColor;
          if (uUseTexture == 1) {
            texColor = texture2D(uTexture, pixelatedUV).rgb;
          } else {
            texColor = uColor;
          }
          
          // Calculate brightness
          float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
          
          // Map brightness to duotone colors
          vec3 finalColor = mix(uAccentSecondary, uAccentPrimary, brightness);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }
}

// Custom halftone material
class HalftoneMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('hotpink') },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uHalftoneSize: { value: 8.0 },
        uHalftoneShape: { value: 0 }, // 0 for circle, 1 for square
        uInvert: { value: 0 }, // 0 for black dots on white, 1 for white dots on black
        uAccentPrimary: { value: new THREE.Color('#ffffff') },
        uAccentSecondary: { value: new THREE.Color('#000000') },
        uDotScale: { value: 0.6 } // Scale factor for dot size (smaller value = smaller dots)
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform float uHalftoneSize;
        uniform int uHalftoneShape;
        uniform int uInvert;
        uniform vec3 uAccentPrimary;
        uniform vec3 uAccentSecondary;
        uniform float uDotScale;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Signed distance function for a circle
        float sdCircle(vec2 p, vec2 center, float radius) {
          return length(p - center) - radius;
        }
        
        // Signed distance function for a box
        float sdBox(vec2 p, vec2 center, vec2 size) {
          vec2 d = abs(p - center) - size;
          return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
        }
        
        void main() {
          // Calculate pixel coordinates
          vec2 fragCoord = vUv * uResolution;
          
          // Determine halftone size
          float halftoneSize = uHalftoneSize;
          
          // Calculate center of the current halftone cell
          vec2 centerCoord = (floor(fragCoord / halftoneSize) + 0.5) * halftoneSize;
          
          // Sample the texture at the center of the cell
          vec3 texColor;
          if (uUseTexture == 1) {
            texColor = texture2D(uTexture, centerCoord / uResolution).rgb;
          } else {
            texColor = uColor;
          }
          
          // Calculate brightness
          float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
          
          // Apply dot scale factor to make dots smaller
          float r = brightness * halftoneSize * 0.5 * uDotScale;
          
          // Calculate signed distance based on shape
          float sd;
          if (uHalftoneShape == 0) {
            // Circle shape
            sd = sdCircle(fragCoord, centerCoord, r);
          } else {
            // Box shape
            sd = sdBox(fragCoord, centerCoord, vec2(r));
          }
          
          // Determine final color based on the signed distance
          float alpha = smoothstep(0.0, -1.0, sd);
          
          // Invert if needed
          if (uInvert == 1) {
            alpha = 1.0 - alpha;
          }
          
          // Output duotone color
          vec3 finalColor = mix(uAccentPrimary, uAccentSecondary, alpha);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }
}

// Custom moiré material
class MoireMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('hotpink') },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uMoireScale: { value: 10.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 3.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform float uMoireScale;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Moiré pattern using sine waves
          float pattern = sin(vUv.x * uMoireScale + uTime * 0.5) * sin(vUv.y * uMoireScale + uTime);
          
          // Final color
          vec3 color;
          if (uUseTexture == 1) {
            color = texture2D(uTexture, vUv).rgb * pattern;
          } else {
            color = uColor * pattern;
          }
          
          gl_FragColor = vec4(color, 2.0);
        }
      `
    });
  }
}

// Custom vintage print material
class VintagePrintMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('hotpink') },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(2.0, 2.0) },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uDotSize: { value: 4. },
        uAccentPrimary: { value: new THREE.Color('#ffffff') },
        uAccentSecondary: { value: new THREE.Color('#000000') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform float uDotSize;
        uniform vec3 uAccentPrimary;
        uniform vec3 uAccentSecondary;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Vintage print dot pattern
          vec2 grid = mod(vUv * uResolution / uDotSize, 1.0);
          float dot = step(0.5, length(grid - 0.5));
          
          // Sample the texture or use the uniform color
          vec3 texColor;
          if (uUseTexture == 1) {
            texColor = texture2D(uTexture, vUv).rgb;
          } else {
            texColor = uColor;
          }
          
          // Calculate brightness
          float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
          
          // Map brightness to duotone colors
          vec3 finalColor = mix(uAccentSecondary, uAccentPrimary, brightness) * dot;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }
}

// Custom vintage computer screen material
class VintageScreenMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('green') },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uAccentPrimary: { value: new THREE.Color('#ffffff') },
        uAccentSecondary: { value: new THREE.Color('#000000') },
        uDotScale: { value: 0.6 } // Scale factor for dot size (smaller value = smaller dots)
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform vec3 uAccentPrimary;
        uniform vec3 uAccentSecondary;
        uniform float uDotScale;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        float pattern(float brightness) {
          if (brightness < 0.2) return 0.0; // Darkest
          if (brightness < 0.4) return 0.25; // Dark
          if (brightness < 0.6) return 0.5; // Medium
          if (brightness < 0.8) return 0.75; // Light
          return 1.0; // Lightest
        }
        
        void main() {
          // Calculate pixel coordinates
          vec2 fragCoord = vUv * uResolution;
          
          // Sample the texture
          vec3 texColor;
          if (uUseTexture == 1) {
            texColor = texture2D(uTexture, vUv).rgb;
          } else {
            texColor = uColor;
          }
          
          // Calculate brightness
          float brightness = (texColor.r + texColor.g + texColor.b) / 3.0;
          
          // Map brightness to ASCII-like pattern
          float asciiPattern = pattern(brightness);
          
          // Mix colors based on pattern
          vec3 finalColor = mix(uAccentSecondary, uAccentPrimary, asciiPattern);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }
}

// Custom dithered bitmap material
class DitheredMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColor: { value: new THREE.Color('hotpink') },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) },
        uTexture: { value: null },
        uUseTexture: { value: 0 },
        uPixelSize: { value: 4.0 },
        uAccentPrimary: { value: new THREE.Color('#ffffff') },
        uAccentSecondary: { value: new THREE.Color('#000000') },
        uDitherType: { value: 0 } // 0 for ordered, 1 for Floyd-Steinberg style
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform sampler2D uTexture;
        uniform int uUseTexture;
        uniform float uPixelSize;
        uniform vec3 uAccentPrimary;
        uniform vec3 uAccentSecondary;
        uniform int uDitherType;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Bayer matrix for ordered dithering (4x4)
        float getBayerValue(vec2 coord) {
          int x = int(mod(coord.x, 4.0));
          int y = int(mod(coord.y, 4.0));
          
          // 4x4 Bayer matrix
          float bayer[16];
          bayer[0] = 0.0/16.0;   bayer[1] = 8.0/16.0;   bayer[2] = 2.0/16.0;   bayer[3] = 10.0/16.0;
          bayer[4] = 12.0/16.0;  bayer[5] = 4.0/16.0;   bayer[6] = 14.0/16.0;  bayer[7] = 6.0/16.0;
          bayer[8] = 3.0/16.0;   bayer[9] = 11.0/16.0;  bayer[10] = 1.0/16.0;  bayer[11] = 9.0/16.0;
          bayer[12] = 15.0/16.0; bayer[13] = 7.0/16.0;  bayer[14] = 13.0/16.0; bayer[15] = 5.0/16.0;
          
          return bayer[y * 4 + x];
        }
        
        // Pseudo-random function for better dithering
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main() {
          // Calculate pixel grid coordinates
          vec2 pixelCoord = floor(vUv * uResolution / uPixelSize) * uPixelSize;
          vec2 pixelUV = pixelCoord / uResolution;
          
          // Sample the texture at the pixel center
          vec3 texColor;
          if (uUseTexture == 1) {
            texColor = texture2D(uTexture, pixelUV + vec2(uPixelSize * 0.5) / uResolution).rgb;
          } else {
            // For mesh mode, create a gradient based on UV and surface normal for variation
            float gradient = (vUv.x + vUv.y) * 0.5;
            // Add lighting-based variation
            vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
            float lighting = max(dot(normalize(vNormal), lightDir), 0.2);
            gradient *= lighting;
            // Add some spatial variation
            gradient += sin(vUv.x * 8.0) * 0.1 + cos(vUv.y * 6.0) * 0.1;
            texColor = vec3(gradient);
          }
          
          // Calculate brightness
          float brightness = dot(texColor, vec3(0.299, 0.587, 0.114));
          
          // Apply dithering
          float threshold;
          vec2 ditherCoord = floor(vUv * uResolution / uPixelSize);
          
          if (uDitherType == 0) {
            // Ordered dithering using Bayer matrix
            threshold = getBayerValue(ditherCoord);
          } else {
            // Random dithering with some noise
            threshold = random(ditherCoord + uTime * 0.1) * 0.5 + 0.25;
          }
          
          // Determine if pixel should be light or dark
          float ditherResult = step(threshold, brightness);
          
          // Mix colors based on dither result
          vec3 finalColor = mix(uAccentSecondary, uAccentPrimary, ditherResult);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }
}

// Custom gradient material for background
class GradientMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColorTop: { value: new THREE.Color('#ffffff') },
        uColorBottom: { value: new THREE.Color('#cccccc') }
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorTop;
        uniform vec3 uColorBottom;
        
        varying vec2 vUv;
        
        void main() {
          vec3 color = mix(uColorBottom, uColorTop, vUv.y);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
  }
}

// Create a placeholder texture for when src is null
const createPlaceholderTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 1, 1);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
};

// Fullscreen quad component with aspect ratio preservation (cover behavior)
const FullscreenQuad = ({ children, aspectRatio = 1 }) => {
  const { viewport } = useThree();
  
  // Calculate dimensions to cover container while maintaining aspect ratio
  const containerAspect = viewport.width / viewport.height;
  
  let width, height;
  
  if (containerAspect > aspectRatio) {
    // Container is wider than content - fit to width, crop height
    width = viewport.width;
    height = width / aspectRatio;
  } else {
    // Container is taller than content - fit to height, crop width
    height = viewport.height;
    width = height * aspectRatio;
  }
  
  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      {children}
    </mesh>
  );
};

// Painting component with watercolor effect
const Painting = ({ color = "hotpink", scale = 9.0, colorLevels = 4.0, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const paintNormalTexture = useTexture("https://cdn.maximeheckel.com/textures/paint-normal.jpg");
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;

  paintNormalTexture.minFilter = THREE.LinearMipmapLinearFilter;
  paintNormalTexture.magFilter = THREE.LinearFilter;
  paintNormalTexture.generateMipmaps = true;

  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uPaintNormalMap.value = paintNormalTexture;
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 1;

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <waterColorMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScale={scale}
        uColorLevels={colorLevels}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[10, 3, 64, 16]} />
      <waterColorMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScale={scale}
        uColorLevels={colorLevels}
      />
    </mesh>
  );
};

// Noise effect component
const NoiseEffect = ({ color = "hotpink", noiseScale = 5.0, noiseIntensity = 0.15, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;
  
  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 1;

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <noiseMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uNoiseScale={noiseScale}
        uNoiseIntensity={noiseIntensity}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[10, 3, 64, 16]} />
      <noiseMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uNoiseScale={noiseScale}
        uNoiseIntensity={noiseIntensity}
      />
    </mesh>
  );
};

// Pixel effect component
const PixelEffect = ({ color = "hotpink", pixelDensity = 8.0, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;
  
  const themeAccentPrimary = currentTheme?.data?.backgroundColor || "#ffffff";
  const themeAccentSecondary = currentTheme?.data?.accentSec || "#000000";
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uPixelDensity.value = size.width / 16.0; // Calculate density based on desired pixel size
      materialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      materialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 1;

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <pixelMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uPixelDensity={size.width / 8.0} // Set pixel density
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[10, 3, 64, 16]} />
      <pixelMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uPixelDensity={size.width / 8.0} // Set pixel density
      />
    </mesh>
  );
};

// Halftone effect component
const HalftoneEffect = ({ 
  color = "hotpink", 
  halftoneSize = 8.0, 
  halftoneShape = "circle", 
  invert = false,
  accentPrimary = "red",
  accentSecondary = "blue",
  dotScale = 0.6,
  src = null 
}) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;
  
  // Get accent colors from theme
  const themeAccentPrimary = currentTheme?.data?.backgroundColor || accentPrimary;
  const themeAccentSecondary = currentTheme?.data?.accentPri || accentSecondary;
  
  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      materialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 1;

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <halftoneMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uHalftoneSize={halftoneSize}
        uHalftoneShape={halftoneShape === "circle" ? 0 : 1}
        uInvert={invert ? 1 : 0}
        uDotScale={dotScale}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[10, 3, 64, 16]} />
      <halftoneMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uHalftoneSize={halftoneSize}
        uHalftoneShape={halftoneShape === "circle" ? 0 : 1}
        uInvert={invert ? 1 : 0}
        uDotScale={dotScale}
      />
    </mesh>
  );
};

// Moiré effect component
const MoireEffect = ({ color = "hotpink", moireScale = 10.0, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;
  
  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 1;

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <moireMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uMoireScale={moireScale}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[10, 3, 64, 16]} />
      <moireMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uMoireScale={moireScale}
      />
    </mesh>
  );
};

// Vintage print effect component
const VintagePrintEffect = ({ color = "hotpink", dotSize = 5.0, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;
  
  const themeAccentPrimary = currentTheme?.data?.backgroundColor || "#ffffff";
  const themeAccentSecondary = currentTheme?.data?.accentSec || "#000000";
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      materialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 1;

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <vintagePrintMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uDotSize={dotSize}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[10, 3, 64, 16]} />
      <vintagePrintMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uDotSize={dotSize}
      />
    </mesh>
  );
};

// Vintage computer screen effect component
const VintageScreenEffect = ({ color = "red", scanLineIntensity = 0.5, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;
  
  // Get accent colors from theme
  const themeAccentPrimary = currentTheme?.data?.backgroundColor || "#ffffff";
  const themeAccentSecondary = currentTheme?.data?.accentPri || "#000000";
  
  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      materialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 1;

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <vintageScreenMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScanLineIntensity={scanLineIntensity}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow position={[0, 0, 0]}>
      <torusKnotGeometry args={[10, 3, 64, 16]} />
      <vintageScreenMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScanLineIntensity={scanLineIntensity}
      />
    </mesh>
  );
};

// Scene capture material for dithering post-process
class SceneDitherMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uSceneTexture: { value: null },
        uResolution: { value: new THREE.Vector2(1.0, 1.0) },
        uPixelSize: { value: 4.0 },
        uAccentPrimary: { value: new THREE.Color('#ffffff') },
        uAccentSecondary: { value: new THREE.Color('#000000') },
        uDitherType: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uSceneTexture;
        uniform vec2 uResolution;
        uniform float uPixelSize;
        uniform vec3 uAccentPrimary;
        uniform vec3 uAccentSecondary;
        uniform int uDitherType;
        
        varying vec2 vUv;
        
        // Bayer matrix for ordered dithering (4x4)
        float getBayerValue(vec2 coord) {
          int x = int(mod(coord.x, 4.0));
          int y = int(mod(coord.y, 4.0));
          
          // 4x4 Bayer matrix
          float bayer[16];
          bayer[0] = 0.0/16.0;   bayer[1] = 8.0/16.0;   bayer[2] = 2.0/16.0;   bayer[3] = 10.0/16.0;
          bayer[4] = 12.0/16.0;  bayer[5] = 4.0/16.0;   bayer[6] = 14.0/16.0;  bayer[7] = 6.0/16.0;
          bayer[8] = 3.0/16.0;   bayer[9] = 11.0/16.0;  bayer[10] = 1.0/16.0;  bayer[11] = 9.0/16.0;
          bayer[12] = 15.0/16.0; bayer[13] = 7.0/16.0;  bayer[14] = 13.0/16.0; bayer[15] = 5.0/16.0;
          
          return bayer[y * 4 + x];
        }
        
        // Pseudo-random function for random dithering
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main() {
          // Calculate pixel grid coordinates
          vec2 pixelCoord = floor(vUv * uResolution / uPixelSize) * uPixelSize;
          vec2 pixelUV = pixelCoord / uResolution;
          
          // Sample the scene texture at the pixel center
          vec3 sceneColor = texture2D(uSceneTexture, pixelUV + vec2(uPixelSize * 0.5) / uResolution).rgb;
          
          // Calculate brightness
          float brightness = dot(sceneColor, vec3(0.299, 0.587, 0.114));
          
          // Apply dithering
          float threshold;
          vec2 ditherCoord = floor(vUv * uResolution / uPixelSize);
          
          if (uDitherType == 0) {
            // Ordered dithering using Bayer matrix
            threshold = getBayerValue(ditherCoord);
          } else {
            // Random dithering
            threshold = random(ditherCoord) * 0.5 + 0.25;
          }
          
          // Determine if pixel should be light or dark
          float ditherResult = step(threshold, brightness);
          
          // Mix colors based on dither result
          vec3 finalColor = mix(uAccentSecondary, uAccentPrimary, ditherResult);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false,
      depthTest: false,
      depthWrite: false
    });
  }
}

// Register the custom materials
extend({ WaterColorMaterial, NoiseMaterial, PixelMaterial, HalftoneMaterial, MoireMaterial, VintagePrintMaterial, VintageScreenMaterial, DitheredMaterial, GradientMaterial, SceneDitherMaterial });

// Scene renderer component for dithered effect
const SceneRenderer = ({ children, onRender }) => {
  const { gl, scene, camera, size } = useThree();
  const renderTarget = useRef();
  const sceneRef = useRef();
  
  useEffect(() => {
    // Create render target
    renderTarget.current = new THREE.WebGLRenderTarget(size.width, size.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType
    });
    
    return () => {
      if (renderTarget.current) {
        renderTarget.current.dispose();
      }
    };
  }, [size]);
  
  useFrame(() => {
    if (renderTarget.current && sceneRef.current) {
      // Render scene to texture
      gl.setRenderTarget(renderTarget.current);
      gl.render(sceneRef.current, camera);
      gl.setRenderTarget(null);
      
      // Pass the rendered texture to parent
      if (onRender) {
        onRender(renderTarget.current.texture);
      }
    }
  });
  
  return (
    <scene ref={sceneRef}>
      {children}
    </scene>
  );
};

// Dithered bitmap effect component with scene-wide dithering
const DitheredEffect = ({ color = "hotpink", pixelSize = 1.0, ditherType = 0, src = null }) => {
  const materialRef = useRef();
  const backgroundMaterialRef = useRef();
  const ditherMaterialRef = useRef();
  const { viewport, size } = useThree();
  const { currentTheme } = useThemeContext();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src && !currentTheme?.data?.shaderMesh;
  const [sceneTexture, setSceneTexture] = React.useState(null);
  
  // Get accent colors from theme
  const themeAccentPrimary = currentTheme?.data?.backgroundColor || "#ffffff";
  const themeAccentSecondary = currentTheme?.data?.accentPri || "#000000";
  
  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }

  useFrame((state) => {
    // Update background gradient
    if (backgroundMaterialRef.current) {
      backgroundMaterialRef.current.uniforms.uColorTop.value = new THREE.Color(themeAccentPrimary);
      backgroundMaterialRef.current.uniforms.uColorBottom.value = new THREE.Color(themeAccentSecondary);
    }
    
    // Update dither material
    if (ditherMaterialRef.current && sceneTexture) {
      ditherMaterialRef.current.uniforms.uSceneTexture.value = sceneTexture;
      ditherMaterialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      ditherMaterialRef.current.uniforms.uPixelSize.value = pixelSize;
      ditherMaterialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      ditherMaterialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      ditherMaterialRef.current.uniforms.uDitherType.value = ditherType;
    }
    
    // Update material for texture mode
    if (materialRef.current && hasTexture) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      materialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      
      if (imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  // Calculate aspect ratio from texture if available
  const aspectRatio = hasTexture && imageTexture ? imageTexture.image.width / imageTexture.image.height : 0.01;

  const handleSceneRender = (texture) => {
    setSceneTexture(texture);
  };

  return hasTexture ? (
    <FullscreenQuad aspectRatio={aspectRatio}>
      <ditheredMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uPixelSize={pixelSize}
        uDitherType={ditherType}
      />
    </FullscreenQuad>
  ) : (
    <>
      {/* Render the scene to texture */}
      <SceneRenderer onRender={handleSceneRender}>
        {/* Background plane with gradient */}
        <mesh position={[0, 0, -20]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <gradientMaterial 
            ref={backgroundMaterialRef}
            key={uuidv4()}
          />
        </mesh>
        
        {/* Torus mesh */}
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <torusKnotGeometry args={[10, 3, 64, 16]} />
          <meshStandardMaterial color={currentTheme?.data?.accentPri || color} />
        </mesh>
      </SceneRenderer>
      
      {/* Fullscreen dithering overlay */}
      {sceneTexture && (
        <mesh position={[0, 0, 15]} renderOrder={1000}>
          <planeGeometry args={[viewport.width * 1, viewport.height * 1]} />
          <sceneDitherMaterial
            ref={ditherMaterialRef}
            key={uuidv4()}
          />
        </mesh>
      )}
    </>
  );
};

// Main component
export default function CanvasImageComponent({ src = null }) {
  const { currentTheme } = useThemeContext();
  const [activeEffect, setActiveEffect] = React.useState(currentTheme?.data?.shaderType || 'watercolor');
  const [effectColor, setEffectColor] = React.useState('hotpink');
  const [imageSrc, setImageSrc] = React.useState(src);
  
  // Watercolor specific settings
  const [effectScale, setEffectScale] = React.useState(9.0);
  const [effectColorLevels, setEffectColorLevels] = React.useState(4.0);
  
  // Noise specific settings
  const [noiseScale, setNoiseScale] = React.useState(5.0);
  const [noiseIntensity, setNoiseIntensity] = React.useState(0.15);
  
  // Pixel specific settings
  const [pixelDensity, setPixelDensity] = React.useState(20.0);
  
  // Halftone specific settings
  const [halftoneSize, setHalftoneSize] = React.useState(8.0);
  const [halftoneShape, setHalftoneShape] = React.useState("circle");
  const [halftoneInvert, setHalftoneInvert] = React.useState(false);
  const [dotScale, setDotScale] = React.useState(0.6);
  
  // Dithered specific settings
  const [ditherPixelSize, setDitherPixelSize] = React.useState(0.1);
  const [ditherType, setDitherType] = React.useState(0);
  
  // Update effect settings when theme changes
  useEffect(() => {
    if (currentTheme?.data.shaderType) {
      setActiveEffect(currentTheme.data.shaderType);
    }
    
    if (src !== null) {
      setImageSrc(src);
    } else if (currentTheme?.data.imageSrc) {
      setImageSrc(currentTheme.data.imageSrc);
    }
    
    if (currentTheme) {
      // Common settings
      setEffectColor(currentTheme.data.effectColor || 'hotpink');
      
      // Watercolor specific settings
      setEffectScale(currentTheme.data.effectScale || 9.0);
      setEffectColorLevels(currentTheme.data.effectColorLevels || 4.0);
      
      // Noise specific settings
      setNoiseScale(currentTheme.data.noiseScale || 5.0);
      setNoiseIntensity(currentTheme.data.noiseIntensity || 0.15);
      
      // Pixel specific settings
      setPixelDensity(currentTheme.data.pixelDensity || 20.0);
      
      // Halftone specific settings
      setHalftoneSize(currentTheme.data.halftoneSize || 8.0);
      setHalftoneShape(currentTheme.data.halftoneShape || "circle");
      setHalftoneInvert(currentTheme.data.halftoneInvert || false);
      setDotScale(currentTheme.data.dotScale || 0.6);
      
      // Dithered specific settings
      setDitherPixelSize(currentTheme.data.ditherPixelSize || 4.0);
      setDitherType(currentTheme.data.ditherType || 0);
    }
    console.log("currentTheme", currentTheme);
  }, [currentTheme, src]);

  // Render different effects based on active effect
  const renderEffect = () => {
    switch (activeEffect) {
      case 'watercolor':
        return (
          <Painting 
            color={effectColor} 
            scale={effectScale} 
            colorLevels={effectColorLevels}
            src={imageSrc}
          />
        );
      case 'noise':
        return (
          <NoiseEffect 
            color={effectColor}
            noiseScale={noiseScale}
            noiseIntensity={noiseIntensity}
            src={imageSrc}
          />
        );
      case 'pixel':
        return (
          <PixelEffect 
            color={effectColor}
            pixelDensity={pixelDensity}
            src={imageSrc}
          />
        );
      case 'halftone':
        return (
          <HalftoneEffect 
            color={effectColor}
            halftoneSize={halftoneSize}
            halftoneShape={halftoneShape}
            invert={halftoneInvert}
            dotScale={dotScale}
            src={imageSrc}
          />
        );
      case 'moire':
        return (
          <MoireEffect 
            color={effectColor}
            moireScale={10.0}
            src={imageSrc}
          />
        );
      case 'vintagePrint':
        return (
          <VintagePrintEffect 
            color={effectColor}
            dotSize={5.0}
            src={imageSrc}
          />
        );
      case 'vintageScreen':
        return (
          <VintageScreenEffect 
            color={effectColor}
            scanLineIntensity={0.1}
            src={imageSrc}
          />
        );
      case 'dithered':
        return (
          <DitheredEffect 
            color={effectColor}
            pixelSize={ditherPixelSize}
            ditherType={ditherType}
            src={imageSrc}
          />
        );
      default:
        return (
          <Painting 
            color={effectColor} 
            scale={effectScale} 
            colorLevels={effectColorLevels}
            src={imageSrc}
          />
        );
    }
  };

  return (
      <Canvas 
      className="overflow-hidden absolute top-0 left-0 w-screen h-screen bg-red-500"
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: false,
          scissorTest: true // Enable scissor test for clipping
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.25} />
          <directionalLight position={[-5, 5, 5]} intensity={7} />
          <color attach="background" args={[currentTheme?.data.backgroundColor || "#3386E0"]} />
          {renderEffect()}
          <OrbitControls enableZoom={false} enablePan={false} />
          <OrthographicCamera
            makeDefault
            position={[0, 0, 105]}
            zoom={10}
            near={0.01}
            far={500}
          />
        </Suspense>
      </Canvas>
  );
} 