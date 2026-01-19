// Halftone Squares - Square grid pattern
uniform float pixelSize;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);

    vec2 cellUV = fract(uv / normalizedPixelSize);
    
    // Square size based on luminance
    float size = luma * 0.9;
    vec2 squareCenter = vec2(0.5);
    
    vec2 distFromCenter = abs(cellUV - squareCenter);
    float maxDist = max(distFromCenter.x, distFromCenter.y);
    
    float squareMask = 1.0 - smoothstep(size * 0.5 - 0.05, size * 0.5, maxDist);
    
    vec3 finalColor = vec3(squareMask) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

