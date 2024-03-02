import { motion } from "framer-motion";


export default function TextAnimationUp({ content, style , direction, size, color, type }) {
  const container = {
    hidden: { opacity: 0.5 },
    show: {
      opacity: 1,
      transition: {
        delay: 0, // Add a delay to the start of the animation
       staggerChildren:  0.123,
       duration: 0.6,
      },
    },
  };


  const fadeup = {
    hidden: {
      opacity: 0,
      rotateX: 0,
      y:  '30px',
    },
    show: { 
      y: 0,
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
       // delay: 0.5, // Add a delay to the start of the animation
        ease: [0.33, 1, 0.68, 1],
        duration: 0.2,
      },
    },
  };

  const textStyle = {
    color: color || "black", // Default to black if color prop is not provided
    ...style, // Include other styles passed via the style prop
  };


  return (
    <motion.h1
      className="text-anim"
      key="text-wrapper"
      variants={container}
      initial="hidden"
      animate="show"
      transition={{ delay:2 }} // Add a delay to the start of the animation

      //style={textStyle}

    >
      {content &&
        content.split(" ").map(function (word, index) {
          return (
            <motion.span
             variants={fadeup}
              className={`text-anim-word overflow-hidden ${color}`}
              key={index}
            > 
              {word.split("").map(function (letter, index) {
                return (
                  <motion.span
                    className={`text-anim-letter ${color ? color : "text-slate-500"}`}
                    key={index}
                    // variants={item}
               
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </motion.span>
          );
        })}
    </motion.h1>
  );
}