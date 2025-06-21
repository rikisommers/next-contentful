'use client';
import { useThemeContext } from "../context/themeContext";

const Texture = ({children}) => {
    const { currentTheme } = useThemeContext();
    const texture = currentTheme.data.surfaceTexture;

    const renderTexture = () => {
        switch (texture) {
            case 'none':
                return null;
            
            case 'color':
                return (
                    <div 
                        className="inset-0 w-full h-full"
                        style={{ backgroundColor: 'var(--accent-pri)' }}
                    >
                        {children}
                    </div>
                );
            
            case 'metal':
                return (
                    <div className="inset-0 p-2 w-full h-full bg-gray-600 rounded-xl" >
                        {children}
                    </div>
                );
            
            case 'glass':
                return (
                    <div className="inset-0 p-2 w-full h-full rounded-xl backdrop-blur-md bg-white/30" >
                        {children}
                    </div>
                );
            
            case 'paper':
                return (
                    <div 
                        className="inset-0 w-full h-full opacity-40"
                        style={{
                            backgroundImage: `url('/texture/paper.svg')`,
                            backgroundRepeat: 'repeat',
                            backgroundSize: '100px 100px'
                        }}
                    >
                        {children}
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <div className="flex relative justify-center items-center w-full h-full">
            {renderTexture()}
        </div>
    );
}

export default Texture;