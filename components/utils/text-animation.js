import { motion } from "framer-motion";

export default function TextAnimation({ content, style , direction, size, color }) {
  const container = {
    hidden: { opacity: 0.5 },
    show: {
      opacity: 1,
      transition: {
        delay: 0, // Add a delay to the start of the animation
       staggerChildren:  0.123,
       duration:0.6,
      },
    },
  };


  const blur = {
    hidden: {
      opacity: 0,
      filter: 'blur(20px)',
      y:'30px',
    },
    show: {
      y:'0',
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.6, // custom duration for opacity property only
        opacity: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.6 // custom duration for opacity property only
        },

      },
    },
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
             variants={blur}
              className={`text-anim-word overflow-hidden ${color}`}
              key={index}
            > 
              {word.split("").map(function (letter, index) {
                return (
                  <motion.span
                    className={`text-anim-letter ${color ? color : "text-slate-500"}`}
                    key={index}
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