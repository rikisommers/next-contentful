// Stucki Dithering
// Similar to Jarvis-Judice-Ninke but with different weight distribution
// Creates smooth gradients with slightly more structure
precision highp float;

uniform float colorLevels;
uniform float pixelSize;

const mat4x4 stuckiMatrix = mat4x4(
    0.0,  7.0,  2.0,  9.0,
   10.0,  3.0, 11.0,  5.0,
    1.0,  8.0,  0.0,  7.0,
   12.0,  4.0, 10.0,  3.0
) / 13.0;

vec3 dither(vec2 uv, vec3 color, float cellScale) {
    ivec2 pixelCoord = ivec2(uv * resolution / cellScale);
    int x = pixelCoord.x % 4;
    int y = pixelCoord.y % 4;
    
    float threshold = stuckiMatrix[y][x];
    
    // Stucki's balanced error distribution
    vec3 dithered = color + (threshold - 0.5) * 0.18;
    
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

