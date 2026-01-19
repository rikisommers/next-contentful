// Sierra Lite Dithering
// Simplified, minimal Sierra filter
// Fast performance with clean results
precision highp float;

uniform float colorLevels;

const mat4x4 sierraLiteMatrix = mat4x4(
    0.0,  2.0,  0.0,  2.0,
    1.0,  0.0,  1.0,  0.0,
    0.0,  2.0,  0.0,  2.0,
    1.0,  0.0,  1.0,  0.0
) / 4.0;

vec3 dither(vec2 uv, vec3 color) {
    ivec2 pixelCoord = ivec2(uv * resolution);
    int x = pixelCoord.x % 4;
    int y = pixelCoord.y % 4;
    
    float threshold = sierraLiteMatrix[y][x];
    
    vec3 dithered = color + (threshold - 0.5) * 0.1;
    
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

