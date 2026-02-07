import React, { useEffect, useRef, useState } from 'react';
import { useThemeContext } from '../context/themeContext';

export default function CanvasMorphingGradient({
  speed = 0.5
}) {
  const canvasRef = useRef(null);
  const { currentTheme } = useThemeContext();

  // Use theme colors or default colors
  const color1 = currentTheme?.data?.color1 || '#ff7f50';
  const color2 = currentTheme?.data?.color2 || '#6a5acd';
  const color3 = currentTheme?.data?.color3 || '#20b2aa';

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

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

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main(void) {
        gl_Position = aVertexPosition;
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 canvasSize;
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;

      void main(void) {
        vec2 uv = gl_FragCoord.xy / canvasSize;
        float offset = sin(time * 0.1) * 0.5 + 0.5;
        vec3 color = mix(color1, color2, uv.x + offset);
        color = mix(color, color3, uv.y + offset);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

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

    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    const vertices = new Float32Array([
      -1.0,  1.0,
      -1.0, -1.0,
       1.0, -1.0,
       1.0,  1.0
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    gl.useProgram(shaderProgram);

    const canvasSizeUniform = gl.getUniformLocation(shaderProgram, "canvasSize");
    gl.uniform2f(canvasSizeUniform, canvas.width, canvas.height);

    const color1Uniform = gl.getUniformLocation(shaderProgram, "color1");
    const color2Uniform = gl.getUniformLocation(shaderProgram, "color2");
    const color3Uniform = gl.getUniformLocation(shaderProgram, "color3");
    const timeUniform = gl.getUniformLocation(shaderProgram, "time");

    const hexToRgb = (hex) => {
      hex = hex.replace(/^#/, '');
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;
      return [r / 255, g / 255, b / 255];
    };

    gl.uniform3f(color1Uniform, ...hexToRgb(color1));
    gl.uniform3f(color2Uniform, ...hexToRgb(color2));
    gl.uniform3f(color3Uniform, ...hexToRgb(color3));

    const render = (time) => {
      gl.uniform1f(timeUniform, time * speed);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [color1, color2, color3, speed]);

  return (

      <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ position: 'fixed' }}
    />
  
  );
}