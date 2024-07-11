import React from "react";
import { motion } from "framer-motion";

const Button = ({label, click}) => {
  return <motion.div onClick={click} 
  className="relative flex items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer text-slate-300">{label && label}</motion.div>;
};
export default Button;
