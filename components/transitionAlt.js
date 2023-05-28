import React, { useState, useEffect, useCallback} from "react";
import { motion } from "framer-motion";


const TransitionAlt = ({type, children}) => {
    

  return (  
    <> 
     <h1 className="postop">type:{type}</h1>

    <motion.div className={`${type == 'work' ? "" : "fixed w-full h-full p-5" }`}
           initial={{ scale: 1 }}
           exit={{
            scale: 0.9
          }}
           transition={{
             type: "spring",
             stiffness: 260,
             damping: 20,
             duration: 0.6,
             //delay: 1,
           }}
           >

            {children}
    </motion.div>
    <motion.div className="top-0 h-full w-full bg-red "
                 initial={{ opacity: 0 }}
                 exit={{
                  className: 'z-10 ',
                  opacity:0.5
                 }}
                 transition={{
                   type: "spring",
                   stiffness: 260,
                   damping: 20,
                   duration: 0.3,
                   //delay: 1,
                 }}>

    </motion.div>
    <motion.div className="fixed top-0 h-full w-full bg-white rounded-xl "
                 initial={{ y: '100%' }}
                 exit={{
                  y : 0 
                 }}
                 transition={{
                  
                   duration: 0.6,
                   delay: 0.6,
                 }}>

                 
                  <div className="c-tile h-full rounded-xl bg-orange-400">

                  <h1>HOME:{type}</h1>

                  </div>

                
                    
    </motion.div>
    </>
  );
};


export default TransitionAlt;
