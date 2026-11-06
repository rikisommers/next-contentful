"use client";

import React, { useEffect } from "react";
import { getLenisInstance } from "./lenisInstance";

/**
 * Starts smooth scrolling (Lenis) for its page and keeps it sized on resize.
 * The Lenis instance is shared and kept alive across route changes.
 */
export default function ScrollContainer({ children }) {
  useEffect(() => {
    const lenis = getLenisInstance();
    if (!lenis) return undefined;

    const resize = () => lenis.resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <>{children}</>;
}
