// audio-utils.js
import { useEffect, useState } from 'react';
import { useControls } from 'leva';

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
const playAudio = (audioRef, volume) => {
  if (audioRef) {
    try {
      audioRef.volume = volume;
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
  const [audioRefs, setAudioRefs] = useState(initializeAudioRefs());
  const [isAudioOn, setIsAudioOn] = useState(true);
  const { volume } = useControls('Audio', {
    volume: { value: 0.2, min: 0, max: 1, step: 0.01 },
    'Audio On': {
      value: isAudioOn,
      onChange: (value) => {
        setIsAudioOn(value);
        toggleAudio(audioRefs, value);
      },
    },
  });

  useEffect(() => {
    updateVolume(audioRefs, volume);
  }, [volume, audioRefs]);

  return {
    audioRefs,
    isAudioOn,
    setIsAudioOn,
    volume,
    updateVolume,
    playClick: () => playAudio(audioRefs.click, volume),
    playBeepOn: () => playAudio(audioRefs.beepOn, volume),
    playBeepOff: () => playAudio(audioRefs.beepOff, volume),
    playPlink: () => playAudio(audioRefs.plink, volume),
    playDrip: () => playAudio(audioRefs.drip, volume),
    playMarimba: () => playAudio(audioRefs.marimba, volume),
  };
};
