import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../appContext";
import { motion } from "framer-motion";

const CursorProject = () => {
  const { mousePosition } = useContext(AppContext);

  return (
    <motion.div
      className="custom-c top-0 left-0 text-14 font-bold leading-none absolute p-2 rounded-full flex text-center items-center w-auto text-white bg-black bg-opacity-50"
      style={{
        x: mousePosition?.x,
        y: mousePosition?.y,
      }}
    >
      View Project {mousePosition.x}
      {mousePosition.y}
    </motion.div>
  );
};
export default CursorProject;
