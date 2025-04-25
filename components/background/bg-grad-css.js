import { useThemeContext } from "../context/themeContext";
export default function BackgroundCssGrad() {
    const { currentTheme } = useThemeContext();
    const gradientType = currentTheme.data.heroCssGradient;
    
    // Get the gradient angle from theme and format it with "deg" suffix
    const angle = currentTheme.data.heroCssGradientAngle || 45;
    const gradientAngle = `${angle}deg`;

    // Get contrast and brightness values, defaulting to 100% if not set
    // These values come from the theme editor's imageTextureContrast and imageTextureBrightness controls
    const contrast = currentTheme.data.imageTextureContrast || "100%";
    const brightness = currentTheme.data.imageTextureBrightness || "100%";
    const texture = currentTheme.data.imageTexture || "none";
  

    // Set CSS variables for the gradient
    const gradientStyle = {
        '--gradient-start': currentTheme.data.gradStart,
        '--gradient-end': currentTheme.data.gradStop,
        '--gradient-angle': gradientAngle,
        '--image-texture-contrast': contrast,
        '--image-texture-brightness': brightness,
        '--mix-blend-mode': currentTheme.data.mixBlendMode,
        'filter': texture === 'noise' ? `contrast(${contrast}) brightness(${brightness})` : 'none'
    };

    // Log the complete style object
   // console.log('Gradient Style Object:', gradientStyle);

    // Determine which gradient class to use
    let gradientClass = 'grainy-gradient--linear'; // default
    switch (gradientType) {
        case 'linear':
            gradientClass = 'grainy-gradient--linear';
            break;
        case 'radial':
            gradientClass = 'grainy-gradient--radial';
            break;
        case 'conic':
            gradientClass = 'grainy-gradient--conic';
            break;
        default:
            gradientClass = 'grainy-gradient--linear';
    }

    // Add the noise texture class only if texture is set to 'noise'
    const finalClassName = texture === 'noise' 
        ? `absolute top-0 left-0 w-full h-full grainy-gradient ${gradientClass}`
        : `absolute top-0 left-0 w-full h-full ${gradientClass}`;

    return (
        <div 
            className={finalClassName}
            style={gradientStyle}
        ></div>
    );
}