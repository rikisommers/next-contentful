"use client";

import React from "react";
import { motion } from "../../utils/motion"
import PropTypes from "prop-types";
import { useAudioControls } from "../navigation/audio-utils";


// Define the ButtonType enum
const ButtonType = {
  DEFAULT: "default",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TRANSPARENT: "transparent",
};

const ButtonSound = {
  ON: "on",
  OFF: "off",
  CLICK: "click",
};

const ButtonAlt = ({ label, click, type = ButtonType.DEFAULT, sound }) => {
  const { 
    playClick, 
    playBeepOn, 
    playBeepOff, 
  } = useAudioControls();

  // Determine button style based on type
  const getButtonStyle = (type) => {
    switch (type) {
      case ButtonType.DEFAULT:
        return {
          backgroundColor: 'var(--surface-1)',
          color: 'var(--text-color)',
        };
      case ButtonType.PRIMARY:
        return {
          backgroundColor: 'var(--accent-pri)',
          color: 'var(--text-color-inv)',
        };
      case ButtonType.SECONDARY:
        return {
          backgroundColor: 'transparent',
          border:'1px solid',
          borderColor: 'var(--accent-sec)',
          color: 'var(--accent-sec)',
        };
      case ButtonType.TRANSPARENT:
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-color)',
        };
      default:
        return {
          backgroundColor: 'var(--button-default-bg)',
          color: 'var(--button-default-text)',
        };
    }
  };
  const getButtonHighlightStyle = (type) => {
    switch (type) {
      case ButtonType.DEFAULT:
        return {
          backgroundColor: 'var(--accent-pri)',        
        };
      case ButtonType.PRIMARY:
        return {
          backgroundColor: 'var(--accent-sec)',
        };
      case ButtonType.SECONDARY:
        return {
          backgroundColor: 'var(--accent-pri)',
        };
      case ButtonType.TRANSPARENT:
        return {
          backgroundColor: 'var(--accent-pri)',
        };
      default:
        return {
          backgroundColor: 'var(--accent-pri)',
        };
    }
  };
  
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

  const parent = {
    initial: {  scale: 1},
    animate: {  scale: [1,0.95,1.05,1] },
    transition:{ 
      ease: [0.36, 0, 0.66, -0.56],
      duration: 0.6,
    }

  }

  const child = {
    initial: {  
       scale: 1 ,
       y:'100%',
       borderRadius: 0
      },
    animate: { 
      scale: 1.8, 
      y:'-10%',
      borderRadius:'50%',
      transition: { 
        duration: 0.6, // Set a longer duration for the animate state
        ease: [0.65, 0, 0.35, 1],
      }
    },
    exit: { 
      scale: 1.5, 
      y:'100%',
      borderRadius:0,
      transition: { 
        duration: 0.6, // Optional: Set a different duration for the exit state
        ease: [0.65, 0, 0.35, 1],
      }
    },
  };

  return (
    <motion.div
    variants={parent}
    initial="initial"
    animate="initial"
    exit="exit"
    whileHover="animate"
      onClick={handleClick}
      className="relative flex items-center px-3 py-3 overflow-hidden text-xs uppercase rounded-lg cursor-pointer"
      style={getButtonStyle(type)}
    >
        <span className="z-20">
        {label}

        </span>
      
            <motion.span 
            variants={child}
            className="absolute left-0 z-10 w-full top-3 h-7"
            style={getButtonHighlightStyle(ButtonType.PRIMARY)}>
           
           </motion.span>
    </motion.div>


  );
};

// Define prop types
ButtonAlt.propTypes = {
  label: PropTypes.string,
  click: PropTypes.func,
  type: PropTypes.oneOf(Object.values(ButtonType)),
  sound: PropTypes.oneOf(Object.values(ButtonSound))
};

export default ButtonAlt;
export { ButtonType, ButtonSound };