// Halftone Newspaper - Classic CMYK-style print with angle
uniform float pixelSize;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 normalizedPixelSize = pixelSize / resolution;
    vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
    vec4 color = texture2D(inputBuffer, uvPixel);

    float luma = dot(vec3(0.299, 0.587, 0.114), color.rgb);

    vec2 cellUV = fract(uv / normalizedPixelSize);
    
    // Rotate the UV by 45 degrees for newspaper effect
    float angle = 0.785398; // 45 degrees in radians
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedUV = rotation * (cellUV - 0.5) + 0.5;
    
    // Dot size based on luminance
    float radius = luma * 0.5;
    vec2 circleCenter = vec2(0.5);

    float distanceFromCenter = distance(rotatedUV, circleCenter);
    float circleMask = smoothstep(radius + 0.05, radius, distanceFromCenter);
    
    // Add slight variation to simulate print imperfection
    float noise = fract(sin(dot(uvPixel, vec2(12.9898, 78.233))) * 43758.5453);
    circleMask *= mix(0.95, 1.0, noise);
    
    vec3 finalColor = vec3(circleMask) * color.rgb;
    outputColor = vec4(finalColor, 1.0);
}

