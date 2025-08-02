"use client"

import React, { useEffect, useRef } from "react";
import Lenis from '@studio-freight/lenis';

export default function ThemeScrollContainer({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // Create a separate Lenis instance for the theme editor
    lenisRef.current = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      }
    }

    requestAnimationFrame(raf);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      if (lenisRef.current) lenisRef.current.resize();
    };

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef} 
      className="overflow-hidden h-full theme-editor-scroll"
    >
      <div 
        ref={contentRef} 
        className="h-full theme-editor-content"
      >
        {children}
      </div>
    </div>
  );
}