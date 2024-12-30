"use client";

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CtxMenu = ({ buttonContent, menuContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isOpen ? 'visible' : 'hidden');
  }, [controls, isOpen]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleMenuMouseEnter = () => {
    if (!isOpen) {
      setIsOpen(true); // Ensure menu stays closed when hovered over
    }
  };

  const handleMenuMouseLeave = () => {
    if (isOpen) {
      setIsOpen(false); // Close menu when mouse leaves menu
    }
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 1,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {buttonContent}
      <motion.div
        className="absolute top-[50%] left-0 z-10 shadow-lg"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { 
             opacity: 1,
             y: '-50%',
             display:'block', 
              scale:1
            },
          hidden: { 
            opacity:1, 
            y: '-50%' ,
            scale:0.9,
            transitionEnd: {
                display: "none",
              },
          
          }
        }}
        transition={{ duration: 0.2 }}
        onMouseEnter={isOpen ? handleMenuMouseEnter : null}
        onMouseLeave={isOpen ? handleMenuMouseLeave : null}
      >
        {menuContent}
      </motion.div>
    </div>
  );
};

export default CtxMenu;
