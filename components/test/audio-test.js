"use client";

import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../context/themeContext';
import { useAudioControls } from '../navigation/audio-utils';

export default function AudioTest() {
  const { currentTheme } = useThemeContext();
  const { 
    playClick, 
    playBeepOn, 
    playBeepOff, 
    playPlink, 
    playDrip, 
    playMarimba 
  } = useAudioControls();
  
  const [audioStatus, setAudioStatus] = useState({
    enabled: currentTheme.data.audioEnabled,
    volume: currentTheme.data.audioVolume
  });

  // Update status when theme changes
  useEffect(() => {
    setAudioStatus({
      enabled: currentTheme.data.audioEnabled,
      volume: currentTheme.data.audioVolume
    });
  }, [currentTheme]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Audio Test Panel</h2>
      
      <div className="mb-4">
        <p className="font-semibold">Current Audio Settings:</p>
        <p>Audio Enabled: {audioStatus.enabled ? "Yes" : "No"}</p>
        <p>Volume: {audioStatus.volume}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={playClick}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Play Click
        </button>
        
        <button 
          onClick={playBeepOn}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Play Beep On
        </button>
        
        <button 
          onClick={playBeepOff}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Play Beep Off
        </button>
        
        <button 
          onClick={playPlink}
          className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Play Plink
        </button>
        
        <button 
          onClick={playDrip}
          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Play Drip
        </button>
        
        <button 
          onClick={playMarimba}
          className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Play Marimba
        </button>
      </div>
      
      <div className="mt-4 p-2 bg-gray-200 rounded">
        <p className="text-sm text-gray-700">
          Check the browser console for detailed logs about audio playback attempts.
          If you don't hear any sounds, it might be due to:
        </p>
        <ul className="list-disc pl-4 mt-2 text-sm text-gray-700">
          <li>Browser autoplay policies (try clicking a button first)</li>
          <li>Audio files not loading correctly</li>
          <li>Audio settings in the theme being disabled or volume set to 0</li>
          <li>Browser or system audio issues</li>
        </ul>
      </div>
    </div>
  );
} 