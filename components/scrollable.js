import { useFrame } from '@studio-freight/hamo'
import Lenis from '@studio-freight/lenis'
import { useLenis } from '@studio-freight/react-lenis'
import { useEffect, useRef, useState } from 'react'

export function ScrollableBox({ children, className, infinite, reset, onScrollChange, stopScroll }) {
  const [lenis, setLenis] = useState()
  const wrapperRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapperRef.current, // element which has overflow
      content: contentRef.current, // usually wrapper's direct child
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      infinite: infinite,
    })
    lenis.start()
    setLenis(lenis)

    return () => {
      lenis.destroy()
    }
  }, [])

  useFrame((time) => {
    lenis?.raf(time)
    if(onScrollChange){
        onScrollChange(lenis?.animatedScroll); // Call the callback function and pass the scroll value
    }
  }, [])



  useEffect(() => {
    if (reset) {
      lenis?.scrollTo(0, { immediate: true })
    }
  }, [reset])

  useEffect(() => {

    if (stopScroll) {
      lenis?.stop()
    }
  }, [stopScroll])

  return (
    <div className="fixed w-full h-full top-0 flex inset">

    <div className="scrollable" ref={wrapperRef} >
      <div ref={contentRef}>{children}</div>
    </div>
    </div>
  )
}