// Halftone Lines - Horizontal line pattern
uniform float pixelSize;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);

    vec2 cellUV = fract(uv / normalizedPixelSize);
    
    // Line thickness based on luminance
    float lineThickness = luma * 0.8;
    
    // Horizontal lines
    float lineY = fract(cellUV.y * 4.0);
    float lineMask = smoothstep(0.5 - lineThickness * 0.5, 0.5 - lineThickness * 0.5 + 0.1, lineY) - 
                     smoothstep(0.5 + lineThickness * 0.5 - 0.1, 0.5 + lineThickness * 0.5, lineY);
    
    vec3 finalColor = vec3(lineMask) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

