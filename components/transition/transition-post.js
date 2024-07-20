import React from "react";
import { motion } from "framer-motion";

const TransitionPost = ({ children }) => {
  
  // rotateX(1deg)

  // translateY(-5em);





  return (
    <div className="w-full h-full testp">
    <motion.div
        className="z-10 w-full h-screen"
        initial={{ 
          transform:"translateZ(0px)"
        //  transform :  [`
        //  translateZ(0px) 
        //  translateY(0px) 
        //  rotateX(0deg)
        //  `]
        }}
        //  rotateX(-7.2216deg)
        exit={{
          transform:"translateZ(-5px)"
        //  transform : [`
        //   translateZ(-10px) 
        //   translateY(-10px) 
        //   rotateX(0deg)
        //   `]
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

export default TransitionPost;
