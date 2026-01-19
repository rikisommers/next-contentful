// ASCII Braille - Braille patterns for detailed texture
uniform float pixelSize;

// Braille patterns create fine-grained texture
// Uses dot patterns to represent luminance

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);
    
    vec2 cellUV = fract(uv / normalizedPixelSize);
    
    // Braille dot grid (2x4)
    vec2 dotGrid = floor(cellUV * vec2(2.0, 4.0));
    float dotIndex = dotGrid.y * 2.0 + dotGrid.x;
    
    // Determine which dots are lit based on luminance
    float threshold = dotIndex / 8.0;
    float dotLit = step(threshold, luma);
    
    // Create dot shape
    vec2 dotUV = fract(cellUV * vec2(2.0, 4.0));
    float dotDistance = distance(dotUV, vec2(0.5));
    float dot = 1.0 - smoothstep(0.2, 0.3, dotDistance);
    
    float braillePattern = dot * dotLit;
    
    vec3 finalColor = vec3(braillePattern) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

