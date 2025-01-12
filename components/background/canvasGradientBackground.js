import React, { useEffect, useRef, useState } from 'react';
import { useThemeContext } from '../context/themeContext';

export default function CanvasGradientBackground() {
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeContext();

  // Log the current theme for debugging

  // Define external color variables as hex
  const [colorTopHex, setColorTopHex] = useState(currentTheme?.data.gradStart || currentTheme.data.gradStart); // Default to white if undefined
  const [colorBottomHex, setColorBottomHex] = useState(currentTheme?.data.gradStop || currentTheme.data.gradStop); // Default to dark gray if undefined
  const [midPoint, setMidPoint] = useState(currentTheme?.data.gradMidPoint || 0.5); // Midpoint of the gradient (0 = bottom, 1 = top)

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r / 255, g / 255, b / 255]; // Normalize to [0, 1]
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main(void) {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment shader program with linear gradient only
    const fsSource = `
      precision mediump float;
      uniform vec2 canvasSize; // Uniform for canvas size
      uniform vec3 colorTop;    // Color at the top
      uniform vec3 colorBottom;  // Color at the bottom
      uniform float midPoint;    // Midpoint of the gradient

      void main(void) {
        // Normalize the fragment coordinates
        vec2 uv = gl_FragCoord.xy / canvasSize; // Use the canvas size uniform
        
        // Calculate the linear gradient based on the y-coordinate
        float gradientFactor = (uv.y - midPoint) * 2.0; // Scale to [0, 2] range
        gradientFactor = clamp(gradientFactor, 0.0, 1.0); // Clamp to [0, 1]

        // Create a vertical gradient using the top and bottom colors
        vec3 color = mix(colorBottom, colorTop, gradientFactor); // Interpolate between colors

        gl_FragColor = vec4(color, 1.0); // Set the fragment color
      }
    `;

    // Compile shader
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Create and link program
    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Set up the vertex positions
    const vertices = new Float32Array([
      -1.0,  1.0, // Top left
      -1.0, -1.0, // Bottom left
       1.0, -1.0, // Bottom right
       1.0,  1.0  // Top right
    ]);

    // Create a buffer for the vertex positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Bind the position buffer and enable the vertex attribute
    const position = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    // Use the shader program
    gl.useProgram(shaderProgram);

    // Get the uniform locations and set the canvas size
    const canvasSizeUniform = gl.getUniformLocation(shaderProgram, "canvasSize");
    gl.uniform2f(canvasSizeUniform, canvas.width, canvas.height);

    // Convert hex colors to RGB and set the uniforms
    const colorTop = hexToRgb(colorTopHex);
    const colorBottom = hexToRgb(colorBottomHex);
    
    const colorTopUniform = gl.getUniformLocation(shaderProgram, "colorTop");
    const colorBottomUniform = gl.getUniformLocation(shaderProgram, "colorBottom");
    const midPointUniform = gl.getUniformLocation(shaderProgram, "midPoint");
    
    gl.uniform3f(colorTopUniform, ...colorTop);    // Spread the array for colorTop
    gl.uniform3f(colorBottomUniform, ...colorBottom); // Spread the array for colorBottom
    gl.uniform1f(midPointUniform, midPoint); // Set the midpoint

    // Clear the canvas and draw
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    // Cleanup on component unmount
    return () => {
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [colorTopHex, colorBottomHex, midPoint, currentTheme]); // Re-run effect if colors, midpoint, or theme change

  // Update colors when currentTheme changes
  useEffect(() => {
    if (currentTheme) {
      setColorTopHex(currentTheme.data.gradStart || '#ffffff'); // Default to white if undefined
      setColorBottomHex(currentTheme.data.gradStop || '#333333'); // Default to dark gray if undefined
      setMidPoint(currentTheme.data.gradMidPoint || 0.5); // Default to dark gray if undefined

    }
  }, [currentTheme]); // Update colors when currentTheme changes

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}