'use client';

import { motion } from "../../utils/motion";

export default function TextAnimSwap({ icon, text, isHover, className = "" }) {
  return (
    <motion.div 
      className={`relative flex flex-col items-center w-full ${className}`}
      initial={{ y: 0 }}
      animate={{ y: isHover ? -20 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.span 
        className="relative z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isHover ? 0 : 1 }}
        transition={{ duration: 0.3}}
      >
        {icon}
      </motion.span>
      <motion.span 
        className="absolute w-full text-xs text-center uppercase top-6 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isHover ? 1 : 0,
          y: isHover ? 0 : 10
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
} 