import { motion , useAnimation} from "framer-motion";
import { useEffect } from "react";
const TextRotating = ({ leadText, rotatingWords }) => {
    const controls = useAnimation();

    useEffect(() => {
      const interval = setInterval(async () => {
        await controls.start({ opacity: 0 }); // Fade out the current word
        await controls.start({ opacity: 1 }); // Fade in the next word
      }, 2000); // Change word every 2 seconds
  
      return () => clearInterval(interval);
    }, [controls]);
  
    return (
      <div>
        <p>{leadText}</p>
        <motion.span animate={controls}>
          {rotatingWords.map((word, index) => (
            <span key={index} style={{ display: "inline-block" }}>
              {word.basicContent}
            </span>
          ))}
        </motion.span>
      </div>
    );
};

export default TextRotating;
