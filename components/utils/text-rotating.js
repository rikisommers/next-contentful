import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
const TextRotating = ({ leadText, rotatingWords }) => {
  const controls = useAnimation();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);


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
      initial="hidden"
      animate="show"
      transition={{ delay: 2 }} // Add a delay to the start of the animation
    >
      <p className="text-anim-word">{leadText}</p>
      <motion.div animate={controls} className="w-200 h-full relative">
        {rotatingWords.map((word, index) => (
          <motion.span
            className="text-anim-word block absolute top-0 text-indigo-500"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              y: index === activeIndex ? 0 : 30,
            }}
            transition={{ duration: 1.5 }}
          >
            {/* {word.basicContent}dsss */}

            {word.basicContent.split("").map(function (letter, index) {
                return (
<motion.span
             variants={blur}
             className={`text-anim-letter text-indigo-700`}
             key={index}
            
                  >
                    {letter}
                  </motion.span>
                )
            })}
          </motion.span>
        ))}
      </motion.div>
    </motion.h1>
  );
};

export default TextRotating;
