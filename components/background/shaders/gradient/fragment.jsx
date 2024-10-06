export const gradientFragmentShader = `
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
`