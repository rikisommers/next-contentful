export const gradientVertexShader = `
    attribute vec4 aVertexPosition;
    void main(void) {
      gl_Position = aVertexPosition;
    }
`