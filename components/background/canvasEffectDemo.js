import React, { useState } from 'react';
import CanvasImageComponent from './canvasImageComponent';
import { ThemeProvider } from '../context/themeContext';

// Demo component to showcase the different effects
export default function CanvasEffectDemo() {
  // Define available effects
  const effects = [
    { name: 'Watercolor', value: 'watercolor' },
    { name: 'Noise', value: 'noise' },
    { name: 'Pixel', value: 'pixel' }
  ];
  
  // Define available colors
  const colors = [
    { name: 'Hot Pink', value: 'hotpink' },
    { name: 'Teal', value: '#00b3b3' },
    { name: 'Purple', value: '#8a2be2' },
    { name: 'Orange', value: '#ff8c00' },
    { name: 'Lime', value: '#32cd32' }
  ];
  
  // Define backgrounds
  const backgrounds = [
    { name: 'Blue', value: '#3386E0' },
    { name: 'Dark', value: '#121212' },
    { name: 'Light', value: '#f5f5f5' },
    { name: 'Warm', value: '#2c1a1d' }
  ];
  
  // State for theme settings
  const [themeSettings, setThemeSettings] = useState({
    canvasEffect: 'watercolor',
    effectColor: 'hotpink',
    backgroundColor: '#3386E0',
    
    // Watercolor specific
    effectScale: 9.0,
    effectColorLevels: 4.0,
    
    // Noise specific
    noiseScale: 5.0,
    noiseIntensity: 0.15,
    
    // Pixel specific
    pixelDensity: 20.0
  });
  
  // Create a theme object with the current settings
  const theme = {
    currentTheme: {
      data: themeSettings
    }
  };
  
  // Handle setting changes
  const handleSettingChange = (setting, value) => {
    setThemeSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  // Render specific controls based on active effect
  const renderEffectControls = () => {
    switch (themeSettings.canvasEffect) {
      case 'watercolor':
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Scale</label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="0.5"
                value={themeSettings.effectScale}
                onChange={(e) => handleSettingChange('effectScale', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs">{themeSettings.effectScale}</span>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Color Levels</label>
              <input 
                type="range" 
                min="2" 
                max="10" 
                step="1"
                value={themeSettings.effectColorLevels}
                onChange={(e) => handleSettingChange('effectColorLevels', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs">{themeSettings.effectColorLevels}</span>
            </div>
          </>
        );
      
      case 'noise':
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Noise Scale</label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="0.5"
                value={themeSettings.noiseScale}
                onChange={(e) => handleSettingChange('noiseScale', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs">{themeSettings.noiseScale}</span>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Noise Intensity</label>
              <input 
                type="range" 
                min="0.05" 
                max="0.5" 
                step="0.01"
                value={themeSettings.noiseIntensity}
                onChange={(e) => handleSettingChange('noiseIntensity', parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-xs">{themeSettings.noiseIntensity}</span>
            </div>
          </>
        );
      
      case 'pixel':
        return (
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Pixel Density</label>
            <input 
              type="range" 
              min="5" 
              max="50" 
              step="1"
              value={themeSettings.pixelDensity}
              onChange={(e) => handleSettingChange('pixelDensity', parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-xs">{themeSettings.pixelDensity}</span>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <ThemeProvider value={theme}>
      <div className="relative min-h-screen">
        {/* Canvas Background */}
        <CanvasImageComponent />
        
        {/* Control Panel */}
        <div className="absolute top-4 right-4 p-4 w-64 bg-white bg-opacity-80 rounded-lg shadow-lg">
          <h2 className="mb-4 text-lg font-bold">Canvas Effect Controls</h2>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Effect</label>
            <select 
              value={themeSettings.canvasEffect}
              onChange={(e) => handleSettingChange('canvasEffect', e.target.value)}
              className="p-2 w-full rounded border"
            >
              {effects.map((effect) => (
                <option key={effect.value} value={effect.value}>
                  {effect.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Color</label>
            <div className="grid grid-cols-5 gap-1">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleSettingChange('effectColor', color.value)}
                  className={`w-full h-8 rounded ${themeSettings.effectColor === color.value ? 'ring-2 ring-black' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Background</label>
            <div className="grid grid-cols-4 gap-1">
              {backgrounds.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => handleSettingChange('backgroundColor', bg.value)}
                  className={`w-full h-8 rounded ${themeSettings.backgroundColor === bg.value ? 'ring-2 ring-black' : ''}`}
                  style={{ backgroundColor: bg.value }}
                  title={bg.name}
                />
              ))}
            </div>
          </div>
          
          {/* Render effect-specific controls */}
          {renderEffectControls()}
          
          <div className="mt-6 text-xs text-gray-500">
            <p>These settings would normally be stored in your theme configuration.</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="container p-8 pt-24 mx-auto text-white">
          <h1 className="mb-4 text-4xl font-bold">Canvas Effects Demo</h1>
          <p className="mb-8 text-xl">
            Use the control panel to try different effects and settings.
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
} 