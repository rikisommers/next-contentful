import { useEffect, useState } from 'react';
import { useControls } from 'leva';
import { initializeAudioRefs, playAudio, updateVolume, toggleAudio } from '../components/navigation/audio-utils';

export const useAudioControls = () => {
  const [audioRefs, setAudioRefs] = useState(initializeAudioRefs());
  const [isAudioOn, setIsAudioOn] = useState(true);
  const { volume } = useControls('Audio', {
    volume: { value: 0.2, min: 0, max: 1, step: 0.01 },
    'Audio On': {
      value: isAudioOn,
      onChange: (value) => setIsAudioOn(value),
    },
  });

  useEffect(() => {
    updateVolume(audioRefs, volume);
  }, [volume, audioRefs]);

  useEffect(() => {
    toggleAudio(audioRefs, isAudioOn);
  }, [isAudioOn, audioRefs]);

  return {
    playClick: () => playAudio(audioRefs.click, volume, true),
    playBeepOn: () => playAudio(audioRefs.beepOn, volume, true),
    playBeepOff: () => playAudio(audioRefs.beepOff, volume, true),
    playPlink: () => playAudio(audioRefs.plink, volume, true),
    playDrip: () => playAudio(audioRefs.drip, volume, true),
    playMarimba: () => playAudio(audioRefs.marimba, volume, true),
  };
};
