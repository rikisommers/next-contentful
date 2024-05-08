import React from "react";
import { motion } from "framer-motion";

const TransitionTilt = ({active, children }) => {
  // rotateX(1deg)

  // translateY(-5em);

  const container = {
    initial: {
       z:40,
       //scale:.9,
       transformStyle: 'preserve-3d',
       perspective: '100px', // Adjust the perspective value as needed
       perspectiveOrigin: 'top', // Set the perspective origin (adjust as needed)
    },
    exit:{
      z: 0,
     // scale:1,
      perspective: '0px', // Adjust the perspective value as needed
      perspectiveOrigin: 'top', // Set the perspective origin (adjust as needed)
    }
  }
  const blur = {
    initial: {
      opacity: 0,
      //filter: 'blur(20px)',

  
      
    },
    show: {
      opacity: 1,
     // filter: 'blur(0px)',
      y: 1,

   
      transition: {
        duration: 1.6, // custom duration for opacity property only
        opacity: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.6 // custom duration for opacity property only
        },

      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(20px)',
      y: -40,
      z: 0
    },
  };
  
  return (
    <motion.div className="relative transition-tilt__content"
    variants={active ? container : null}
    initial="initial"

    exit='exit'
    >
    <motion.div
        className="z-40 w-screen overflow-auto torigin"
       variants={active ? blur : null}
       initial="initial"
       animate="show"
       exit='exit'
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TransitionTilt;
