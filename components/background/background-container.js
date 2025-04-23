import CanvasGradientBackground from "./canvasGradientBackground";
import { useThemeContext } from "../context/themeContext";

export default function BackgroundGrad() {

    const { currentTheme } = useThemeContext();

    return (
    <div
    className="absolute top-0 left-0 flex items-center justify-end w-full h-full pointer-events-none z-1"
  >
  
    {currentTheme.data.heroBackgroundStyle === "gradient" && (
      <CanvasGradientBackground />
    )}
  
    
    </div>
  
    )
  }