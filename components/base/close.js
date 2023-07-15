import React, { useState } from "react";
import { motion, cubicBezier } from "framer-motion";
// The code in component is stupid and extremely verbose, you are much better off using classes & css:hover events intead.
// I have gone with this approach as a test to compare workflows styling elements with framer and tailwind exclusively.
// In this example it took me way longer than usual to achieve a simple interaction. I dont recomend it for triggering simlpe child animation where stagger is not required.

const Close = ({ isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    console.log("start");
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    console.log("end");

    setIsHovered(false);
  };

  const handleComponentClick = () => {
    onClick();
  };

  const variants = {
    active: { opacity: 1 },
    inactive: { opacity: 0 },
    hover: {
      opacity: 1,
    },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: -90 },
  };

  const textVariants = {
    initial: { width: 0 ,opacity:0},
    hover: { width: 50 ,opacity:1},
  };

  return (
    <motion.div
      onClick={handleComponentClick}
      animate={isActive ? "active" : "inactive"}
      variants={variants}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="flex flex-row items-center fixed top-8 right-36 z-50 bg-black text-white px-3 py-2 rounded-3xl cursor-pointer"
    >
      <motion.img
        className="close-icon w-4 h-4"
        src="/close.svg"
        initial="initial"
        variants={iconVariants}
        animate={isHovered ? "hover" : "initial"}
        transition={{
          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          duration: 0.3,
        }}
      />
      <motion.div
        className="overflow-hidden"
        initial="initial"
        variants={textVariants}
        animate={isHovered ? "hover" : "initial"}
        transition={{
          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          duration: 0.3,
        }}
      >
        <span className="ml-2 mb-0">Close</span>
      </motion.div>
    </motion.div>
  );
};
export default Close;
