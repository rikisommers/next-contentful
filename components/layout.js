
import React, { useState, useEffect, useContext } from "react";
import { RouteContext } from "./routeContext";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useTheme } from 'next-themes';
import { themes } from "../utils/theme";
import { getThemeByKey } from '../utils/theme';

export default function Layout({ children }) {

  const { routeInfo } = useContext(RouteContext);
  const { theme } = useTheme()
  const currentTheme = getThemeByKey(theme) | null;
  // ${routeInfo.destRoute === "/" ? "bg-gray-800" :  "bg-slate-50"}
  return (
      <div className={`${currentTheme?.bodyBackgroundColor}`}>
        <SpeedInsights/>
      {children}
      </div>
  );
}
