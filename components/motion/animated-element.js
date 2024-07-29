import React,{children} from "react";
import PropTypes from "prop-types";
import { motion, cubicBezier } from "framer-motion";


const ElementAnimPosUp = ({  delay,children }) => {
    return(
        <motion.div
        initial={{
            opacity:0,
            y: 100,
          }}
          animate={{
            opacity:1,
            y: 0,
          }}
          transition={{
            delay:0.6,
          ease: [0.33, 1, 0.68, 1],
          duration: 1.2,
          }}
        >
            {children}
        </motion.div>
    )
}


const ElementAnimFadeIn = ({ delay,children }) => {
    return(
        <motion.div
        initial={{
            opacity:0,
            y: 10,
          }}
          animate={{
            opacity:1,
            y: 0,
          }}
          transition={{
            delay:0.6,
          ease: [0.33, 1, 0.68, 1],
          duration: 1.2,
          }}
        >
            {children}
        </motion.div>
    )
}

const AnimElOrder = {
    1: "100ms",
    2: "200ms",
    3: "300ms",
    4: "400ms",
    5: "500ms",
};


const AnimStyleEl = {
    POSUP: "pos-up",
    FADEIN: "fade-in",
};

const getAnimatedElement = (type,children) => {

    switch (type) {
        case AnimStyleEl.POSUP:
            return <ElementAnimPosUp>{children}</ElementAnimPosUp>;
        case AnimStyleEl.FADEIN:
            return <ElementAnimFadeIn>{children}</ElementAnimFadeIn>;
        default:
            return <ElementAnimFadeIn>{children}</ElementAnimFadeIn>;
    }
}

const AnimatedElement = ({ type = AnimStyleEl.POSUP, children }) => {
    return getAnimatedElement(type, children);
};

AnimatedElement.propTypes = {
    type: PropTypes.oneOf(Object.values(AnimStyleEl)),
    content: PropTypes.string.isRequired,
};

export default AnimatedElement;
export { AnimStyleEl, AnimElOrder };