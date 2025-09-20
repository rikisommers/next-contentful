/**
 * WebGL Utility Functions
 * 
 * Common utilities for WebGL operations used across both
 * image and shader canvas implementations
 */

export class WebGLUtils {
  
  /**
   * Create and compile a shader
   * @param {WebGLRenderingContext} gl 
   * @param {number} type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
   * @param {string} source - GLSL source code
   * @returns {WebGLShader|null}
   */
  static createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      console.error('Shader compilation error:', error);
      console.error('Source:', source);
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }
  
  /**
   * Create a shader program from vertex and fragment shaders
   * @param {WebGLRenderingContext} gl 
   * @param {string} vertexSource 
   * @param {string} fragmentSource 
   * @returns {WebGLProgram|null}
   */
  static createProgram(gl, vertexSource, fragmentSource) {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    
    if (!vertexShader || !fragmentShader) {
      return null;
    }
    
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const error = gl.getProgramInfoLog(program);
      console.error('Program linking error:', error);
      gl.deleteProgram(program);
      return null;
    }
    
    // Clean up shaders (they're now part of the program)
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    
    return program;
  }
  
  /**
   * Create a buffer and upload data
   * @param {WebGLRenderingContext} gl 
   * @param {ArrayBuffer} data 
   * @param {number} usage - gl.STATIC_DRAW, gl.DYNAMIC_DRAW, etc.
   * @returns {WebGLBuffer}
   */
  static createBuffer(gl, data, usage = gl.STATIC_DRAW) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, usage);
    return buffer;
  }
  
  /**
   * Create a texture from an image or canvas
   * @param {WebGLRenderingContext} gl 
   * @param {HTMLImageElement|HTMLCanvasElement} source 
   * @param {Object} options - Texture options
   * @returns {WebGLTexture}
   */
  static createTexture(gl, source, options = {}) {
    const {
      wrapS = gl.CLAMP_TO_EDGE,
      wrapT = gl.CLAMP_TO_EDGE,
      minFilter = gl.LINEAR,
      magFilter = gl.LINEAR,
      format = gl.RGBA,
      type = gl.UNSIGNED_BYTE
    } = options;
    
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    
    // Upload texture data
    if (source) {
      gl.texImage2D(gl.TEXTURE_2D, 0, format, format, type, source);
    }
    
    return texture;
  }
  
  /**
   * Create an empty texture for render targets
   * @param {WebGLRenderingContext} gl 
   * @param {number} width 
   * @param {number} height 
   * @param {Object} options 
   * @returns {WebGLTexture}
   */
  static createEmptyTexture(gl, width, height, options = {}) {
    const {
      format = gl.RGBA,
      type = gl.UNSIGNED_BYTE,
      minFilter = gl.LINEAR,
      magFilter = gl.LINEAR
    } = options;
    
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    
    gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, null);
    
    return texture;
  }
  
  /**
   * Create a framebuffer with attached texture
   * @param {WebGLRenderingContext} gl 
   * @param {number} width 
   * @param {number} height 
   * @returns {Object} - {framebuffer, texture}
   */
  static createFramebuffer(gl, width, height) {
    const framebuffer = gl.createFramebuffer();
    const texture = this.createEmptyTexture(gl, width, height);
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      console.error('Framebuffer is not complete');
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    
    return { framebuffer, texture };
  }
  
  /**
   * Convert hex color to RGB array
   * @param {string} hex - Hex color string (#rrggbb)
   * @returns {number[]} - [r, g, b] values between 0-1
   */
  static hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return [r / 255, g / 255, b / 255];
  }
  
  /**
   * Convert RGB to hex color
   * @param {number} r - Red (0-1)
   * @param {number} g - Green (0-1)
   * @param {number} b - Blue (0-1)
   * @returns {string} - Hex color string
   */
  static rgbToHex(r, g, b) {
    const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  
  /**
   * Create a quad geometry (two triangles)
   * @param {WebGLRenderingContext} gl 
   * @param {number} width 
   * @param {number} height 
   * @returns {Object} - {positionBuffer, texCoordBuffer, indexBuffer}
   */
  static createQuad(gl, width = 1, height = 1) {
    // Positions (two triangles forming a quad)
    const positions = new Float32Array([
      -width/2, -height/2,
      width/2, -height/2,
      -width/2, height/2,
      -width/2, height/2,
      width/2, -height/2,
      width/2, height/2,
    ]);
    
    // Texture coordinates
    const texCoords = new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]);
    
    const positionBuffer = this.createBuffer(gl, positions);
    const texCoordBuffer = this.createBuffer(gl, texCoords);
    
    return {
      positionBuffer,
      texCoordBuffer,
      vertexCount: 6
    };
  }
  
  /**
   * Enable vertex attribute array
   * @param {WebGLRenderingContext} gl 
   * @param {WebGLBuffer} buffer 
   * @param {number} attributeLocation 
   * @param {number} size - Number of components per vertex
   * @param {number} type - Data type (gl.FLOAT, etc.)
   */
  static bindAttribute(gl, buffer, attributeLocation, size, type = gl.FLOAT) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(attributeLocation, size, type, false, 0, 0);
  }
  
  /**
   * Check WebGL capabilities
   * @param {WebGLRenderingContext} gl 
   * @returns {Object} - Capability information
   */
  static getCapabilities(gl) {
    const capabilities = {
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
      maxVertexUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      extensions: {
        derivatives: !!gl.getExtension('OES_standard_derivatives'),
        textureFloat: !!gl.getExtension('OES_texture_float'),
        textureHalfFloat: !!gl.getExtension('OES_texture_half_float'),
        depthTexture: !!gl.getExtension('WEBGL_depth_texture'),
      }
    };
    
    return capabilities;
  }
  
  /**
   * Resize canvas and update viewport
   * @param {HTMLCanvasElement} canvas 
   * @param {WebGLRenderingContext} gl 
   * @param {number} pixelRatio 
   */
  static resizeCanvas(canvas, gl, pixelRatio = window.devicePixelRatio || 1) {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * pixelRatio;
    const height = rect.height * pixelRatio;
    
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      return { width, height, changed: true };
    }
    
    return { width, height, changed: false };
  }
}