import { motion, AnimatePresence } from "framer-motion";

export default function TextAnimation({ content }) {
  const container = {
    hidden: { opacity: 0.5 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      rotateX: -20,
     // rotateY: 12,
      y: -10,
    },
    show: {
      y: 0,

      opacity: 1,
      rotateX: 0,
      rotateY: 0,
     // rotateX: -20,
      //rotateY: 12,
      transition: {
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
      },
    },
  };

  return (
    <motion.h1
      className="flex flex-col"
      key="text-wrapper"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {content &&
        content.split(" ").map(function (word, index) {
          return (
            <span
              className="uppercase text-9xl text-black text-anim-wrap block"
              key={index}
            >
              {word.split("").map(function (letter, index) {
                return (
                  <motion.span
                    className="text-anim text-black"
                    key={index}
                    variants={item}
                    // initial={{
                    //   opacity: 0,
                    //   rotateX:-30,
                    //   rotateY:12,

                    //   y: -20

                    //  }}
                    //  animate={{
                    //   y: 0,

                    //   opacity: 1,
                    //   rotateX:0,
                    //   rotateY:0,

                    //  }}

                    // transition={{
                    //   ease: [0.33, 1, 0.68, 1],
                    //   duration: 0.6,
                    //   delay: 0.1 * index + 1,
                    // }}
                  >
                    {letter}
                    {/* {index} */}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
    </motion.h1>
  );
}
