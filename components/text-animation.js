import { motion, AnimatePresence  } from "framer-motion";

export default function TextAnimation({ content }) {
  return (

    <motion.div className="content"
    key="text-wrapper"
    initial={{ 
      scaleX:1.2,
      skewX: 0, 
      skeyY: -12,
      y: 60,
      x:-60,
     }}
     animate={{
      scaleX: 1,
      skewX: 0, 
      skeyY: 0,
      y: 0,
      x: 0,
     }}
     exit={{
      scaleX: 1,
      skewX: 0, 
      skeyY: 0,
      y: 0,
      x: 0,
     }}
    transition={{
      ease: [0.33, 1, 0.68, 1],
      duration: 1,
    }}
    >

    <h1 className="sub-text">
    <span>
        {content && content.split(" ").map(function(char, index){
          return <motion.span 
                  key={index} 
                  initial={{ 
                    opacity: 0,
                    color: '#3E5C76',
                    right:-20,
          
                    rotate: 3,  
                   }}
                   animate={{
                    opacity: 1,
                    color: '#000',
                    right:0,
                    rotate: 0
                   }}
                   exit={{
                    opacity: 1,
                    color: 'red',
                    right:0,
                    rotate: 0
                   }}
                  transition={{
                    ease: [0.33, 1, 0.68, 1],
                    duration: 1.6,
                    delay: 0.5 + index / 10, 
                  }}
                   aria-hidden="true" 
                   >{char}
                   </motion.span>;
        })}
    </span>  
    </h1> 
    </motion.div>
    
  )
}