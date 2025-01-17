"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { RouteContext } from "../context/routeContext";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../../utils/theme';

const TransitionFade = ({ children }) => {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  const { routeInfo } = useContext(RouteContext);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeInfo.destRoute}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionFade;
