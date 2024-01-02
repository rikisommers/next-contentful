
import React, { useState, useEffect, useContext } from "react";
import { RouteContext } from "./routeContext";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Layout({ children }) {

  const { routeInfo } = useContext(RouteContext);
  // ${routeInfo.destRoute === "/" ? "bg-gray-800" :  "bg-slate-50"}
  return (
      <main className={`absolute w-full h-full 
      
      `} >
        <SpeedInsights/>
      {children}</main>
  );
}
