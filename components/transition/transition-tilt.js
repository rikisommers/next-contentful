import React from "react";
import { motion } from "framer-motion";

const TransitionTilt = ({ children }) => {
  
  // rotateX(1deg)

  // translateY(-5em);




  return (
    <div className="testp w-full h-full">
    <motion.div
        className="w-screen h-screen z-10"
        initial={{ 
          opacity:1,
         transform :  [`
         translateZ(0px)
         translateY(0px) 
         `]
        }}
        //  rotateX(-7.2216deg)
        exit={{
          opacity:1,
         transform : [`
         translateZ(-10px)
          translateY(50px) 
          `]
        }}
        transition={{
          ease: [0.33, 1, 0.68, 1],
          duration: 0.9,
        }}
      >
        {children}
    </motion.div>
    </div>
  );
};

export default TransitionTilt;
