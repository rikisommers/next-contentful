"use client";

import React, {useState} from "react";
import { motion } from "../../../utils/motion";
import PropTypes from "prop-types";
import { useAudioControls } from "../../navigation/audio-utils";
import { ButtonType, ButtonSound } from "./button.util";
import TextAnimSwap from "../../motion/text-anim-swap";

/**
 * Button component with text swap animation on hover
 * @component
 * @category buttons
 * @param {Object} props - Component props
 * @param {string} props.label - Button text
 * @param {Function} props.click - Click handler function
 * @param {ButtonType} props.type - Button style type
 * @param {ButtonSound} props.sound - Sound effect type
 * @example
 * // Default swap button with click sound
 * <ButtonSwap 
 *   label="Default Swap" 
 *   type={ButtonType.DEFAULT} 
 *   sound={ButtonSound.CLICK} 
 * />
 * @example
 * // Primary swap button with action
 * <ButtonSwap 
 *   label="Download Now" 
 *   type={ButtonType.PRIMARY} 
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Secondary swap button with click sound
 * <ButtonSwap 
 *   label="Learn More" 
 *   type={ButtonType.SECONDARY} 
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Transparent swap button with click sound
 * <ButtonSwap 
 *   label="Cancel" 
 *   type={ButtonType.TRANSPARENT} 
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Swap button with hover interaction
 * <ButtonSwap 
 *   label="Hover to Swap" 
 *   type={ButtonType.PRIMARY} 
 *   sound={ButtonSound.CLICK}
 * />
 */

const ButtonSwap = ({ label, click, sound, type = ButtonType.DEFAULT }) => {
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