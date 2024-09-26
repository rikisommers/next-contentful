"use client";

import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RouteContext } from "../../components/routeContext";
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
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionFade;
