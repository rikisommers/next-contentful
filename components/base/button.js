import React from "react";
import { motion } from "framer-motion";

const Button = ({label}) => {
  return <motion.div className="custom-c">{label && label}</motion.div>;
};
export default Button;
