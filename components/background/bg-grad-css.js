import { useThemeContext } from "../context/themeContext";

export default function BackgroundCssGrad() {
    const { currentTheme } = useThemeContext();
    const gradientType = currentTheme.data.heroCssGradient;
    
    // Get the gradient angle from theme and format it with "deg" suffix
    const angle = currentTheme.data.heroCssGradientAngle || 45;
    const gradientAngle = `${angle}deg`;

    // Get contrast and brightness values, defaulting to 100% if not set
    const contrast = currentTheme.data.imageTextureContrast || "100%";
    const brightness = currentTheme.data.imageTextureBrightness || "100%";
    const texture = currentTheme.data.imageTexture || "none";

    // Convert joystick x,y values to CSS percentage format for radial position
    const radialPosition = currentTheme.data.heroCssGradientRadialPosition;
    let cssRadialPosition;
    if (radialPosition && typeof radialPosition === 'object' && radialPosition.x !== undefined && radialPosition.y !== undefined) {
        cssRadialPosition = `${radialPosition.x}% ${radialPosition.y}%`;
    } else {
        // Fallback to center
        cssRadialPosition = '50% 50%';
    }

    // Use theme colors directly
    const startColor = currentTheme.data.gradStart || '#f9f9f9';
    const endColor = currentTheme.data.gradStop || '#1B1B1B';

    // Build complete background gradient string using theme colors
    let backgroundGradient = '';
    
    switch (gradientType) {
        case 'radial':
            backgroundGradient = `radial-gradient(ellipse at ${cssRadialPosition}, ${startColor} 0%, ${endColor} 62%, ${endColor} 100%)`;
            break;
        case 'linear':
            backgroundGradient = `linear-gradient(${gradientAngle}, ${startColor} 0%, ${endColor} 62%, ${endColor} 100%)`;
            break;
        case 'conic':
            backgroundGradient = `conic-gradient(from ${gradientAngle} at ${cssRadialPosition}, ${startColor}, ${endColor})`;
            break;
        default:
            backgroundGradient = `radial-gradient(ellipse at center, ${startColor} 0%, ${endColor} 62%, ${endColor} 100%)`;
    }

    console.log('🎯 Gradient Debug:', {
        radialPosition,
        cssRadialPosition,
        gradientType,
        startColor,
        endColor,
        backgroundGradient
    });

    // Complete inline style object
    const gradientStyle = {
        background: backgroundGradient,
        '--image-texture-contrast': contrast,
        '--image-texture-brightness': brightness,
        '--mix-blend-mode': currentTheme.data.mixBlendMode,
        filter: texture === 'noise' ? `contrast(${contrast}) brightness(${brightness})` : 'none'
    };

    // Simple class without gradient logic
    const baseClassName = texture === 'noise' 
        ? 'absolute top-0 left-0 w-full h-full grainy-gradient'
        : 'absolute top-0 left-0 w-full h-full';

    return (
        <div 
            className={baseClassName}
            style={gradientStyle}
        >
        </div>
    );
}
