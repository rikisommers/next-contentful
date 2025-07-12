uniform float pixelSize;
uniform sampler2D asciiTexture;
uniform vec2 charCount;
uniform bool showBackground;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    vec2 pix = uv * resolution.xy;

    float luma = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);
    vec2 cellUV = fract(uv / normalizedPixelSize);

    float charIndex = clamp(
        floor(luma * (charCount.x - 1.0)),
        0.0,
        charCount.x - 1.0
    );
    
    vec2 asciiUV = vec2(
        (charIndex + cellUV.x) / charCount.x,
        cellUV.y
    );
  
    float character = texture2D(asciiTexture, asciiUV).r;

    vec3 backgroundColor = vec3(0.0, 0.0, 0.0);
    if (showBackground) {
        backgroundColor = color.rgb;
    }
    outputColor = vec4(character * vec3(1.0) * (luma + 0.01) + backgroundColor, 1.0);
    
}


// uniform float pixelSize;
// uniform sampler2D asciiTexture;
// uniform vec2 charCount;
// uniform bool showBackground;
// uniform vec3 textColor;
// uniform vec3 backgroundColor;

// void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
//     vec2 normalizedPixelSize = pixelSize / resolution;
//     vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
//     vec4 color = texture2D(inputBuffer, uvPixel);

//     float luma = dot(vec3(0.2126, 0.7152, 0.0722), color.rgb);
    
//     // Detect if this pixel contains the model vs background
//     // Check if the color is significantly different from background
//     float backgroundLuma = dot(vec3(0.2126, 0.7152, 0.0722), backgroundColor);
//     float colorDifference = abs(luma - backgroundLuma);
//     float isModel = step(0.1, colorDifference); // Threshold to detect model vs background
    
//     // Only apply ASCII effect where the model is visible
//     if (isModel > 0.5) {
//         vec2 cellUV = fract(uv / normalizedPixelSize);

//         float charIndex = clamp(
//             floor(luma * (charCount.x - 1.0)),
//             0.0,
//             charCount.x - 1.0
//         );
        
//         vec2 asciiUV = vec2(
//             (charIndex + cellUV.x) / charCount.x,
//             cellUV.y
//         );
      
//         float character = texture2D(asciiTexture, asciiUV).r;
//         float characterMask = character * (luma + 0.01);
        
//         if (showBackground) {
//             // Show original model color where characters would be, theme color elsewhere
//             vec3 finalColor = mix(backgroundColor, color.rgb, characterMask);
//             outputColor = vec4(finalColor, 1.0);
//         } else {
//             // Show ASCII cutout effect only on model areas
//             vec3 finalColor = mix(textColor, backgroundColor, characterMask);
//             outputColor = vec4(finalColor, 1.0);
//         }
//     } else {
//         // Background areas: just use background color, no ASCII
//         outputColor = vec4(backgroundColor, 1.0);
//     }
// }
