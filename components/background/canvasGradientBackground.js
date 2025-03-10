import React, { useEffect, useRef, useState } from 'react';
import { useThemeContext } from '../context/themeContext';

export default function CanvasGradientBackground({ 
  gradientType = null, // 'linear' or 'conic'
  conicCenterX = null,
  conicCenterY = null,
  conicRotation = null
}) {
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeContext();

  // Define gradient variables - props take precedence over theme values
  const [colorTopHex, setColorTopHex] = useState(currentTheme?.data.gradStart || '#ffffff');
  const [colorBottomHex, setColorBottomHex] = useState(currentTheme?.data.gradStop || '#333333');
  const [midPoint, setMidPoint] = useState(33);
  
  // Use prop values if provided, otherwise fall back to theme values
  const [activeGradientType, setActiveGradientType] = useState(
    gradientType || currentTheme?.data.gradientType || 'linear'
  );
  
  const [conicCenter, setConicCenter] = useState([
    conicCenterX !== null ? conicCenterX : (currentTheme?.data.conicCenterX || 0.5), 
    conicCenterY !== null ? conicCenterY : (currentTheme?.data.conicCenterY || 0.5)
  ]);
  
  const [activeConicRotation, setActiveConicRotation] = useState(
     134
  );

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r / 255, g / 255, b / 255]; // Normalize to [0, 1]
  };

  // Update state when props change
  useEffect(() => {
    if (gradientType !== null) {
      // Validate that gradientType is either 'linear' or 'conic'
      if (gradientType === 'linear' || gradientType === 'conic') {
        setActiveGradientType(gradientType);
      } else {
        console.warn('Invalid gradientType prop. Must be "linear" or "conic".');
      }
    }
    
    if (conicCenterX !== null || conicCenterY !== null) {
      setConicCenter([
        conicCenterX !== null ? conicCenterX : conicCenter[0],
        conicCenterY !== null ? conicCenterY : conicCenter[1]
      ]);
    }
    
    if (conicRotation !== null) {
      setActiveConicRotation(conicRotation);
    }
  }, [gradientType, conicCenterX, conicCenterY, conicRotation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Set canvas size to match its display size
    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main(void) {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment shader program with support for both linear and conic gradients
    const fsSource = `
      precision mediump float;
      uniform vec2 canvasSize;
      uniform vec3 colorTop;
      uniform vec3 colorBottom;
      uniform float midPoint;
      uniform int gradientType; // 0 for linear, 1 for conic
      uniform vec2 conicCenter;
      uniform float conicRotation;

      void main(void) {
        // Normalize the fragment coordinates
        vec2 uv = gl_FragCoord.xy / canvasSize;
        vec3 color;
        
        if (gradientType == 0) {
          // Linear gradient
          float gradientFactor = (uv.y - midPoint) * 2.0;
          gradientFactor = clamp(gradientFactor, 0.0, 1.0);
          color = mix(colorBottom, colorTop, gradientFactor);
        } else {
          // Conic gradient
          vec2 centered = uv - conicCenter;
          float angle = atan(centered.y, centered.x) + conicRotation;
          // Normalize angle to [0, 1] range
          float normalizedAngle = (angle + 6.14159) / (1.0 * 3.14159);
          color = mix(colorBottom, colorTop, normalizedAngle);
        }
        
        gl_FragColor = vec4(color, 1.0);
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
    const gradientTypeUniform = gl.getUniformLocation(shaderProgram, "gradientType");
    const conicCenterUniform = gl.getUniformLocation(shaderProgram, "conicCenter");
    const conicRotationUniform = gl.getUniformLocation(shaderProgram, "conicRotation");
    
    gl.uniform3f(colorTopUniform, ...colorTop);
    gl.uniform3f(colorBottomUniform, ...colorBottom);
    gl.uniform1f(midPointUniform, midPoint);
    gl.uniform1i(gradientTypeUniform, activeGradientType === 'conic' ? 1 : 0);
    gl.uniform2f(conicCenterUniform, conicCenter[0], conicCenter[1]);
    gl.uniform1f(conicRotationUniform, activeConicRotation);

    // Clear the canvas and draw
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [colorTopHex, colorBottomHex, midPoint, activeGradientType, conicCenter, activeConicRotation]);

  // Update settings when currentTheme changes
  useEffect(() => {
    if (currentTheme) {
      setColorTopHex(currentTheme.data.gradStart || '#ffffff');
      setColorBottomHex(currentTheme.data.gradStop || '#333333');
      setMidPoint(currentTheme.data.gradMidPoint || 0.5);
      
      // Only update from theme if props aren't provided
      if (gradientType === null) {
        setActiveGradientType(currentTheme.data.gradientType || 'linear');
      }
      
      if (conicCenterX === null && conicCenterY === null) {
        setConicCenter([
          currentTheme.data.conicCenterX || 0.5,
          currentTheme.data.conicCenterY || 0.5
        ]);
      }
      
      
        setActiveConicRotation( 7.5);
      
    }
  }, [currentTheme, gradientType, conicCenterX, conicCenterY, conicRotation]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ position: 'fixed' }}
    />
  );
}