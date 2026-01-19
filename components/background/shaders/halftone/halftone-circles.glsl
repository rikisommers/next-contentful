// Halftone Circles - Concentric circle pattern
uniform float pixelSize;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);

    vec2 cellUV = fract(uv / normalizedPixelSize);
    vec2 circleCenter = vec2(0.5);

    float distanceFromCenter = distance(cellUV, circleCenter);
    
    // Create concentric circles based on distance
    float circles = fract(distanceFromCenter / 0.1);
    float circlePattern = smoothstep(0.4, 0.6, circles);
    
    // Modulate by luminance
    float pattern = mix(circlePattern, 1.0, luma);
    
    vec3 finalColor = vec3(pattern) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

