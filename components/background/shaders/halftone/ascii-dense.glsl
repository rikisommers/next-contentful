// ASCII Dense - High density characters for detailed rendering
uniform float pixelSize;
uniform sampler2D asciiTexture;
uniform vec2 charCount;
uniform bool showBackground;

// Dense character set: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"
// More characters = smoother gradients

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);
    
    vec2 cellUV = fract(uv / normalizedPixelSize);

    // Enhanced character mapping for smoother gradients
    float charIndex = clamp(
        floor(luma * (charCount.x * 1.5)),
        0.0,
        charCount.x - 1.0
    );
    
    vec2 asciiUV = vec2(
        (charIndex + cellUV.x) / charCount.x,
        cellUV.y
    );
  
    float character = texture2D(asciiTexture, asciiUV).r;

    // Enhance contrast for dense rendering
    float enhancedLuma = pow(luma, 0.9);
    
    vec3 backgroundColor = vec3(0.0);
    if (showBackground) {
        backgroundColor = color.rgb;
    }
    
    outputColor = vec4(character * vec3(1.0) * (enhancedLuma + 0.01) + backgroundColor, 1.0);
}

