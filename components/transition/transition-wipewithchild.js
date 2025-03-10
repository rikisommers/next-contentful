"use client";

import React, { useState, useContext } from "react";
import { motion, LayoutGroup } from "../../utils/motion";
import { RouteContext } from "../context/routeContext";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../../utils/theme';

const TransitionContent = ({ currentTheme, onComplete }) => (
  <motion.div
    className="pointer-events-none transition-wipe--y rounded-2xl"
    style={{ backgroundColor:  'var(--body-background-color)', }}
    initial={{ y: "100%" }}
    exit={{ y: -40, zIndex: 40, onComplete }}
    transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.6, delay: 0.3 }}
  >
    <div className="flex items-center justify-center w-full h-full rounded-xl"></div>
  </motion.div>
);

const Overlay = ({ currentTheme }) => (
  <motion.div
    className="fixed top-0 w-full h-full opacity-50 pointer-events-none"
    style={{ backgroundColor:  'var(--background-color-inv)', }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0 }}
    exit={{ zIndex: 10, opacity: 0.5 }}
    transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.9, delay: 0 }}
  ></motion.div>
);

const TransitionWipeWithChild = ({ children }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  const { routeInfo } = useContext(RouteContext);
  const [destRoute, setDestRoute] = useState('');

  // useEffect(() => {
  //   setDestRoute(routeInfo.destRoute);
  // }, [routeInfo]);

  return (
    <LayoutGroup>
        <>
          <TransitionContent currentTheme={currentTheme} />
          <Overlay currentTheme={currentTheme} />
        </>
        {children}
    </LayoutGroup>
  );
};

export default TransitionWipeWithChild;
