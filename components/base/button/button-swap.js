"use client";

import React, {useState} from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useAudioControls } from "../../navigation/audio-utils";
import { ButtonType, ButtonSound } from "./button.util";
import TextAnimSwap from "../../motion/text-anim-swap";

const ButtonSwap = ({ label, click, sound }) => {
  const { 
    playClick, 
    playBeepOn, 
    playBeepOff, 
  } = useAudioControls();

  const [trigger, setTrigger] = useState(false);

  // Determine button style based on type
 
  
  const getButtonAudio = (sound) => {
    switch (sound) {
      case ButtonSound.ON:
        return playBeepOn();
      case ButtonSound.OFF:
        return playBeepOff();
      case ButtonSound.CLICK:
        return playClick();
      default:
        return playClick();
    }
  };
  
  const handleClick = () => {
    getButtonAudio(sound);
    if (click) {
      click();
    }
  };



  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={() => setTrigger(true)}
      onMouseLeave={() => setTrigger(false)}
      className="relative flex items-center px-3 py-3 overflow-hidden text-xs uppercase rounded-lg cursor-pointer"
      style={{
        backgroundColor: 'var(--accent-pri)',
        color: 'var(--text-color)',
      }}
    >
    
           <TextAnimSwap text={label} trigger={trigger}/>
    </motion.div>


  );
};

// Define prop types
ButtonSwap.propTypes = {
  label: PropTypes.string,
  click: PropTypes.func,
  sound: PropTypes.oneOf(Object.values(ButtonSound))
};

export default ButtonSwap;
export { ButtonType, ButtonSound };