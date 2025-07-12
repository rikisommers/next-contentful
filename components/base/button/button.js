"use client";

import React from "react";
import { motion } from "../../../utils/motion";
import PropTypes from "prop-types";
import { useAudioControls, playAudio } from "../../navigation/audio-utils";
import { ButtonType, ButtonSound } from "./button.util";
import { useThemeContext } from "../../context/themeContext";
import { sounds } from "../../../utils/theme";

/**
 * Basic button component with customizable styling and sound effects
 * @component
 * @category buttons
 * @param {Object} props - Component props
 * @param {string} props.label - Button text
 * @param {Function} props.click - Click handler function
 * @param {ButtonType} props.type - Button style type (DEFAULT, PRIMARY, SECONDARY, TRANSPARENT)
 * @param {ButtonSound} props.sound - Sound effect type (CLICK, ON, OFF)
 * @param {React.ReactNode} props.children - Child elements
 * @example
 * // Default button with click sound
 * <Button 
 *   label="Default Button" 
 *   type={ButtonType.DEFAULT} 
 *   sound={ButtonSound.CLICK} 
 * />
 * @example
 * // Primary button with click handler
 * <Button
 *   label="Submit Form"
 *   type={ButtonType.PRIMARY}
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Secondary button with click sound
 * <Button
 *   label="Secondary Action"
 *   type={ButtonType.SECONDARY}
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Transparent button with click sound
 * <Button
 *   label="Cancel"
 *   type={ButtonType.TRANSPARENT}
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Button with children content
 * <Button
 *   type={ButtonType.PRIMARY}
 *   sound={ButtonSound.CLICK}
 * >
 *   <span>🚀 Launch App</span>
 * </Button>
 */
const Button = ({ label, onClick, type = ButtonType.DEFAULT, children  }) => {

  const { currentTheme } = useThemeContext();
  console.log('currentTheme.data:', currentTheme.data);
  const sound = currentTheme.data.audioPrimaryButton || 'click'; // fallback to 'click'

  const { audioRefs } = useAudioControls();

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

  const getSound = (soundName) => {
    // Use the public playAudio function directly
    console.log('playing sound', soundName);
    console.log('theme sound', currentTheme.data.audioPrimaryButton);

    const audioRef = audioRefs[soundName];
    if (audioRef) {
      console.log('playing sound', soundName);
      playAudio(audioRef, currentTheme.data.audioVolume, currentTheme.data.audioEnabled);
    }
  };
  
  const handleClick = () => {
    getSound(sound);
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="flex relative items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer"
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
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.values(ButtonType)),
  sound: PropTypes.oneOf(Object.values(ButtonSound))
};

export default Button;
export { ButtonType, ButtonSound };