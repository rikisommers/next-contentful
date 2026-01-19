// ASCII Matrix - Matrix-style falling characters
uniform float pixelSize;
uniform float time;

// Matrix characters - creates digital rain effect
// Random characters with vertical scanning effect

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);
    
    vec2 cellUV = fract(uv / normalizedPixelSize);
    vec2 cellID = floor(uv / normalizedPixelSize);
    
    // Pseudo-random character based on position
    float randomChar = fract(sin(dot(cellID, vec2(12.9898, 78.233))) * 43758.5453);
    
    // Vertical scanning effect
    float scanline = fract(cellID.y * 0.1 + time * 0.1);
    float scanIntensity = smoothstep(0.9, 1.0, scanline);
    
    // Create character glyph procedurally
    float charShape = 0.0;
    
    // Vertical bars
    if (cellUV.x > 0.3 && cellUV.x < 0.4) charShape += 0.5;
    if (cellUV.x > 0.6 && cellUV.x < 0.7) charShape += 0.5;
    
    // Horizontal bars based on random
    if (randomChar > 0.5 && cellUV.y > 0.4 && cellUV.y < 0.6) charShape += 0.5;
    
    charShape *= step(0.1, luma);
    
    // Matrix green color with scan effect
    vec3 matrixColor = vec3(0.0, 1.0, 0.3);
    vec3 glowColor = vec3(0.5, 1.0, 0.7);
    vec3 finalColor = mix(matrixColor, glowColor, scanIntensity) * charShape * luma;
    
    outputColor = vec4(finalColor, 1.0);
}

