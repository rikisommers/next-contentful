import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, useTexture, Edges, useAspect } from '@react-three/drei';
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

// Register the custom materials
extend({ WaterColorMaterial, NoiseMaterial, PixelMaterial, HalftoneMaterial, MoireMaterial, VintagePrintMaterial, VintageScreenMaterial });

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

// Fullscreen quad component
const FullscreenQuad = ({ children }) => {
  const { viewport } = useThree();
  
  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      {children}
    </mesh>
  );
};

// Painting component with watercolor effect
const Painting = ({ color = "hotpink", scale = 9.0, colorLevels = 4.0, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const paintNormalTexture = useTexture("https://cdn.maximeheckel.com/textures/paint-normal.jpg");
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src;

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
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  return hasTexture ? (
    <FullscreenQuad>
      <waterColorMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScale={scale}
        uColorLevels={colorLevels}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[0.5, 0.2, 256, 256]} />
      <waterColorMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScale={scale}
        uColorLevels={colorLevels}
      />
      <Edges />
    </mesh>
  );
};

// Noise effect component
const NoiseEffect = ({ color = "hotpink", noiseScale = 5.0, noiseIntensity = 0.15, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src;
  
  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  return hasTexture ? (
    <FullscreenQuad>
      <noiseMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uNoiseScale={noiseScale}
        uNoiseIntensity={noiseIntensity}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[0.5, 0.2, 256, 256]} />
      <noiseMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uNoiseScale={noiseScale}
        uNoiseIntensity={noiseIntensity}
      />
      <Edges />
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
  const hasTexture = !!src;
  
  const themeAccentPrimary = currentTheme?.data?.backgroundColor || "#ffffff";
  const themeAccentSecondary = currentTheme?.data?.accentSec || "#000000";
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uPixelDensity.value = size.width / 16.0; // Calculate density based on desired pixel size
      materialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      materialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  return hasTexture ? (
    <FullscreenQuad>
      <pixelMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uPixelDensity={size.width / 8.0} // Set pixel density
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[0.5, 0.2, 256, 256]} />
      <pixelMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uPixelDensity={size.width / 8.0} // Set pixel density
      />
      <Edges />
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
  const hasTexture = !!src;
  
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
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  return hasTexture ? (
    <FullscreenQuad>
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
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[0.5, 0.2, 256, 256]} />
      <halftoneMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uHalftoneSize={halftoneSize}
        uHalftoneShape={halftoneShape === "circle" ? 0 : 1}
        uInvert={invert ? 1 : 0}
        uDotScale={dotScale}
      />
      <Edges />
    </mesh>
  );
};

// Moiré effect component
const MoireEffect = ({ color = "hotpink", moireScale = 10.0, src = null }) => {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const textures = useTexture(src ? { image: src } : {});
  const imageTexture = src ? textures.image : null;
  const hasTexture = !!src;
  
  if (imageTexture) {
    imageTexture.minFilter = THREE.LinearFilter;
    imageTexture.magFilter = THREE.LinearFilter;
  }

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  return hasTexture ? (
    <FullscreenQuad>
      <moireMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uMoireScale={moireScale}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[0.5, 0.2, 256, 256]} />
      <moireMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uMoireScale={moireScale}
      />
      <Edges />
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
  const hasTexture = !!src;
  
  const themeAccentPrimary = currentTheme?.data?.backgroundColor || "#ffffff";
  const themeAccentSecondary = currentTheme?.data?.accentSec || "#000000";
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uAccentPrimary.value = new THREE.Color(themeAccentPrimary);
      materialRef.current.uniforms.uAccentSecondary.value = new THREE.Color(themeAccentSecondary);
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  return hasTexture ? (
    <FullscreenQuad>
      <vintagePrintMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uDotSize={dotSize}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[0.5, 0.2, 256, 256]} />
      <vintagePrintMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uDotSize={dotSize}
      />
      <Edges />
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
  const hasTexture = !!src;
  
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
      
      if (hasTexture && imageTexture) {
        materialRef.current.uniforms.uTexture.value = imageTexture;
        materialRef.current.uniforms.uUseTexture.value = 1;
      } else {
        materialRef.current.uniforms.uUseTexture.value = 0;
      }
    }
  });

  return hasTexture ? (
    <FullscreenQuad>
      <vintageScreenMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScanLineIntensity={scanLineIntensity}
      />
    </FullscreenQuad>
  ) : (
    <mesh receiveShadow castShadow>
      <torusKnotGeometry args={[0.5, 0.2, 256, 256]} />
      <vintageScreenMaterial
        ref={materialRef}
        key={uuidv4()}
        color={color}
        uScanLineIntensity={scanLineIntensity}
      />
      <Edges />
    </mesh>
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
    <div className="overflow-hidden z-10 w-1/2 h-1/2 rounded-2xl" style={{ position: 'fixed' }}>
      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.25} />
          <directionalLight position={[-5, 5, 5]} intensity={7} />
          <color attach="background" args={[currentTheme?.data.backgroundColor || "#3386E0"]} />
          {renderEffect()}
          <OrbitControls enableZoom={false} enablePan={false} />
          <OrthographicCamera
            makeDefault
            position={[0, 0, 5]}
            zoom={1}
            near={0.01}
            far={500}
          />
        </Suspense>
      </Canvas>
    </div>
  );
} 