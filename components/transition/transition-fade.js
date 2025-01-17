"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { RouteContext } from "../context/routeContext";
import { useTheme } from "next-themes";
import { useThemeContext } from "../../components/context/themeContext";

const Overlay = ({ currentTheme, children }) => (
  <motion.div
    className="fixed top-0 left-0 z-40 w-full h-full pointer-events-none"
    style={{ backgroundColor: currentTheme.data.backgroundColor }}
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    exit={{ opacity: 1 }}
    transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.3, delay: 0 }}
  />
);

const TransitionFade = ({ children, onComplete }) => {
  const { currentTheme } = useThemeContext();
  const { routeInfo } = useContext(RouteContext);

  return (
    <LayoutGroup>
      <Overlay currentTheme={currentTheme} />
      {children}
    </LayoutGroup>
  );
};

export default TransitionFade;
