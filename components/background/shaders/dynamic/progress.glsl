uniform float progress;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

const float LEVELS = 5.0;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float basePixelSize = pow(2.0, LEVELS);
  float currentLevel = floor(progress * LEVELS);  

  float currentPixelSize = max(basePixelSize / pow(2.0, currentLevel), 1.0);

  float currentPixelsPerRow = ceil(resolution.x / currentPixelSize);
  float currentPixelsPerCol = ceil(resolution.y / currentPixelSize);
  float currentTotalPixels = currentPixelsPerRow * currentPixelsPerCol;
  
  float levelProgress = fract(progress * LEVELS) * currentTotalPixels;
  float currentRowInLevel = floor(levelProgress / currentPixelsPerRow);
  float currentPixelInRow = mod(levelProgress, currentPixelsPerRow);
  
  vec2 gridPos = floor(uv * resolution / currentPixelSize);
  float row = floor(currentPixelsPerCol - gridPos.y - 1.0);
  float posInRow = floor(gridPos.x);
  
  vec4 additionalColor = vec4(0.0, 0.0, 0.0, 1.0);
  vec2 finalUv;
  vec2 finalNormalizedPixelSize;
  
  if (currentPixelSize <= 1.0) {
    finalUv = uv;
    additionalColor = vec4(0.0);
  } else if (row < currentRowInLevel || (row == currentRowInLevel && posInRow <= currentPixelInRow)) {
    finalNormalizedPixelSize = currentPixelSize / resolution;
    vec2 uvPixel = finalNormalizedPixelSize * floor(uv / finalNormalizedPixelSize);
    finalUv = uvPixel;
    
    if (row == currentRowInLevel) {
      float rand = random(vec2(posInRow, row));
      float twinkle = sin(time * 10.0 + rand * 10.0) + 1.0;
      additionalColor = vec4(0.005) * (twinkle * 20.0);
        
    }
  } else {
    float finalPixelSize = currentPixelSize * 2.0;
    finalNormalizedPixelSize = finalPixelSize / resolution;
    vec2 uvPixel = finalNormalizedPixelSize * floor(uv / finalNormalizedPixelSize);
    finalUv = uvPixel;
  }

  vec4 color = texture2D(inputBuffer, finalUv);
  outputColor = color + additionalColor;
}
