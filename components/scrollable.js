import { useFrame } from '@studio-freight/hamo';
import Lenis from '@studio-freight/lenis';
import { useLenis } from '@studio-freight/react-lenis';
import { useEffect, useRef, useState } from 'react';

export function ScrollableBox({ children, className, infinite, reset, onScrollChange, stopScroll ,name, onClose, orientation }) {
  const [lenis, setLenis] = useState();
  const wrapperRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapperRef.current, // element which has overflow
      content: contentRef.current, // usually wrapper's direct child
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      smoothWheel: true,
      orientation:orientation ? orientation : undefined,
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
      onScrollChange(lenis?.animatedScroll); // Call the callback function and pass the scroll value
    }
  }, []);

  const resetLenis = () => {
    lenis?.scrollTo(0, { immediate: true });
  };


  // useEffect(() => {
  //   if (reset) {

  //     console.log('is reseting')
  //     resetLenis();
  //   }
  // }, [onClose]);

  useEffect(() => {
    if (reset) {
      console.log('is reseting')
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

        <div ref={contentRef}>
        {/* <h1 className="absolute top-52 z-50 text-9xl text-indigo-900	">
          Name:{name}        
         <button className='p-32 bg-slate-400' onClick={resetLenis}>
          Reset Lenis
        </button></h1> */}

          {children}
          </div>
      </div>
    </div>
  );
}