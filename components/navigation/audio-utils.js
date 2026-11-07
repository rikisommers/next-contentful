// audio-utils.js
import { useState} from 'react';
import { useThemeContext } from '../context/themeContext';

const SOUND_FILES = {
  click: "/audio/click_04.wav",
  beepOn: "/audio/beep_short_on.wav",
  beepOff: "/audio/beep_short_off.wav",
  plink: "/audio/digi_plink.wav",
  drip: "/audio/pop_drip.wav",
  marimba: "/audio/music_marimba_chord.wav",
};

let sharedAudioRefs = null;

// Created once and shared. preload="none" means nothing is downloaded until a sound is played.
const initializeAudioRefs = () => {
  if (typeof window === "undefined") return {};
  if (!sharedAudioRefs) {
    sharedAudioRefs = Object.fromEntries(
      Object.entries(SOUND_FILES).map(([name, src]) => {
        const audio = new Audio();
        audio.preload = "none";
        audio.src = src;
        return [name, audio];
      })
    );
  }
  return sharedAudioRefs;
};

// Play audio function
export const playAudio = (audioRef, volume, isAudio) => {
    if (audioRef && isAudio) {
      try {
        audioRef.volume = volume ? volume : 0;
        audioRef.currentTime = 0;
        
        // Handle browser autoplay policy
        const playPromise = audioRef.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Autoplay was prevented - this is normal on first page load
            if (error.name === 'NotAllowedError') {
            } else {
              console.error("Error playing audio:", error);
            }
          });
        }
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
    const [audioRefs, setAudioRefs] = useState(initializeAudioRefs);
  //console.log('use  audio',currentTheme)

  
  return {
    audioRefs,
    playClick: () => playAudio(audioRefs.click, currentTheme.data.audioVolume, currentTheme.data.audioEnabled),
    playBeepOn: () => playAudio(audioRefs.beepOn, currentTheme.data.audioVolume, currentTheme.data.audioEnabled),
    playBeepOff: () => playAudio(audioRefs.beepOff, currentTheme.data.audioVolume, currentTheme.data.audioEnabled),
    playPlink: () => playAudio(audioRefs.plink, currentTheme.data.audioVolume, currentTheme.data.audioEnabled),
    playDrip: () => playAudio(audioRefs.drip, currentTheme.data.audioVolume, currentTheme.data.audioEnabled),
    playMarimba: () => playAudio(audioRefs.marimba, currentTheme.data.audioVolume, currentTheme.data.audioEnabled),
  };
};
