import CanvasGradientBackground from "./canvasGradientBackground";
import { useThemeContext } from "../context/themeContext";

export default function BackgroundGrad() {

    const { currentTheme } = useThemeContext();

    return (
    <div
    className="flex absolute top-0 left-0 justify-end items-center w-full h-full pointer-events-none z-1"
  >
      <h1 className="fixed top-0 left-0 z-40 text-white">CNA GRad</h1>

    {currentTheme.data.heroBackgroundStyle === "gradient" && (
      <CanvasGradientBackground />
    )}
  
    
    </div>
  
    )
  }