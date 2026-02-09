"use client"; // Add this line

import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TransitionPage from "../components/transition/pageTransition";
import CursorDot from "../components/cursor/cursor-dot";
import CursorGabriel from "../components/cursor/cursor-gabriel";
import CursorCta from "./cursor/cursor-cta";
import { useThemeContext } from "./context/themeContext";

//pageWidth = LayoutType.FLUID
const Layout = ({ children }) => {

  const { currentTheme } = useThemeContext();

  return (
    <TransitionPage>
        <SpeedInsights />
        {currentTheme.data.cursor === "dot" && <CursorDot />}
        {currentTheme.data.cursor === "gabriel" && <CursorGabriel />}
        {currentTheme.data.cursor === "cta" && <CursorCta content="Hello" />}
        <main id="main-content" role="main">
          {children}
        </main>
    </TransitionPage>
  );
}

// Layout.propTypes = {
//   pageWidth: PropTypes.oneOf(Object.values(LayoutType)),
// };

export default Layout;
