"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { RouteContext } from "../../components/routeContext";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../../utils/theme';

const TransitionContent = ({ currentTheme, onComplete }) => (
  <motion.div
    className="transition-wipe--y rounded-2xl"
    style={{ backgroundColor: currentTheme?.backgroundColor }}
    initial={{ y: "100%" }}
    exit={{ y: -40, zIndex: 40, onComplete }}
    transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.6, delay: 0.3 }}
  >
    <div className="flex items-center justify-center w-full h-full rounded-xl"></div>
  </motion.div>
);

const Overlay = ({ currentTheme }) => (
  <motion.div
    className="fixed top-0 w-full h-full opacity-50"
    style={{ backgroundColor: currentTheme?.bodyBackgroundColor }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0 }}
    exit={{ zIndex: 10, opacity: 0.5 }}
    transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.9, delay: 0 }}
  ></motion.div>
);

const TransitionWipe = ({ children }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  const { routeInfo } = useContext(RouteContext);
  const [destRoute, setDestRoute] = useState('');

  useEffect(() => {
    setDestRoute(routeInfo.destRoute);
  }, [routeInfo]);

  return (
    <LayoutGroup>
      
        <>
          <TransitionContent currentTheme={currentTheme} />
          <Overlay currentTheme={currentTheme} />
        </>
      
    </LayoutGroup>
  );
};

export default TransitionWipe;
