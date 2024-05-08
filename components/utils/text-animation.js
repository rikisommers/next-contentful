import { motion } from "framer-motion";

export default function TextAnimation({
  content,
  style,
  direction,
  size,
  color,
}) {
  const container = {
    hidden: { opacity: 0.5 },
    show: {
      opacity: 1,
      transition: {
        delay: 0, // Add a delay to the start of the animation
        staggerChildren: 0.123,
        duration: 0.1,
      },
    },
  };

  const blur = {
    hidden: {
      filter: "blur(20px)",
    },
    show: {
      filter: "blur(0px)",
      transition: {
        duration: 1.6, // custom duration for opacity property only
        opacity: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.6, // custom duration for opacity property only
        },
      },
    },
    exit:{
      filter: "blur(20px)",
      opacity:0

    }
  };

  const position = {
    hidden: {
      opacity: 0,
      // paddingLeft:'30px',
    },
    show: {
      // paddingLeft:'0',
      opacity: 1,
      transition: {
        duration: 0.6, // custom duration for opacity property only
        opacity: {
          ease: [0.33, 1, 0.68, 1],
          duration: 0.3, // custom duration for opacity property only
        },
      },
    },
  };

  return (
    <motion.div variants={blur} initial="hidden" animate="show" exit="exit">
      <motion.h1
        className="text-anim"
        key="text-wrapper"
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delay: 2 }} // Add a delay to the start of the animation

        //style={textStyle}
      >
        {content &&
          content.split(" ").map(function (word, index) {
            return (
              <motion.span
                variants={position}
                className={`text-anim-word overflow-hidden`}
                key={index}
              >
                {/* {word} */}
                {word.split("").map(function (letter, index) {
                  return (
                    <motion.span
                      style={{color:color}}
                      className={`text-anim-letter text-slate-500 ${size}`}
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
    </motion.div>
  );
}
