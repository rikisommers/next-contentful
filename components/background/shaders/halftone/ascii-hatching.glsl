// ASCII Hatching - Cross-hatching pattern for artistic look
uniform float pixelSize;

// Hatching patterns: /, \, X, #
// Creates hand-drawn pencil sketch effect

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);
    
    vec2 cellUV = fract(uv / normalizedPixelSize);
    
    // Line thickness and spacing
    float lineThickness = 0.1;
    float lineSpacing = 0.25;
    
    // Create different hatching patterns based on luminance
    float pattern = 0.0;
    
    // Diagonal lines (/)
    float diag1 = fract((cellUV.x + cellUV.y) / lineSpacing);
    float line1 = smoothstep(lineThickness, 0.0, abs(diag1 - 0.5) - 0.3);
    
    // Diagonal lines (\)
    float diag2 = fract((cellUV.x - cellUV.y) / lineSpacing);
    float line2 = smoothstep(lineThickness, 0.0, abs(diag2 - 0.5) - 0.3);
    
    // Horizontal lines
    float horiz = fract(cellUV.y / lineSpacing);
    float line3 = smoothstep(lineThickness, 0.0, abs(horiz - 0.5) - 0.3);
    
    // Vertical lines
    float vert = fract(cellUV.x / lineSpacing);
    float line4 = smoothstep(lineThickness, 0.0, abs(vert - 0.5) - 0.3);
    
    // Combine hatching based on luminance (darker = more hatching)
    float darkness = 1.0 - luma;
    
    if (darkness > 0.75) {
        // Very dark: cross-hatch + horizontal + vertical
        pattern = max(max(line1, line2), max(line3, line4));
    } else if (darkness > 0.5) {
        // Dark: cross-hatch
        pattern = max(line1, line2);
    } else if (darkness > 0.25) {
        // Medium: single diagonal
        pattern = line1;
    } else {
        // Light: minimal hatching
        pattern = line1 * 0.3;
    }
    
    vec3 finalColor = vec3(pattern) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

