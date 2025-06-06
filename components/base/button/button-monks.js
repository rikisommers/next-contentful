"use client";

import React, {useState} from "react";
import { motion } from "../../../utils/motion"
import PropTypes from "prop-types";
import { useAudioControls } from "../../navigation/audio-utils";
import { ButtonType, ButtonSound } from "./button.util";

/**
 * Advanced button component with Monks-style animations and effects
 * @component
 * @category buttons
 * @param {Object} props - Component props
 * @param {string} props.label - Button text
 * @param {Function} props.click - Click handler function
 * @param {ButtonType} props.type - Button style type
 * @param {ButtonSound} props.sound - Sound effect type
 * @param {React.ReactNode} props.children - Child elements
 * @example
 * // Default Monks button with click sound
 * <ButtonMonks 
 *   label="Discover" 
 *   type={ButtonType.DEFAULT} 
 *   sound={ButtonSound.CLICK} 
 * />
 * @example
 * // Primary Monks button with interaction
 * <ButtonMonks 
 *   label="Get Started" 
 *   type={ButtonType.PRIMARY} 
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Secondary Monks button with click sound
 * <ButtonMonks 
 *   label="Activate" 
 *   type={ButtonType.SECONDARY} 
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Transparent Monks button with click sound
 * <ButtonMonks 
 *   label="Close" 
 *   type={ButtonType.TRANSPARENT} 
 *   sound={ButtonSound.CLICK}
 * />
 * @example
 * // Monks button with custom content and children
 * <ButtonMonks 
 *   type={ButtonType.PRIMARY}
 *   sound={ButtonSound.CLICK}
 * >
 *   <span>🚀 Launch</span>
 * </ButtonMonks>
 */

const ButtonMonks = ({ label, click, type = ButtonType.DEFAULT, sound }) => {
  const { 
    playClick, 
    playBeepOn, 
    playBeepOff, 
  } = useAudioControls();

  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // From https://easings.net/#easeOutBounce -- replace with spring
  function bounceEase(x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }

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
    onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
    onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
    exit="exit"
    whileHover="animate"
      onClick={handleClick}
      className="relative flex items-center px-3 py-3 overflow-hidden text-xs uppercase rounded-lg cursor-pointer"
      style={getButtonStyle(type)}
    >
        <span className="z-20">
        {label}

        </span>
      
            {/* <motion.span 
            variants={child}
            className="absolute left-0 z-10 w-full top-3 h-7"
            style={getButtonHighlightStyle(ButtonType.PRIMARY)}>
           
           </motion.span> */}

                <motion.div
                  className={`overflow-hidden relative w-6 h-6 rounded-full opacity-50 flex items-center justify-center ml-2 `}
                  style={{
                    backgroundColor: "var(--surface2)",
                    transform: "translateY(8px)",
                  }}
                  animate={{
                    x: isHovered ? [0, 20, 0] : 0, // Move to 300px and back to 0
                  }}
                  transition={{
                    duration: 1,
                    //ease: bounceEase
                    ease: ["easeOut", bounceEase], // Different easings for each segment
                    times: [0, 0.33, 1], // Control when each keyframe is reached
                  }}
                >
                  <motion.img
                    animate={{
                      x: isHovered ? [0, 40, -40, 0] : 0,
                      opacity: isHovered ? [1, 0, 0, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      times: [0, 0.33, 0.65, 1],
                      ease: "easeOut",
                      // repeat: 1,
                      // repeatType: "loop",
                    }}
                    src="arrow_forward.svg"
                    viewBox="0 0 20 20"
                    className="z-10 w-6 h-6"
                    style={{
                      color: "var(--accent-pri)",
                    }}
                  ></motion.img>
                </motion.div>
    </motion.div>


  );
};

// Define prop types
ButtonMonks.propTypes = {
  label: PropTypes.string,
  click: PropTypes.func,
  type: PropTypes.oneOf(Object.values(ButtonType)),
  sound: PropTypes.oneOf(Object.values(ButtonSound))
};

export default ButtonMonks;
export { ButtonType, ButtonSound };