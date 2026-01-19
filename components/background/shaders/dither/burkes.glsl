// Burkes Dithering
// Simplified version of Stucki with fewer neighbors
// Good balance between speed and quality
precision highp float;

uniform float colorLevels;

const mat4x4 burkesMatrix = mat4x4(
    0.0,  8.0,  4.0, 12.0,
   14.0,  2.0, 10.0,  6.0,
    1.0,  9.0,  5.0, 13.0,
   15.0,  3.0, 11.0,  7.0
) / 16.0;

vec3 dither(vec2 uv, vec3 color) {
    ivec2 pixelCoord = ivec2(uv * resolution);
    int x = pixelCoord.x % 4;
    int y = pixelCoord.y % 4;
    
    float threshold = burkesMatrix[y][x];
    
    // Balanced error distribution
    vec3 dithered = color + (threshold - 0.5) * 0.16;
    
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

