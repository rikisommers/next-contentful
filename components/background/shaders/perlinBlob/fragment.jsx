export const perlinBlobFragmentShader = `
varying float vQnoise;
varying float vNoise;

uniform float uTime;
uniform bool uRedhell;
uniform float uRcolor;
uniform float uGcolor;
uniform float uBcolor;
uniform vec3 uCoreColor;
uniform vec3 uEnergyColor;
uniform float uColorIntensity;

void main() {
  // Use noise to mix between theme colors
  float mixFactor = (vQnoise + 1.0) * 0.5; // Normalize noise to [0,1]

  // Base color mixing between gradient start and stop
  vec3 baseColor = mix(uCoreColor, uEnergyColor, mixFactor);

  // Apply original color modulation for variety
  float r, g, b;

  if (!uRedhell) {
    r = sin(vQnoise + uRcolor) * uColorIntensity;
    g = cos(vQnoise + uGcolor) * uColorIntensity;
    b = tan(vQnoise + uBcolor) * uColorIntensity;
  } else {
    r = cos(vQnoise + uRcolor) * uColorIntensity;
    g = sin(vQnoise + uGcolor) * uColorIntensity;
    b = cos(vQnoise + uBcolor) * uColorIntensity;
  }

  vec3 modulation = vec3(r, g, b);
  vec3 finalColor = baseColor + modulation * 0.3; // Blend theme colors with original effect

  gl_FragColor = vec4(finalColor, 1.0);
}
`;