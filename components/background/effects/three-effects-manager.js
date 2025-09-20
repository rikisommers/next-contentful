import React, { useMemo, useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';
import * as THREE from 'three';

// Extend Three.js with post-processing components
extend({ EffectComposer, RenderPass, ShaderPass });

// Halftone Dots Shader
const HalftoneDots = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2() },
    uPixelSize: { value: 6.0 },
    uIntensity: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uPixelSize;
    uniform float uIntensity;
    varying vec2 vUv;
    
    void main() {
      vec2 pixelatedUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
      vec4 color = texture2D(tDiffuse, pixelatedUv);
      
      vec2 center = fract(vUv * uResolution / uPixelSize) - 0.5;
      float dist = length(center);
      float brightness = (color.r + color.g + color.b) / 3.0;
      
      float radius = brightness * 0.4;
      float circle = smoothstep(radius, radius - 0.1, dist);
      
      vec3 finalColor = mix(vec3(0.0), color.rgb, circle * uIntensity);
      gl_FragColor = vec4(finalColor, color.a);
    }
  `
};

// Pixelation Shader
const Pixelation = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2() },
    uPixelSize: { value: 8.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uPixelSize;
    varying vec2 vUv;
    
    void main() {
      vec2 pixelatedUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
      gl_FragColor = texture2D(tDiffuse, pixelatedUv);
    }
  `
};

// Noise Shader
const Noise = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uIntensity: { value: 0.1 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uIntensity;
    varying vec2 vUv;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float noise = random(vUv + uTime) * 2.0 - 1.0;
      color.rgb += noise * uIntensity;
      gl_FragColor = color;
    }
  `
};

// Halftone ASCII Shader
const HalftoneASCII = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2() },
    uPixelSize: { value: 12.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uPixelSize;
    varying vec2 vUv;
    
    void main() {
      vec2 pixelatedUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
      vec4 color = texture2D(tDiffuse, pixelatedUv);
      float brightness = (color.r + color.g + color.b) / 3.0;
      
      // ASCII-like pattern
      vec2 center = fract(vUv * uResolution / uPixelSize) - 0.5;
      float pattern = step(0.1, abs(center.x)) * step(0.1, abs(center.y));
      pattern *= brightness;
      
      gl_FragColor = vec4(vec3(pattern), color.a);
    }
  `
};

// Halftone LED Shader  
const HalftoneLED = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2() },
    uPixelSize: { value: 8.0 },
    uIntensity: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uPixelSize;
    uniform float uIntensity;
    varying vec2 vUv;
    
    void main() {
      vec2 pixelatedUv = floor(vUv * uResolution / uPixelSize) * uPixelSize / uResolution;
      vec4 color = texture2D(tDiffuse, pixelatedUv);
      
      vec2 center = fract(vUv * uResolution / uPixelSize) - 0.5;
      float dist = max(abs(center.x), abs(center.y));
      float brightness = (color.r + color.g + color.b) / 3.0;
      
      float led = step(dist, brightness * 0.4);
      vec3 finalColor = mix(vec3(0.0), color.rgb, led * uIntensity);
      gl_FragColor = vec4(finalColor, color.a);
    }
  `
};

// Dither Blue Noise Shader
const DitherBlueNoise = {
  uniforms: {
    tDiffuse: { value: null },
    uResolution: { value: new THREE.Vector2() },
    uIntensity: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uIntensity;
    varying vec2 vUv;
    
    float blueNoise(vec2 coord) {
      return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      
      vec2 coord = vUv * uResolution;
      float noise = blueNoise(floor(coord)) - 0.5;
      
      float dither = step(noise * uIntensity, luminance - 0.5);
      gl_FragColor = vec4(vec3(dither), color.a);
    }
  `
};

/**
 * Three.js Effects Manager Component
 */
export const ThreeEffectsManager = ({ effects = [], children }) => {
  const { gl, scene, camera, size } = useThree();
  
  // Debug logging
  React.useEffect(() => {
    console.log('ThreeEffectsManager: Effects received:', effects);
  }, [effects]);
  const composerRef = useRef();
  
  // Create effect composer and passes
  const { composer, passes } = useMemo(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    const passes = [];
    
    effects.forEach((effect) => {
      console.log('Creating effect:', effect);
      let shader = null;
      let uniforms = {};
      
      switch (effect.type) {
        case 'halftone-dots':
        case 'halftone_dots':
          shader = HalftoneDots;
          uniforms = {
            uPixelSize: effect.pixelSize || 6.0,
            uIntensity: effect.intensity || 1.0,
          };
          break;
          
        case 'halftone-ascii':
        case 'halftone_ascii':
          shader = HalftoneASCII;
          uniforms = {
            uPixelSize: effect.pixelSize || 12.0,
          };
          break;
          
        case 'halftone-led':
        case 'halftone_led':
          shader = HalftoneLED;
          uniforms = {
            uPixelSize: effect.pixelSize || 8.0,
            uIntensity: effect.intensity || 1.0,
          };
          break;
          
        case 'pixelation':
          shader = Pixelation;
          uniforms = {
            uPixelSize: effect.pixelSize || 8.0,
          };
          break;
          
        case 'noise':
          shader = Noise;
          uniforms = {
            uIntensity: effect.intensity || 0.1,
          };
          break;
          
        case 'dither-blue-noise':
        case 'dither_blue_noise':
          shader = DitherBlueNoise;
          uniforms = {
            uIntensity: effect.intensity || 1.0,
          };
          break;
          
        case 'dither-ordered':
        case 'dither_ordered':
          shader = DitherBlueNoise; // Using blue noise for ordered dither for now
          uniforms = {
            uIntensity: effect.intensity || 1.0,
          };
          break;
      }
      
      if (shader) {
        console.log('Creating shader pass for:', effect.type);
        const pass = new ShaderPass(shader);
        // Set custom uniforms
        Object.keys(uniforms).forEach(key => {
          if (pass.material.uniforms[key]) {
            pass.material.uniforms[key].value = uniforms[key];
          }
        });
        composer.addPass(pass);
        passes.push(pass);
        console.log('Added shader pass, total passes:', passes.length + 1); // +1 for render pass
      } else {
        console.warn('No shader found for effect type:', effect.type);
      }
    });
    
    // Make sure the last pass renders to screen
    if (passes.length > 0) {
      passes[passes.length - 1].renderToScreen = true;
    } else {
      renderPass.renderToScreen = true;
    }
    
    return { composer, passes };
  }, [effects, gl, scene, camera]);
  
  // Update composer size
  React.useEffect(() => {
    if (composer) {
      composer.setSize(size.width, size.height);
      
      // Update resolution uniforms
      passes.forEach(pass => {
        if (pass.material?.uniforms?.uResolution) {
          pass.material.uniforms.uResolution.value.set(size.width, size.height);
        }
      });
    }
  }, [composer, passes, size]);
  
  // Store composer reference
  React.useEffect(() => {
    composerRef.current = composer;
  }, [composer]);
  
  // Take over rendering when effects are present
  useFrame((state) => {
    if (effects.length > 0 && composer) {
      // Debug: Log first few renders
      if (state.clock.elapsedTime < 2) {
        console.log('Rendering with effects, time:', state.clock.elapsedTime.toFixed(2));
      }
      
      // Update time uniforms
      passes.forEach(pass => {
        if (pass.material?.uniforms?.uTime) {
          pass.material.uniforms.uTime.value = state.clock.elapsedTime;
        }
      });
      
      // Render with post-processing
      composer.render();
    }
  });
  
  return children;
};