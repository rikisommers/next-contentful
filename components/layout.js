"use client";  // Add this line

import React, { useState, useEffect, useContext } from "react";
import { RouteContext } from "./routeContext";
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function Layout({ children }) {

  // ${routeInfo.destRoute === "/" ? "bg-gray-800" :  "bg-slate-50"}
  return (
      <>
        <SpeedInsights/>
        {children}
      </>
  );
}
