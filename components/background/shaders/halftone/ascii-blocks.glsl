// ASCII Blocks - Block drawing characters for mosaic effect
uniform float pixelSize;

// Block characters: " ░▒▓█"
// Creates a mosaic/pixelated look

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);
    
    vec2 cellUV = fract(uv / normalizedPixelSize);

    // Block density based on luminance
    float blockDensity = floor(luma * 4.0) / 4.0;
    
    // Create block pattern
    float blockPattern = 0.0;
    
    if (blockDensity < 0.25) {
        // Empty/sparse pattern
        blockPattern = 0.0;
    } else if (blockDensity < 0.5) {
        // Light pattern (░)
        blockPattern = (mod(floor(cellUV.x * 4.0) + floor(cellUV.y * 4.0), 2.0) < 1.0) ? 0.3 : 0.0;
    } else if (blockDensity < 0.75) {
        // Medium pattern (▒)
        blockPattern = (mod(floor(cellUV.x * 2.0) + floor(cellUV.y * 2.0), 2.0) < 1.0) ? 0.6 : 0.3;
    } else {
        // Full block (█)
        blockPattern = 1.0;
    }
    
    vec3 finalColor = vec3(blockPattern) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

