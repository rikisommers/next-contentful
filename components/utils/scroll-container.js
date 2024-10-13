"use client"

import React, { useEffect, useState } from "react";
import { getLenisInstance, destroyLenisInstance} from "./lenisInstance";
import { useScrollPosition } from "../scrollPosContext";

export default function ScrollContainer({ children }) {
  const { setScrollPosition } = useScrollPosition();
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = getLenisInstance();
    setLenis(lenisInstance);

    const updateScroll = () => {
      setScrollPosition(lenisInstance.scroll);
    };

    lenisInstance.on('scroll', updateScroll);

    return () => {
      lenisInstance.off('scroll', updateScroll);
      // Note: We're not destroying the instance here
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      if (lenis) lenis.resize();
    };

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [lenis]);

  return (
   <>
    {children}
   </>
  );
}
