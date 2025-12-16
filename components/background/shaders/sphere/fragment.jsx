export const sphereFragmentShader = `

#define PI 3.1415926535897932384626433832795

uniform vec3 uCoreColor;
uniform vec3 uEnergyColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uTime;
uniform float uEnergyPulse;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDistortion;

// Cosine color palette function - CodeDrops technique
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  // Use the same noise value for color mixing
  float noiseValue = vDistortion;

  // Normalize noise from [-1,1] to [0,1] for color mixing
  float mixFactor = (noiseValue + 1.0) * 0.5;

  // Simple mix between gradient start and stop colors based on noise
  vec3 finalColor = mix(uCoreColor, uEnergyColor, mixFactor);

  gl_FragColor = vec4(finalColor, 1.0);
}

`