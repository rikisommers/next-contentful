import React, { useState, useEffect, useRef } from "react";
import { motion, cubicBezier } from "../../utils/motion";;

const TransitionHome = ({ children }) => {
  

  const nextRef = useRef(null);
  const [finalPos, setFinalPos] = useState(null);
  const boundingRect = nextRef?.current?.getBoundingClientRect();
 

  return (
   <motion.div
          ref={nextRef}
          className="relative overflow-hidden"
          layout
          initial={{
            y: 0,
            x: 0,
            opacity: 0,
          }}
          animate={{
            y: 0,
            x: 0,
            opacity: 1,
          }}
          exit={{
            margin: "auto",
           // width: "calc(100vw - 12rem)",
            className: "h-vh66 rounded-xl mx-6",
            //y: boundingRect?.y + 448,
          }}
          transition={{
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
            duration: 0.6,
            delay: 0.3,
          }}
        >
        {children}
    </motion.div>
  );
};

export default TransitionHome;
