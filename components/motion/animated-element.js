import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, useInView } from "../../utils/motion";;

const useViewportHeight = () => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => setHeight(window.innerHeight);
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return height;
};

const ElementAnimPosUp = ({ delay, offset, children }) => {
    const ref = React.useRef(null);
    const viewportHeight = useViewportHeight();
    const margin = `0px 0px -${viewportHeight * offset}px 0px`;
    const isInView = useInView(ref, { once: true, margin });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{
                delay: delay,
                ease: [0.33, 1, 0.68, 1],
                duration: 1.2,
            }}
        >
            {children}
        </motion.div>
    );
};

const ElementAnimFadeIn = ({ delay, offset, children }) => {
    const ref = React.useRef(null);
    const viewportHeight = useViewportHeight();
    const margin = `0px 0px -${viewportHeight * offset}px 0px`;
    const isInView = useInView(ref, { once: true, margin });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
                delay: delay,
                ease: [0.33, 1, 0.68, 1],
                duration: 1.2,
            }}
        >
            <h1 className="absolute top-0 left-0 z-50 text-red-400">{delay}</h1>
            {children}
        </motion.div>
    );
};

const ElementAnimFadeInLeft = ({ delay, offset, children }) => {
    const ref = React.useRef(null);
    const viewportHeight = useViewportHeight();
    const margin = `0px 0px -${viewportHeight * offset}px 0px`;
    const isInView = useInView(ref, { once: true, margin });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 15 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{
                delay: delay,
                ease: [0.33, 1, 0.68, 1],
                duration: 1.2,
            }}
        >
            {children}
        </motion.div>
    );
};


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
    FADEINLEFT: "fade-in-left",
};

const getAnimatedElement = (type, children, delay, offset) => {
    switch (type) {
        case AnimStyleEl.POSUP:
            return <ElementAnimPosUp delay={delay} offset={offset}>{children}</ElementAnimPosUp>;
        case AnimStyleEl.FADEIN:
            return <ElementAnimFadeIn delay={delay} offset={offset}>{children}</ElementAnimFadeIn>;
        case AnimStyleEl.FADEINLEFT:
            return <ElementAnimFadeInLeft delay={delay} offset={offset}>{children}</ElementAnimFadeInLeft>;
        default:
            return <ElementAnimFadeIn delay={delay} offset={offset}>{children}</ElementAnimFadeIn>;
    }
};

const AnimatedElement = ({ 
    type = AnimStyleEl.POSUP, 
    children, 
    delay = 0.1, 
    offset = 0.1 
}) => {
    return getAnimatedElement(type, children, delay, offset);
};

AnimatedElement.propTypes = {
    type: PropTypes.oneOf(Object.values(AnimStyleEl)),
    delay: PropTypes.number,
    offset: PropTypes.number,
};

export default AnimatedElement;
export { AnimStyleEl, AnimElOrder };