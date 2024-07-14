"use client";

import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useAudioControls } from "../utils/audio";

// Define the ButtonType enum
const ButtonType = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  DANGER: "danger",
  // Add other types as needed
};

const ButtonSound = {
  ON: "on",
  OFF: "off",
  CLICK: "click",

};


const Button = ({ label, click, type, sound }) => {

  const {
    playPlink,
    playClick,
    playBeepOn,
    playBeepOff
  } = useAudioControls();

  // Determine button style based on type
  const getButtonClass = (type) => {
    switch (type) {
      case ButtonType.PRIMARY:
        return "bg-red-400 text-slate-300";
      case ButtonType.SECONDARY:
        return "bg-red-200 text-slate-300";
      case ButtonType.SUCCESS:
        return "bg-success text-slate-300";
      case ButtonType.DANGER:
        return "bg-danger text-slate-300";
      default:
        return "bg-primary text-slate-300";
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
      className={`relative flex items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer ${getButtonClass(type)}`}
    >
      {label}
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
