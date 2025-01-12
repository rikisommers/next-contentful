// audio-utils.js
import { useState} from 'react';
import { useThemeContext } from '../context/themeContext';

// Initialize audio references
const initializeAudioRefs = () => {
  if (typeof window !== "undefined") {
    return {
      click: new Audio("/audio/click_04.wav"),
      beepOn: new Audio("/audio/beep_short_on.wav"),
      beepOff: new Audio("/audio/beep_short_off.wav"),
      plink: new Audio("/audio/digi_plink.wav"),
      drip: new Audio("/audio/pop_drip.wav"),
      marimba: new Audio("/audio/music_marimba_chord.wav"),
    };
  }
  return {};
};

// Play audio function
const playAudio = (audioRef, volume, isAudioOn) => {

    console.log('play audio',volume, isAudioOn)

    if (audioRef && isAudioOn) {
      try {
        audioRef.volume = volume ? volume : 0;
        audioRef.currentTime = 0;
        audioRef.play();
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };
  
  // Update volume function
  export const updateVolume = (audioRefs, volume) => {
    
    Object.values(audioRefs).forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
    

  };
  

// Toggle audio function
export const toggleAudio = (audioRefs, isAudioOn) => {
    Object.values(audioRefs).forEach((audio) => {
      if (audio) {
        audio.muted = !isAudioOn;
      }
    });
  };

// Custom hook to manage audio controls
export const useAudioControls = () => {
    const { currentTheme } = useThemeContext();
    const [audioRefs, setAudioRefs] = useState(initializeAudioRefs());
  //console.log('use  audio',currentTheme)

  
  return {
    audioRefs,
    playClick: () => playAudio(audioRefs.click, currentTheme.data.volume, currentTheme.data.audio),
    playBeepOn: () => playAudio(audioRefs.beepOn, currentTheme.data.volume, currentTheme.data.audio),
    playBeepOff: () => playAudio(audioRefs.beepOff, currentTheme.data.volume, currentTheme.data.audio),
    playPlink: () => playAudio(audioRefs.plink, currentTheme.data.volume, currentTheme.data.audio),
    playDrip: () => playAudio(audioRefs.drip, currentTheme.data.volume, currentTheme.data.audio),
    playMarimba: () => playAudio(audioRefs.marimba, currentTheme.data.volume, currentTheme.data.audio),
  };
};
