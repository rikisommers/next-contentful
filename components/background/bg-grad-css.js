import { useThemeContext } from "../context/themeContext";
export default function BackgroundCssGrad() {

    const { currentTheme } = useThemeContext();
    const gradientType = currentTheme.data.heroCssGradient;
    
    // Get the gradient angle from theme and format it with "deg" suffix
    // Since the angle is always a number, we simply convert it to string and add "deg"
    const angle = currentTheme.data.heroCssGradientAngle || 45;
    const gradientAngle = `${angle}deg`;

    let backgroundStyle;
    switch (gradientType) {
        case 'linear':
            backgroundStyle = {
                background: `linear-gradient(${gradientAngle}, ${currentTheme.data.gradStart}, ${currentTheme.data.gradStop})`
            };
            break;
    
        case 'radial':
            backgroundStyle = {
                background: `radial-gradient(circle, ${currentTheme.data.gradStart}, ${currentTheme.data.gradStop})`
            };
            break;
        case 'conic':
            backgroundStyle = {
                background: `conic-gradient(from ${gradientAngle}, ${currentTheme.data.gradStart}, ${currentTheme.data.gradStop})`
            };
            break;
        default:
            backgroundStyle = {
                background: `linear-gradient(${gradientAngle}, ${currentTheme.data.gradStart}, ${currentTheme.data.gradStop})`
            };
    }

  return (
   <div className="absolute top-0 left-0 w-full h-full " 
   style={backgroundStyle}
   ></div>
  );
}