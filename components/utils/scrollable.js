import { useFrame } from "@studio-freight/hamo";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef, useState } from "react";
import { useScrollPosition } from "../scrollPosContext";

export function ScrollableBox({
  children,
  infinite,
  reset,
  onScrollChange,
  stopScroll,
  orientation,
}) {
  const [lenis, setLenis] = useState();
  const wrapperRef = useRef();
  const contentRef = useRef();
  const { scrollPosition, setScrollPosition } = useScrollPosition(); // Use the context hook to access scrollPosition

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      smoothWheel: true,
      orientation: orientation ? orientation : undefined,
      infinite: infinite,
    });
    lenis.start();
    setLenis(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);

  useFrame((time) => {
    lenis?.raf(time);
    if (onScrollChange) {
     // console.log('Scroll',lenis?.animatedScroll)
      setScrollPosition(lenis?.animatedScroll)
      onScrollChange(lenis?.animatedScroll)
    }
  }, []);

  const resetLenis = () => {
    lenis?.scrollTo(0, { immediate: true });
  };

  useEffect(() => {
    if (reset) {
      console.log("is reseting");
      resetLenis();
    }
  }, [reset]);

  useEffect(() => {
    if (stopScroll) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [stopScroll]);

  return (
      <div className="fixed w-full h-full top-0 flex inset z-10">
        <div className="scrollable" ref={wrapperRef}>
          <div ref={contentRef}>{children}</div>
        </div>
      </div>
  );
}
