"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "../../../utils/motion";
import { ButtonType, ButtonSize } from "../button/button.util";
import { useThemeContext } from "../../context/themeContext";
import { useAudioControls, playAudio } from "../../navigation/audio-utils";

/**
 * ButtonGroup form component for progressive disclosure of theme controls
 * @component
 * @category forms
 * @param {Object} props - Component props
 * @param {Array} props.options - Array of option objects with { value, label, content }
 * @param {string} props.defaultValue - Default selected option value
 * @param {Function} props.onChange - Callback when selection changes
 * @param {string} props.className - Additional CSS classes
 * @param {ButtonSize} props.size - Button size
 * @example
 * // Text layout controls with progressive disclosure
 * <ButtonGroup
 *   options={[
 *     { value: 'basic', label: 'Basic', content: <BasicTextControls /> },
 *     { value: 'layout', label: 'Text Layout', content: <TextLayoutControls /> },
 *     { value: 'subtext', label: 'Subtext Layout', content: <SubtextLayoutControls /> }
 *   ]}
 *   defaultValue="basic"
 *   onChange={(value) => console.log('Selected:', value)}
 * />
 */
const ButtonGroup = ({ 
  options = [], 
  defaultValue, 
  onChange, 
  className = "", 
  size = ButtonSize.SM 
}) => {
  const { currentTheme } = useThemeContext();
  const { audioRefs } = useAudioControls();
  const sound = currentTheme?.data?.audioSecondaryButton || 'click';

  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]?.value);

  const getSound = (soundName) => {
    const audioRef = audioRefs[soundName];
    if (audioRef) {
      playAudio(
        audioRef, 
        currentTheme?.data?.audioVolume || 1, 
        currentTheme?.data?.audioEnabled ?? true
      );
    }
  };

  const handleOptionClick = (value) => {
    getSound(sound);
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const getButtonClasses = (isSelected) => {
    const baseClasses = 'flex relative items-center justify-center cursor-pointer transition-all duration-200 border';
    const sizeClasses = {
      [ButtonSize.SM]: 'text-xs px-2 py-1',
      [ButtonSize.MD]: 'text-sm px-3 py-2',
      [ButtonSize.LG]: 'text-base px-4 py-3'
    };
    
    const stateClasses = isSelected 
      ? 'bg-[var(--accent-pri)] text-[var(--text-color-inv)] border-[var(--accent-pri)]'
      : 'bg-[var(--surface2)] text-[var(--text-color)] border-[var(--surface3)] hover:bg-[var(--surface3)]';

    return `${baseClasses} ${sizeClasses[size] || sizeClasses[ButtonSize.SM]} ${stateClasses}`;
  };

  const getFirstButtonClasses = (isSelected) => {
    return `${getButtonClasses(isSelected)} rounded-l-lg border-r-0`;
  };

  const getMiddleButtonClasses = (isSelected) => {
    return `${getButtonClasses(isSelected)} border-r-0`;
  };

  const getLastButtonClasses = (isSelected) => {
    return `${getButtonClasses(isSelected)} rounded-r-lg`;
  };

  const getButtonClassesForIndex = (index, isSelected) => {
    if (options.length === 1) {
      return `${getButtonClasses(isSelected)} rounded-lg`;
    }
    if (index === 0) {
      return getFirstButtonClasses(isSelected);
    }
    if (index === options.length - 1) {
      return getLastButtonClasses(isSelected);
    }
    return getMiddleButtonClasses(isSelected);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Button Group */}
      <div className="flex">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={getButtonClassesForIndex(index, selectedValue === option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {/* Progressive Disclosure Content */}
      <AnimatePresence mode="wait">
        {selectedOption?.content && (
          <motion.div
            key={selectedValue}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="overflow-hidden"
          >
            <div className="rounded-lg bg-[var(--surface2)] p-3 border border-[var(--surface3)]">
              {selectedOption.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ButtonGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(ButtonSize))
};

export default ButtonGroup;