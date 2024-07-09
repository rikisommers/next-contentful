"use client"

import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import {
    motion,
    cubicBezier,
    useMotionValue,
    useTransform,
    useScroll,
    useMotionValueEvent,
  } from "framer-motion";
import { Scroll } from "@react-three/drei";

export default function ScrollContainer({ children }) {


  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);

    requestAnimationFrame(raf);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
   <>
    {children}
   </>
  );
};
