import { useEffect, useState } from 'react';
import { useControls } from 'leva';

export const useAudioControls = () => {
  const [audioRefs, setAudioRefs] = useState({
    click: null,
    beepOn: null,
    beepOff: null,
    plink: null,
    drip: null,
    marimba: null,
  });

  const { volume } = useControls('Audio', {
    volume: { value: 0.2, min: 0, max: 1, step: 0.01 }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudioRefs({
        click: new Audio('/audio/click_04.wav'),
        beepOn: new Audio('/audio/beep_short_on.wav'),
        beepOff: new Audio('/audio/beep_short_off.wav'),
        plink: new Audio('/audio/digi_plink.wav'),
        drip: new Audio('/audio/pop_drip.wav'),
        marimba: new Audio('/audio/music_marimba_chord.wav'),
      });
    }
  }, []);

  const playAudio = (audioRef) => {
    if (audioRef) {
      try {
        audioRef.volume = volume;
        audioRef.currentTime = 0;
        audioRef.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  useEffect(() => {
    const updateVolume = () => {
      Object.values(audioRefs).forEach(audio => {
        if (audio) {
          audio.volume = volume;
        }
      });
    };

    updateVolume();
  }, [volume, audioRefs]);

  return {
    playClick: () => playAudio(audioRefs.click),
    playBeepOn: () => playAudio(audioRefs.beepOn),
    playBeepOff: () => playAudio(audioRefs.beepOff),
    playPlink: () => playAudio(audioRefs.plink),
    playDrip: () => playAudio(audioRefs.drip),
    playMarimba: () => playAudio(audioRefs.marimba),
  };
};