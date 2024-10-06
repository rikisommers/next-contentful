export const frag = `

// main.frag
precision highp float;

uniform sampler2D uTexture; // Texture input (html2canvas image)
uniform float uTime; // Time uniform for animation
uniform float uDistortion; // Distortion amount uniform
varying vec2 vUv; // UV coordinates from vertex shader

void main() {
  vec2 distortedUV = vUv + uDistortion * sin(uTime + vUv.xyx * 2.0);
  vec4 tex = texture2D(uTexture, distortedUV);
  gl_FragColor = tex;
}

}`