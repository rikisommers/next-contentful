/**
 * Effect Manager - Handles post-processing effects pipeline
 * 
 * Applies effects to both image and shader canvases by:
 * 1. Creating render targets for multi-pass effects
 * 2. Compiling effect shaders dynamically
 * 3. Managing effect pipeline execution
 * 4. Optimizing render passes
 */

import { WebGLUtils } from '../utils/webgl-utils';

export class EffectManager {
  constructor(gl, effects = []) {
    this.gl = gl;
    this.effects = effects;
    this.renderTargets = new Map();
    this.effectPrograms = new Map();
    this.quadGeometry = null;
    this.currentTarget = 0;
    
    this.initialize();
  }

  initialize() {
    // Create shared quad geometry for all effects
    this.quadGeometry = WebGLUtils.createQuad(this.gl);
    
    // Create render targets for ping-pong rendering
    this.createRenderTargets();
    
    // Compile effect shaders
    this.compileEffects();
  }

  createRenderTargets() {
    const gl = this.gl;
    const canvas = gl.canvas;
    
    // Create two render targets for ping-pong rendering
    for (let i = 0; i < 2; i++) {
      const target = WebGLUtils.createFramebuffer(gl, canvas.width, canvas.height);
      this.renderTargets.set(`target${i}`, target);
    }
  }

  compileEffects() {
    // Compile shaders for each effect type
    this.effects.forEach(effect => {
      const program = this.createEffectProgram(effect);
      if (program) {
        this.effectPrograms.set(effect.type, program);
      }
    });
  }

  createEffectProgram(effect) {
    const vertexShader = this.getBaseVertexShader();
    const fragmentShader = this.getEffectFragmentShader(effect);
    
    if (!fragmentShader) {
      console.warn(`Unknown effect type: ${effect.type}`);
      return null;
    }

    return WebGLUtils.createProgram(this.gl, vertexShader, fragmentShader);
  }

  getBaseVertexShader() {
    // Standard vertex shader for post-processing effects
    return `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;
  }

  getEffectFragmentShader(effect) {
    const baseUniforms = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_primaryColor;
      uniform vec3 u_secondaryColor;
      varying vec2 v_texCoord;
    `;

    switch (effect.type) {
      case 'halftone-dots':
        return baseUniforms + this.getHalftoneDots(effect);
      
      case 'halftone-ascii':
        return baseUniforms + this.getHalftoneAscii(effect);
      
      case 'noise':
        return baseUniforms + this.getNoise(effect);
      
      case 'pixelation':
        return baseUniforms + this.getPixelation(effect);
      
      case 'dither-blue-noise':
        return baseUniforms + this.getBlueDither(effect);
      
      default:
        return null;
    }
  }

  // Effect shader implementations
  getHalftoneDots(effect) {
    const size = effect.size || 8.0;
    const threshold = effect.threshold || 0.5;
    
    return `
      void main() {
        vec2 uv = v_texCoord;
        vec4 color = texture2D(u_texture, uv);
        
        // Calculate dot pattern
        vec2 grid = floor(uv * u_resolution / ${size.toFixed(1)});
        vec2 center = (grid + 0.5) * ${size.toFixed(1)} / u_resolution;
        vec2 offset = uv - center;
        float dist = length(offset * u_resolution);
        
        // Calculate luminance
        float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        float radius = (1.0 - luminance) * ${(size * 0.5).toFixed(1)};
        
        float alpha = 1.0 - smoothstep(radius - 1.0, radius + 1.0, dist);
        vec3 dotColor = mix(vec3(1.0), u_primaryColor, alpha);
        
        gl_FragColor = vec4(dotColor, 1.0);
      }
    `;
  }

  getHalftoneAscii(effect) {
    const size = effect.size || 8.0;
    
    return `
      void main() {
        vec2 uv = v_texCoord;
        vec4 color = texture2D(u_texture, uv);
        
        // ASCII halftone effect
        vec2 grid = floor(uv * u_resolution / ${size.toFixed(1)});
        vec2 center = (grid + 0.5) * ${size.toFixed(1)} / u_resolution;
        
        float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        
        // Simple ASCII pattern based on luminance
        float pattern = 0.0;
        vec2 local = fract(uv * u_resolution / ${size.toFixed(1)});
        
        if (luminance > 0.8) pattern = 1.0;
        else if (luminance > 0.6) pattern = step(0.5, local.x);
        else if (luminance > 0.4) pattern = step(0.5, max(local.x, local.y));
        else if (luminance > 0.2) pattern = step(0.5, min(local.x, local.y));
        
        vec3 result = mix(vec3(0.0), u_primaryColor, pattern);
        gl_FragColor = vec4(result, 1.0);
      }
    `;
  }

  getNoise(effect) {
    const intensity = effect.intensity || 0.1;
    const scale = effect.scale || 1.0;
    
    return `
      // Simple noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      void main() {
        vec2 uv = v_texCoord;
        vec4 color = texture2D(u_texture, uv);
        
        float noise = random(uv * ${scale.toFixed(1)} + u_time) * ${intensity.toFixed(2)};
        color.rgb += noise - ${(intensity * 0.5).toFixed(2)};
        
        gl_FragColor = color;
      }
    `;
  }

  getPixelation(effect) {
    const pixelSize = effect.size || 4.0;
    
    return `
      void main() {
        vec2 uv = v_texCoord;
        
        // Pixelate UV coordinates
        vec2 pixelatedUV = floor(uv * u_resolution / ${pixelSize.toFixed(1)}) * ${pixelSize.toFixed(1)} / u_resolution;
        
        vec4 color = texture2D(u_texture, pixelatedUV);
        gl_FragColor = color;
      }
    `;
  }

  getBlueDither(effect) {
    const threshold = effect.threshold || 0.5;
    
    return `
      // Blue noise dithering (simplified)
      float dither(vec2 position) {
        // Simple blue noise approximation
        return fract(sin(dot(position, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 uv = v_texCoord;
        vec4 color = texture2D(u_texture, uv);
        
        float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        float noise = dither(gl_FragCoord.xy);
        
        float dithered = step(noise, luminance);
        vec3 result = vec3(dithered);
        
        gl_FragColor = vec4(result, 1.0);
      }
    `;
  }

  // Apply all effects in sequence
  applyEffects(inputTexture) {
    if (this.effects.length === 0) {
      return inputTexture; // No effects to apply
    }

    const gl = this.gl;
    let currentTexture = inputTexture;

    this.effects.forEach((effect, index) => {
      const program = this.effectPrograms.get(effect.type);
      if (!program) return;

      // Determine render target
      const isLastEffect = index === this.effects.length - 1;
      const targetIndex = index % 2;
      const target = isLastEffect ? null : this.renderTargets.get(`target${targetIndex}`);

      // Bind framebuffer (null = screen)
      gl.bindFramebuffer(gl.FRAMEBUFFER, target?.framebuffer || null);
      
      if (target) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }

      // Use effect program
      gl.useProgram(program);

      // Bind input texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, currentTexture);
      gl.uniform1i(gl.getUniformLocation(program, 'u_texture'), 0);

      // Set common uniforms
      gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), gl.canvas.width, gl.canvas.height);
      gl.uniform1f(gl.getUniformLocation(program, 'u_time'), performance.now() * 0.001);

      // Bind geometry and draw
      this.bindQuadGeometry(program);
      gl.drawArrays(gl.TRIANGLES, 0, this.quadGeometry.vertexCount);

      // Update current texture for next effect
      if (target) {
        currentTexture = target.texture;
      }
    });

    return currentTexture;
  }

  bindQuadGeometry(program) {
    const gl = this.gl;
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    // Bind position buffer
    WebGLUtils.bindAttribute(gl, this.quadGeometry.positionBuffer, positionLocation, 2);
    
    // Bind texture coordinate buffer  
    WebGLUtils.bindAttribute(gl, this.quadGeometry.texCoordBuffer, texCoordLocation, 2);
  }

  // Update effects (when controls change)
  updateEffects(newEffects) {
    this.effects = newEffects;
    this.effectPrograms.clear();
    this.compileEffects();
  }

  // Cleanup resources
  dispose() {
    const gl = this.gl;
    
    // Delete render targets
    this.renderTargets.forEach(target => {
      gl.deleteFramebuffer(target.framebuffer);
      gl.deleteTexture(target.texture);
    });

    // Delete effect programs
    this.effectPrograms.forEach(program => {
      gl.deleteProgram(program);
    });

    // Delete quad geometry
    if (this.quadGeometry) {
      gl.deleteBuffer(this.quadGeometry.positionBuffer);
      gl.deleteBuffer(this.quadGeometry.texCoordBuffer);
    }
  }
}