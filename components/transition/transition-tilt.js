import React from "react";
import { motion } from "framer-motion";

const TransitionTilt = ({ children }) => {
  

  return (
    <div className="perc">
    <motion.div
        className="anim-el fixed w-full h-full overflow-hidden top-0 z-10 origin-top"
        initial={{ 
         transform : 'translate3d(0px, 0px, 0px) rotateX(0deg) scale(1, 1)',
         }}
        //  rotateX(-7.2216deg)
        exit={{
         transform : [
          'translate3d(0px, 0px, 0px) rotateX(0deg) scale(1, 1)',
          'translate3d(0px, 80px, 0px) rotateX(0) scale(0.9356, 0.9356)',
        ],
          zIndex:10
        }}
        transition={{
          ease: [0.33, 1, 0.68, 1],
          duration: 0.6,
        }}
      >
        {children}
    </motion.div>
    </div>
  );
};

export default TransitionTilt;
