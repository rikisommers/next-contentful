import React, { useEffect, useRef } from 'react';

const CanvasAnimatedGradient = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');

    // Vertex shader source
    const vsSource = `
      precision mediump float; // Specify precision for WebGL 1.0

      attribute vec4 position; // Use 'attribute' instead of 'in'

      void main() {
        gl_Position = position;
      }
    `;

    // Fragment shader source
    const fsSource = `
      precision mediump float;

      out vec4 fragColor; // Declare fragColor as an output variable

      uniform float iTime;
      const vec2 iResolution = vec2(512.0, 512.0);

      const int numGradients = 10; // Define the size of the arrays
      vec4 colors[numGradients]; // Declare the array

      void initializeColors() {
          colors[0] = vec4(.604, .816, 1.00, .7);
          colors[1] = vec4(.125, .310, .725, .7);
          colors[2] = vec4(.482, .357, .784, .7);
          colors[3] = vec4(.580, .702, .988, .7);
          colors[4] = vec4(.161, .302, .827, .7);
          colors[5] = vec4(.137, .467, .729, .7);
          colors[6] = vec4(.114, .686, .925, .7);
          colors[7] = vec4(.216, .412, .745, .7);
          colors[8] = vec4(.616, .792, .992, .7);
          colors[9] = vec4(.353, .906, .992, .7);
      }

      struct RadialGradient {
          float radius;
          vec4 color;
          vec2 point;
      };

      RadialGradient gradients[numGradients]; // Declare the array

      void main() {
          // Initialize colors
          initializeColors();

          // Initialize gradients here (similar to your original logic)
          gradients[0] = RadialGradient(1.0, colors[0], vec2(0.5 * iResolution.x * sin(.13 * iTime - 0.44), 0.5 * iResolution.y * sin(.34 * iTime - 2.41)));
          // Repeat for other gradients...

          vec3 color = vec3(0.0);

          for (int i = 0; i < numGradients; ++i) {
              color = mix(
                  gradients[i].color.rgb,
                  color,
                  gradients[i].color.a * distance(gradients[i].point, gl_FragCoord.xy) / (max(iResolution.x, iResolution.y) * gradients[i].radius)
              );
          }

          fragColor = vec4(color, 1.0); // Set the output color
      }
    `;

    // Compile vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('Vertex shader compilation error: ' + gl.getShaderInfoLog(vertexShader));
    }

    // Compile fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Fragment shader compilation error: ' + gl.getShaderInfoLog(fragmentShader));
    }

    // Create and link program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to link the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    }

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
    const position = gl.getAttribLocation(shaderProgram, 'position');
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    // Use the shader program
    gl.useProgram(shaderProgram);

    // Set the viewport and clear the canvas
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render loop
    const render = (time) => {
      gl.uniform1f(gl.getUniformLocation(shaderProgram, 'iTime'), time * 0.001);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    // Cleanup on component unmount
    return () => {
      gl.deleteProgram(shaderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default CanvasAnimatedGradient;