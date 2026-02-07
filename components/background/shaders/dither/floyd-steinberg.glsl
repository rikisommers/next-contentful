// Floyd-Steinberg Dithering (1976)
// Classic error diffusion algorithm
// Distributes error to: right(7/16), below-left(3/16), below(5/16), below-right(1/16)
precision highp float;

uniform float colorLevels;
uniform float pixelSize;

// Simplified Floyd-Steinberg using ordered dithering approximation
// True error diffusion requires sequential processing, not possible in parallel shaders
// This creates a similar visual effect using a specialized matrix

const mat4x4 floydSteinbergMatrix = mat4x4(
    0.0,  8.0,  2.0, 10.0,
    12.0, 4.0,  14.0, 6.0,
    3.0,  11.0, 1.0, 9.0,
    15.0, 7.0,  13.0, 5.0
) / 16.0;

vec3 dither(vec2 uv, vec3 color, float cellScale) {
    ivec2 pixelCoord = ivec2(uv * resolution / cellScale);
    int x = pixelCoord.x % 4;
    int y = pixelCoord.y % 4;
    
    float threshold = floydSteinbergMatrix[y][x];
    
    // Apply threshold to create error diffusion effect
    vec3 dithered = color + (threshold - 0.5) * 0.15;
    
    // Quantize to color levels
    float levels = max(colorLevels, 2.0);
    dithered.r = floor(dithered.r * levels + 0.5) / levels;
    dithered.g = floor(dithered.g * levels + 0.5) / levels;
    dithered.b = floor(dithered.b * levels + 0.5) / levels;
    
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

