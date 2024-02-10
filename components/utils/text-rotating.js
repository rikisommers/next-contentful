import { motion , useAnimation} from "framer-motion";
import { useEffect, useState } from "react";
const TextRotating = ({ leadText, rotatingWords }) => {
    const controls = useAnimation();

   const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % rotatingWords.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
    return (
      <motion.h1
      className="text-anim"
      key="text-wrapper"
      initial="hidden"
      animate="show"
      transition={{ delay:2 }} // Add a delay to the start of the animation

      //style={textStyle}

    >
        <p className="text-anim-word">{leadText}</p>
        <motion.div animate={controls} className="overflow-hidden w-200 relative">
          {rotatingWords.map((word, index) => (

<motion.span 
 className="text-xl block absolute top-0 bg-red-100"
key={index}
initial={{ opacity: 0,y:30 }}
animate={{ 
  opacity: index === activeIndex ? 1 : 0,
  y: index === activeIndex ? 0 : 30 
}}
transition={{ duration: 0.5 }}
>
           
              {word.basicContent}
            </motion.span>
          ))}
        </motion.div>
      </motion.h1>
    );
};

export default TextRotating;
