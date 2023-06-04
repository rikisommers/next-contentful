import { useEffect, useState, useRef } from "react";
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

const Modal = ({ isOpen, onClose, children, nextPost }) => {
  
  const [isClosing, setIsClosing] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();


  const [scrollValue, setScrollValue] = useState(0);

  const handleScrollChange = (value) => {

    setScrollValue(value);

      if(value <= 1000){
      x.set(value)
     // console.log('sv',scrollValue)

      if(value <= 200){
        setIsActive(false)
      }

      if(value > 200){
        setIsActive(true)
      }
     // console.log('isActive',isActive)

      }
  };

  // useEffect(()=> {
  //   // if(scrollValue <= 200){
  //   //   setIsActive(true)
  //   // }
  // },[scrollValue])





  const easing = cubicBezier(0.33, 1, 0.68, 1);
  const x = useMotionValue(0);

  const input = [0, 200];
  const cpyo = [8, 0.01];
  const cpxo = [1.5, 0.01];
  const ro = [1, 0];

  const yv = useTransform(x, input, cpyo, { easing });
  const xv = useTransform(x, input, cpxo, { easing });
  const rv = useTransform(x, input, ro, { easing });

  const clipPathValue = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem 0px 0px)`;




  const closeModal = () => {
    onClose()
    //router.push('/posts')
    // setIsClosing(true);
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
    if (!isOpen) {
      modalRef.current.scrollTop = 0; // Scroll to top when modal is closed
    }
  }, [isOpen]);



  
  const variants = {
    active: { opacity: 0.3 },
    inactive: { opacity: 0 },
    hover: { 
      background: 'red',
      opacity: 1
    },
  };

  const bgVariants = {
    active: { opacity: 1 },
    inactive: { opacity: 0 },
    transition:{
      duration: 0.3 
    }

  };
  const wrapperVariants = {
    active: {
      y: 0,
      opacity: 1,
     },
    inactive: {
      opacity: 0,
      y: "100vh",
     }
  };


  return (
    <>
    
  

    

            {/* <motion.div 
            className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-30"
            animate={isOpen ? "active" : "inactive"}
            exit={{opacity:1, y:0}}
            variants={bgVariants}
        
            >
            </motion.div> */}

            <motion.button
                onClick={() => closeModal()}
                animate={isActive ? "active" : "inactive"}
                whileHover={'hover'}
                variants={variants}

                className="fixed top-6 right-36 z-50 bg-black text-white p-2 rounded-3xl">
                Closes
            </motion.button>

          
          <motion.div
            ref={modalRef}
            initial={{y:'100vh'}}
            animate={isOpen ? "active" : "inactive"}
            variants={wrapperVariants}
            transition={{
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{ clipPath: clipPathValue }}
          
            className="fixed w-full h-full top-0 z-30 flex inset "
          >
 
            <motion.div
              className="bg-white z-10 flex flex-grow"

              // variants={wrapperVariants}
              ///animate={!isActive ? "initial" : "animate"}

              //   initial={{ opacity: 0, scale: 0.8 }}
              //   animate={{ opacity: 1, scale: 1 }}
              //exit={{ opacity: 0, scale: 0.8 }}
              //transition={{ duration: 0.3 }}
            >
              
              <ScrollableBox onScrollChange={handleScrollChange}>
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
                opacity: 1,
               // y: "-64vh",
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                duration: 1.6,
              }}
            >
                {children}
                </motion.article>
                {nextPost && isActive && (
                <CaseStudyNext next={true} post={nextPost} />
                )}
              </ScrollableBox>
        

            </motion.div>
    
          {/* </motion.div> */}

        </motion.div>
        </>

    
    
  );
};

export default Modal;