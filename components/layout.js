"use client"; // Add this line

import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TransitionPage from "../components/transition/pageTransition";
import PropTypes from "prop-types";
import { useThemeContext } from "./context/themeContext";

const LayoutType = {
  FLUID: "fluid",
  LARGE: "large",
  SMALL: "small",
  DEFAULT: "default", // You can define a default option if needed
};

//pageWidth = LayoutType.FLUID
const Layout = ({ children }) => {
  const { currentTheme } = useThemeContext();
  const pageWidth = currentTheme.data.pageWidth;
  return (
    <TransitionPage>
      <div
        className={`${
          pageWidth === LayoutType.FLUID
            ? "max-w-none mx-auto"
            : pageWidth === LayoutType.LARGE
            ? "max-w-screen-xl mx-auto"
            : pageWidth === LayoutType.SMALL
            ? "max-w-screen-md mx-auto"
            : "max-w-screen-lg mx-auto" // Default case
        }`}
      >
        <SpeedInsights />
        {children}
      </div>
    </TransitionPage>
  );
}

Layout.propTypes = {
  pageWidth: PropTypes.oneOf(Object.values(LayoutType)),
};

export default Layout;
export { LayoutType };