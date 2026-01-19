// Halftone Dots - Classic newspaper print effect
uniform float pixelSize;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);

    vec2 cellUV = fract(uv / normalizedPixelSize);

    // Dot size based on luminance
    float radius = luma * 0.5;
    vec2 circleCenter = vec2(0.5);

    float distanceFromCenter = distance(cellUV, circleCenter);
    float circleMask = smoothstep(radius + 0.05, radius, distanceFromCenter);
    
    vec3 finalColor = vec3(circleMask) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

