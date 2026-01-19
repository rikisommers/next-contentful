// ASCII Technical - Technical/monospace characters
uniform float pixelSize;
uniform sampler2D asciiTexture;
uniform vec2 charCount;
uniform bool showBackground;

// Technical characters: "01234567890ABCDEF"
// Creates a technical/hex dump aesthetic

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);
    
    vec2 cellUV = fract(uv / normalizedPixelSize);

    // Map to hex values (0-F)
    float charIndex = clamp(
        floor(luma * 16.0),
        0.0,
        15.0
    );
    
    vec2 asciiUV = vec2(
        (charIndex + cellUV.x) / 16.0,
        cellUV.y
    );
  
    float character = texture2D(asciiTexture, asciiUV).r;

    // Sharp, technical look
    float enhancedLuma = step(0.1, luma) * luma;
    
    vec3 backgroundColor = vec3(0.0);
    if (showBackground) {
        backgroundColor = color.rgb * 0.3;
    }
    
    outputColor = vec4(character * vec3(0.0, 1.0, 0.3) * enhancedLuma + backgroundColor, 1.0);
}

