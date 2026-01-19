// ASCII Minimal - Simple character set for bold, clean look
uniform float pixelSize;
uniform sampler2D asciiTexture;
uniform vec2 charCount;
uniform bool showBackground;

// Minimal character set: " .o0@"
// Simple and bold

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);
    
    vec2 cellUV = fract(uv / normalizedPixelSize);

    // Simplified character mapping for minimal look
    float charIndex = clamp(
        floor(luma * 4.0),
        0.0,
        3.0
    );
    
    vec2 asciiUV = vec2(
        (charIndex + cellUV.x) / 4.0,
        cellUV.y
    );
  
    float character = texture2D(asciiTexture, asciiUV).r;

    // High contrast for minimal aesthetic
    float enhancedLuma = smoothstep(0.2, 0.8, luma);
    
    vec3 backgroundColor = vec3(0.0);
    if (showBackground) {
        backgroundColor = color.rgb;
    }
    
    outputColor = vec4(character * vec3(1.0) * (enhancedLuma + 0.1) + backgroundColor, 1.0);
}

