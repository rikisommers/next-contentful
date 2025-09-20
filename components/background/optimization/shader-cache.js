/**
 * Shader Cache - Optimizes shader compilation and reuse
 * 
 * Provides Three.js-like optimizations for native WebGL:
 * - Shader program caching by source hash
 * - Uniform location caching
 * - Automatic shader recompilation on changes
 * - Memory management and cleanup
 */

import { WebGLUtils } from '../utils/webgl-utils';

export class ShaderCache {
  constructor() {
    this.programCache = new Map(); // source hash -> WebGLProgram
    this.uniformLocations = new Map(); // program -> uniform locations
    this.attributeLocations = new Map(); // program -> attribute locations
    this.usageCount = new Map(); // program -> usage count
    this.maxCacheSize = 50; // Limit cache size
  }

  /**
   * Get or create a shader program
   * @param {WebGLRenderingContext} gl 
   * @param {string} vertexSource 
   * @param {string} fragmentSource 
   * @param {string} key - Optional cache key
   * @returns {WebGLProgram}
   */
  getProgram(gl, vertexSource, fragmentSource, key = null) {
    // Generate cache key from shader sources
    const cacheKey = key || this.generateHash(vertexSource + fragmentSource);
    
    // Check cache
    if (this.programCache.has(cacheKey)) {
      const program = this.programCache.get(cacheKey);
      this.usageCount.set(program, (this.usageCount.get(program) || 0) + 1);
      return program;
    }
    
    // Create new program
    const program = WebGLUtils.createProgram(gl, vertexSource, fragmentSource);
    if (!program) return null;
    
    // Cache program
    this.cacheProgram(cacheKey, program);
    
    // Cache uniform and attribute locations
    this.cacheLocations(gl, program);
    
    return program;
  }

  /**
   * Cache a compiled program
   * @param {string} key 
   * @param {WebGLProgram} program 
   */
  cacheProgram(key, program) {
    // Check cache size limit
    if (this.programCache.size >= this.maxCacheSize) {
      this.evictLeastUsed();
    }
    
    this.programCache.set(key, program);
    this.usageCount.set(program, 1);
  }

  /**
   * Cache uniform and attribute locations for a program
   * @param {WebGLRenderingContext} gl 
   * @param {WebGLProgram} program 
   */
  cacheLocations(gl, program) {
    const uniforms = {};
    const attributes = {};
    
    // Get number of uniforms and attributes
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    const numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    
    // Cache uniform locations
    for (let i = 0; i < numUniforms; i++) {
      const uniform = gl.getActiveUniform(program, i);
      if (uniform) {
        uniforms[uniform.name] = gl.getUniformLocation(program, uniform.name);
      }
    }
    
    // Cache attribute locations
    for (let i = 0; i < numAttributes; i++) {
      const attribute = gl.getActiveAttrib(program, i);
      if (attribute) {
        attributes[attribute.name] = gl.getAttribLocation(program, attribute.name);
      }
    }
    
    this.uniformLocations.set(program, uniforms);
    this.attributeLocations.set(program, attributes);
  }

  /**
   * Get cached uniform location
   * @param {WebGLProgram} program 
   * @param {string} name 
   * @returns {WebGLUniformLocation}
   */
  getUniformLocation(program, name) {
    const uniforms = this.uniformLocations.get(program);
    return uniforms ? uniforms[name] : null;
  }

  /**
   * Get cached attribute location
   * @param {WebGLProgram} program 
   * @param {string} name 
   * @returns {number}
   */
  getAttributeLocation(program, name) {
    const attributes = this.attributeLocations.get(program);
    return attributes ? attributes[name] : -1;
  }

  /**
   * Evict least used program from cache
   */
  evictLeastUsed() {
    let leastUsedProgram = null;
    let minUsage = Infinity;
    
    for (const [program, usage] of this.usageCount) {
      if (usage < minUsage) {
        minUsage = usage;
        leastUsedProgram = program;
      }
    }
    
    if (leastUsedProgram) {
      this.removeProgram(leastUsedProgram);
    }
  }

  /**
   * Remove program from all caches
   * @param {WebGLProgram} program 
   */
  removeProgram(program) {
    // Find and remove from program cache
    for (const [key, cachedProgram] of this.programCache) {
      if (cachedProgram === program) {
        this.programCache.delete(key);
        break;
      }
    }
    
    // Remove from other caches
    this.uniformLocations.delete(program);
    this.attributeLocations.delete(program);
    this.usageCount.delete(program);
  }

  /**
   * Generate hash from string (simple hash function)
   * @param {string} str 
   * @returns {string}
   */
  generateHash(str) {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return hash.toString();
  }

  /**
   * Clear all cached programs
   * @param {WebGLRenderingContext} gl 
   */
  clear(gl) {
    // Delete WebGL programs
    for (const program of this.programCache.values()) {
      if (gl && gl.isProgram && gl.isProgram(program)) {
        gl.deleteProgram(program);
      }
    }
    
    // Clear all caches
    this.programCache.clear();
    this.uniformLocations.clear();
    this.attributeLocations.clear();
    this.usageCount.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object}
   */
  getStats() {
    return {
      programCount: this.programCache.size,
      totalUsage: Array.from(this.usageCount.values()).reduce((a, b) => a + b, 0),
      cacheHitRatio: this.calculateHitRatio(),
      memoryEstimate: this.estimateMemoryUsage()
    };
  }

  /**
   * Calculate cache hit ratio
   * @returns {number}
   */
  calculateHitRatio() {
    const totalUsage = Array.from(this.usageCount.values()).reduce((a, b) => a + b, 0);
    const uniquePrograms = this.usageCount.size;
    
    if (totalUsage === 0 || uniquePrograms === 0) return 0;
    
    return (totalUsage - uniquePrograms) / totalUsage;
  }

  /**
   * Estimate memory usage
   * @returns {number} - Estimated bytes
   */
  estimateMemoryUsage() {
    // Rough estimate: each program + locations ≈ 1KB
    return this.programCache.size * 1024;
  }
}

// Global shader cache instance
export const globalShaderCache = new ShaderCache();