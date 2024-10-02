import React from "react";
import TransitionTilt from "./transition-tilt";
import TransitionWipe from "./transition-wipe";

const TransitionTiltAndWipe = ({ children }) => {

  return (
    <>
        <TransitionTilt active={true} className="z-100">{children}</TransitionTilt>
        <TransitionWipe/>
    </>
  );
};

export default TransitionTiltAndWipe;
