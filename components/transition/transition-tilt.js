import React from "react";
import { motion } from "framer-motion";

const TransitionTilt = ({active, children }) => {
  // rotateX(1deg)

  // translateY(-5em);

  const container = {
    initial: {
       z:40,
       scale:1,
       transformStyle: 'preserve-3d',
       perspective: '1000', // Adjust the perspective value as needed
       perspectiveOrigin: 'top', // Set the perspective origin (adjust as needed)
    },
    exit:{
      z: 0,
      scale:.9,

      perspective: '0px', // Adjust the perspective value as needed
      perspectiveOrigin: 'top', // Set the perspective origin (adjust as needed)
      transition: {
        duration: .6, // custom duration for opacity property only
      
      },
    }
  }
  const blur = {
    initial: {
      opacity: 0,
      filter: 'blur(0px)',


      
    },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 1,

   //  transform : [`
        //   translateZ(-10px) 
        //   translateY(-10px) 
        //   rotateX(0deg)
        //   translateZ(-5px) 
        //   translateY(-5px) 
        //   rotateX(-5.2216deg)
        //   `]
      transition: {
        duration: .6, // custom duration for opacity property only
        opacity: {
          ease: [0.33, 1, 0.68, 1],
          duration: .6 // custom duration for opacity property only
        },

      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(20px)',
     // transform:"translateZ(-10px), rotateY(-7deg) ",
      transform: 'rotateX(6.2216deg)',

      y: -100,
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
        className="z-40 w-full overflow-auto torigin"
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
