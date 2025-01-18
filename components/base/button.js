"use client";

import React from "react";
import { motion } from "../../utils/motion";
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



const Button = ({ label, click, type = ButtonType.DEFAULT, sound, children  }) => {
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
          backgroundColor: 'var(--button-default-bg)',
          color: 'var(--button-default-text)',
        };
      case ButtonType.PRIMARY:
        return {
          backgroundColor: 'var(--button-primary-bg)',
          color: 'var(--button-primary-text)',
        };
      case ButtonType.SECONDARY:
        return {
          backgroundColor: 'var(--button-secondary-bg)',
          color: 'var(--button-secondary-text)',
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
      className="relative flex items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer"
      style={getButtonStyle(type)}
    >
      {label}
      {children}
    </motion.div>
  );
};

// Define prop types
Button.propTypes = {
  label: PropTypes.string,
  click: PropTypes.func,
  type: PropTypes.oneOf(Object.values(ButtonType)),
  sound: PropTypes.oneOf(Object.values(ButtonSound))
};

export default Button;
export { ButtonType, ButtonSound };