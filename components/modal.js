import { useEffect, useState, useRef, useImperativeHandle } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  cubicBezier,
} from "framer-motion";
import { useRouter } from "next/router";
import { Lenis } from "@studio-freight/react-lenis";
import { getAllCaseStudies2 } from "../lib/api";
import { ScrollableBox } from "./scrollable";
import CaseStudyNext from "./case-study-next";
import Link from "next/link";
const Modal = ({ isOpen, onClose, children, nextPost, reset, name ,setName}) => {
 
  const [isClosing, setIsClosing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cpv, setCpv] = useState(null);

  const router = useRouter();
  const post = router.query.post
    const post = router.query.post
  
  const [scrollValue, setScrollValue] = useState(0);

  const handleScrollChange = (value) => {
    setScrollValue(value);
   // console.log(scrollValue)

   // console.log(scrollValue)


    if (value <= 1000) {
      x.set(value);
      // console.log('sv',scrollValue)
                
      if (value <= 200) {
        setIsActive(false);
      }

      if (value > 200) {
        setScrollValue(0)
        setScrollValue(0)
        setIsActive(true);
      }
      // console.log('isActive',isActive)
    }
  };

  useEffect(()=> {
    if(isClosing === true){
      setIsActive(true)
    }
  },[isClosing])
  useEffect(()=> {
    if(isClosing === true){
      setIsActive(true)
    }
  },[isClosing])

  const easing = cubicBezier(0.33, 1, 0.68, 1);
  const x = useMotionValue(0);

  const input = [0, 200];
  const cpyo = [8, 0.01];
  const cpxo = [1.5, 0.01];
  const ro = [1, 0];

  const yv = useTransform(x, input, cpyo, { easing });
  const xv = useTransform(x, input, cpxo, { easing });
  const rv = useTransform(x, input, ro, { easing });

  let clipPathValue = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem 0px 0px)`;
  const clipPathValueExit = `inset(0px 0px 100vh round 8rem 8rem 8rem 8rem)`;


  const scrollRef = useRef(null);



  const scrollRef = useRef(null);


  const closeModal = () => {
    setScrollValue(0)
    onClose();
    handleResetLenis
    console.log('closing from modal onCLose')
   // console.log(scrollRef.current)
   // router.push('/posts');

     clipPathValue = clipPathValueExit;
    // setTimeout(() => {
    //   setIsClosing(false);
    //   onClose();
    // }, 600); // Adjust the duration to match your transition animation
  };

  // if (!isOpen && !isClosing) {
  //   return null;
  // }

  const modalRef = useRef(null);

  useEffect(() => {
    setCpv(clipPathValue)
    // if (!isOpen) {
    //   scrollRef.current.scrollValue(0) 
    // }
  }, [isOpen]);

  const variants = {
    active: { opacity: 0.3 },
    inactive: { opacity: 0 },
    hover: {
      background: "red",
      opacity: 1,
    },
  };

  const bgVariants = {
    active: { opacity: 1 },
    inactive: { opacity: 0 },
    transition: {
      duration: 0.3,
    },
  };
  const wrapperVariants = {
    active: {
      y: 0
    },
    inactive: {
      y: "100vh",
    },
  };


  const handleResetLenis = () => {
    // Call the resetLenis function in the Modal component
    if (scrollRef.current) {
      scrollRef.current.resetLenis();
    }
  };

  const handleStopScroll = () => {
    // Toggle the stopScroll prop in the Modal component
    setStopScroll((prevState) => !prevState);
  };


  return (
    <>
      <motion.div
        ref={modalRef}
        initial={'inactive'}
        animate={isOpen ? "active" : "inactive"}
        variants={wrapperVariants}
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
        }}
        style={{ clipPath: clipPathValue }}
        className="fixed w-full h-full top-0 z-30 flex inset shadow-2xl"
      >
     <motion.div
          onClick={() => closeModal()}
          animate={isActive ? "active" : "inactive"}
          whileHover={"hover"}
          variants={variants}
          className="fixed top-6 right-36 z-50 bg-black text-white p-2 rounded-3xl"
        >
          Closes
        </motion.div>

        <motion.div
          className="bg-white z-10 flex flex-grow"
          // initial={{
          //   y: "100vh",
          // }}
          // animate={{
          //   opacity: 1,
          //   y: 0,
          // }}
          // exit={{
          //   className:"bg-red",
          //   y: "-36vh",
          // }}
          // transition={{
          //   ease: [0.33, 1, 0.68, 1],
          //   duration: 0.6,
          // }}
          // variants={wrapperVariants}
          ///animate={!isActive ? "initial" : "animate"}

          //   initial={{ opacity: 0, scale: 0.8 }}
          //   animate={{ opacity: 1, scale: 1 }}
          //exit={{ opacity: 0, scale: 0.8 }}
          //transition={{ duration: 0.3 }}
        >
          <ScrollableBox 
          ref={scrollRef} 
          onScrollChange={handleScrollChange} 
          onClose={closeModal}
          orientation={'vertical'}
          name={name} 
          setName={
            setName
          }
          >

            <motion.article
              className="px-24 py-32  relative z-10 overflow-hidden mb-vhh bg-white rounded-xl"
              initial={{
                y: "100vh",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                y: (router.pathname === "/posts/[slug]") ? "-36vh"  : 0,
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                duration: 0.6,
              }}
            >
        {/* <h1 className="absolute z-50 text-9xl">Name:{name} <button onClick={setName}>CLICKC</button></h1> */}

              {children}
            </motion.article>
            {nextPost &&
           <CaseStudyNext post={nextPost} />
        } 
          </ScrollableBox>
        </motion.div>

        {/* </motion.div> */}
      </motion.div>
    
    </>
  );
};

export default Modal;
