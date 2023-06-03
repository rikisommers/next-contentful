import { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
} from "framer-motion";
import { useRouter } from "next/router";
import { ScrollableBox } from "./scrollable";

const TransitionContent = ({ children }) => {

  const [isActive, setIsActive] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
   const isOpen = true;

  const handleScrollChange = (value) => {
    setScrollValue(value);

    if (value <= 1000) {
      x.set(value);
     // console.log("sv", scrollValue);

      if (value <= 200) {
        setIsActive(false);
      }

      if (value > 200) {
        setIsActive(true);
      }
     // console.log("isActive", isActive);
    }
  };

  const easing = cubicBezier(0.35, 0.17, 0.3, 0.86);
  const x = useMotionValue(0);

  const input = [0, 200];
  const cpyo = [8, 0.01];
  const cpxo = [1.5, 0.01];
  const ro = [1, 0];

  const yv = useTransform(x, input, cpyo, { easing });
  const xv = useTransform(x, input, cpxo, { easing });
  const rv = useTransform(x, input, ro, { easing });

  const clipPathValue = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem 0px 0px)`;

  const variants = {
    active: { opacity: 0.3 },
    inactive: { opacity: 0 },
    hover: {
      background: "red",
      opacity: 1,
    },
  };

  const bgVariants = {
    active: { opacity: 1 },
    inactive: { opacity: 0 },
    transition: {
      duration: 0.3,
    },
  };
  const wrapperVariants = {
    active: {
      y: 0,
      opacity: 1,
    },
    inactive: {
      opacity: 0,
      y: "100vh",
    },
    transition: { duration: 0.3, easing: easing },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-0"
        animate={isOpen ? "active" : "inactive"}
        variants={bgVariants}
      ></motion.div>

      <motion.div
        animate={isOpen ? "active" : "inactive"}
        variants={wrapperVariants}
        style={{ clipPath: clipPathValue }}
        className="fixed w-full h-full top-0 z-30 flex inset"
      >
        <motion.div className="bg-white z-10 flex flex-grow">
         <ScrollableBox onScrollChange={handleScrollChange}>
          {children}
          </ScrollableBox>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TransitionContent;
