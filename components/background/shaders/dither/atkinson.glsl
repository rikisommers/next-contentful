// Atkinson Dithering (1984)
// Created by Bill Atkinson for the original Macintosh
// Distributes only 75% of error (6/8), creating higher contrast
// Error distribution: right(1/8), 2-right(1/8), below-left(1/8), below(1/8), below-right(1/8), 2-below(1/8)
precision highp float;

uniform float colorLevels;
uniform float pixelSize;

// Atkinson dithering matrix - creates crunchy, high-contrast look
const mat4x4 atkinsonMatrix = mat4x4(
    0.0,  6.0,  1.0, 7.0,
    9.0,  3.0,  11.0, 5.0,
    2.0,  8.0,  0.0, 6.0,
    10.0, 4.0,  9.0, 3.0
) / 12.0;

vec3 dither(vec2 uv, vec3 color, float cellScale) {
    ivec2 pixelCoord = ivec2(uv * resolution / cellScale);
    int x = pixelCoord.x % 4;
    int y = pixelCoord.y % 4;
    
    float threshold = atkinsonMatrix[y][x];
    
    // Atkinson's distinctive quality: only 75% error distribution
    vec3 dithered = color + (threshold - 0.5) * 0.25;
    
    // Quantize with higher contrast
    float levels = max(colorLevels, 2.0);
    dithered.r = floor(dithered.r * levels + 0.5) / levels;
    dithered.g = floor(dithered.g * levels + 0.5) / levels;
    dithered.b = floor(dithered.b * levels + 0.5) / levels;
    
    // Boost contrast for Atkinson's crunchy look
    dithered = pow(dithered, vec3(0.95));
    
    return clamp(dithered, 0.0, 1.0);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float cellScale = max(pixelSize, 1.0);
    vec2 cellSizeNorm = cellScale / resolution.xy;
    vec2 cellUv = cellSizeNorm * floor(uv / cellSizeNorm) + cellSizeNorm * 0.5;
    
    vec4 color = texture2D(inputBuffer, cellUv);
    color.rgb = dither(uv, color.rgb, cellScale);
    outputColor = color;
}

