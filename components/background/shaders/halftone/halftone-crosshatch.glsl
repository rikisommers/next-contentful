// Halftone Crosshatch - Intersecting line pattern
uniform float pixelSize;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);

    vec2 cellUV = fract(uv / normalizedPixelSize);
    
    // Line spacing based on luminance
    float spacing = 0.2;
    float thickness = 0.05;
    
    // Horizontal lines
    float horizLine = abs(fract(cellUV.y / spacing) - 0.5);
    float horizMask = 1.0 - smoothstep(thickness, thickness + 0.02, horizLine);
    
    // Vertical lines
    float vertLine = abs(fract(cellUV.x / spacing) - 0.5);
    float vertMask = 1.0 - smoothstep(thickness, thickness + 0.02, vertLine);
    
    // Combine based on luminance
    float pattern = 0.0;
    if (luma < 0.33) {
        pattern = max(horizMask, vertMask);
    } else if (luma < 0.66) {
        pattern = horizMask;
    } else {
        pattern = horizMask * 0.5;
    }
    
    vec3 finalColor = vec3(pattern) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

