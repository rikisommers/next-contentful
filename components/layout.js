"use client"; // Add this line

import React, { useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useThemeContext } from "./themeContext";
import TransitionPage from "../components/transition/pageTransition";

export default function Layout({ children }) {
  const { currentTheme } = useThemeContext();

  // useEffect(() => {
  //   console.log('Theme updated in Layout:', currentTheme);
  //   // You can add any additional logic here that should run when the theme changes
  // }, [currentTheme]);

  return (
    <TransitionPage>
    <div
      className="relative"
      style={{
        backgroundColor: "var(--body-background-color)",
      }}
    >
      <div
        className={`${
          currentTheme.pageWidth === "fluid"
            ? "max-w-none mx-auto"
            : currentTheme.pageWidth === "large"
            ? "max-w-screen-xl mx-auto"
            : currentTheme.pageWidth === "small"
            ? "max-w-screen-md mx-auto"
            : "max-w-screen-lg mx-auto"
        }`}
      >
        {/* <h1 className="fixed p-3 text-3xl font-bold top-16 left-16 z-nav">PageWidth: {currentTheme.pageWidth} </h1> */}
        <SpeedInsights />

        {children}
      </div>
    </div>
    </TransitionPage>
  );
}
