"use client"; // Add this line

import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TransitionPage from "../components/transition/pageTransition";
import PropTypes from "prop-types";

//pageWidth = LayoutType.FLUID
const Layout = ({ children }) => {
  return (
    <TransitionPage>
        <SpeedInsights />
        {children}
    </TransitionPage>
  );
}

// Layout.propTypes = {
//   pageWidth: PropTypes.oneOf(Object.values(LayoutType)),
// };

export default Layout;
