precision highp float;
uniform sampler2D noise;
uniform float bias;

vec3 blueNoiseDither(vec2 uv, float lum) {
  vec3 color = vec3(0.0);

  float threshold = texture2D(noise, gl_FragCoord.xy / 128.0).r;

  if (lum < threshold + bias) {
      color = vec3(0.0);
  } else {
      color = vec3(1.0); 
  }

  return color;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec4 color = texture2D(inputBuffer, uv);

  float lum = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);
  color.rgb = blueNoiseDither(uv, lum);

  outputColor = color;
}