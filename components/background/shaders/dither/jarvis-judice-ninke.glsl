// Jarvis-Judice-Ninke Dithering (1976)
// Distributes error to 12 neighbors across 3 rows
// Creates ultra-smooth gradients with minimal artifacts
precision highp float;

uniform float colorLevels;

// JJN uses larger error distribution for smoother results
const float jjnMatrix8x8[64] = float[64](
    0.0/ 48.0, 32.0/ 48.0, 16.0/ 48.0, 40.0/ 48.0,  8.0/ 48.0, 36.0/ 48.0, 20.0/ 48.0, 44.0/ 48.0,
   24.0/ 48.0,  4.0/ 48.0, 28.0/ 48.0, 12.0/ 48.0, 30.0/ 48.0,  6.0/ 48.0, 34.0/ 48.0, 14.0/ 48.0,
   10.0/ 48.0, 38.0/ 48.0,  2.0/ 48.0, 42.0/ 48.0, 18.0/ 48.0, 46.0/ 48.0, 22.0/ 48.0, 26.0/ 48.0,
   35.0/ 48.0, 15.0/ 48.0, 43.0/ 48.0, 19.0/ 48.0, 47.0/ 48.0, 23.0/ 48.0, 27.0/ 48.0,  7.0/ 48.0,
    3.0/ 48.0, 33.0/ 48.0, 17.0/ 48.0, 41.0/ 48.0,  9.0/ 48.0, 37.0/ 48.0, 21.0/ 48.0, 45.0/ 48.0,
   25.0/ 48.0,  5.0/ 48.0, 29.0/ 48.0, 13.0/ 48.0, 31.0/ 48.0,  7.0/ 48.0, 35.0/ 48.0, 15.0/ 48.0,
   11.0/ 48.0, 39.0/ 48.0,  1.0/ 48.0, 43.0/ 48.0, 19.0/ 48.0, 47.0/ 48.0, 23.0/ 48.0, 27.0/ 48.0,
   36.0/ 48.0, 16.0/ 48.0, 44.0/ 48.0, 20.0/ 48.0, 48.0/ 48.0, 24.0/ 48.0, 28.0/ 48.0,  8.0/ 48.0
);

vec3 dither(vec2 uv, vec3 color) {
    int x = int(uv.x * resolution.x) % 8;
    int y = int(uv.y * resolution.y) % 8;
    float threshold = jjnMatrix8x8[y * 8 + x];
    
    // Smooth error distribution
    vec3 dithered = color + (threshold - 0.5) * 0.12;
    
    // Quantize to color levels
    float levels = max(colorLevels, 2.0);
    dithered.r = floor(dithered.r * levels + 0.5) / levels;
    dithered.g = floor(dithered.g * levels + 0.5) / levels;
    dithered.b = floor(dithered.b * levels + 0.5) / levels;
    
    return clamp(dithered, 0.0, 1.0);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 color = texture2D(inputBuffer, uv);
    color.rgb = dither(uv, color.rgb);
    outputColor = color;
}

