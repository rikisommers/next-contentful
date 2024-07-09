import { useEffect, useState, useRef } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { ScrollableBox } from "../utils/scrollable";
import NextPost from "./post-next";
import Close from "../base/close";


const Modal = ({
  isOpen,
  onClose,
  children,
  nextPost,
  reset,
  name,
  setName,
  slug
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [cpv, setCpv] = useState(null);

  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };


  const router = useRouter();
  const post = router.query.post;

  const [scrollValue, setScrollValue] = useState(0);

  const handleScrollChange = (value) => {
    setScrollValue(value);

    if (value <= 1000) {
      x.set(value);

      if (value <= 200) {
        setIsActive(false);
      }

      if (value > 200) {
        setScrollValue(0);
        setScrollValue(0);
        setIsActive(true);
      }
    }
  };

  useEffect(() => {
    if (isClosing === true) {
      setIsActive(true);
    }
  }, [isClosing]);
  useEffect(() => {
    if (isClosing === true) {
      setIsActive(true);
    }
  }, [isClosing]);

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
//  const clipPathValueInitial = `inset(90vh 0px 0px round 8rem 8rem 0rem 0rem)`;
  const clipPathValueExit = `inset(0px 0px 100vh round 8rem 8rem 8rem 8rem)`;





  const scrollRef = useRef(null);

  const closeModal = () => {
    setScrollValue(0);
    onClose();
    handleResetLenis;
    console.log("closing from modal onCLose");

    clipPathValue = clipPathValueExit;
  };

  const modalRef = useRef(null);

  useEffect(() => {
    setCpv(clipPathValue);
  }, [isOpen]);


  const bgVariants = {
    active: { opacity: 1 },
    inactive: { opacity: 0 },
    transition: {
      duration: 0.3,
    },
  };
  const wrapperVariants = {
    active: {
      y: 0,
    },
    inactive: {
      y: "100vh",
    },
  };
  

  const handleResetLenis = () => {
    if (scrollRef.current) {
      scrollRef.current.resetLenis();
    }
  };

  return (
    <>
      <motion.div
        ref={modalRef}
        initial={"inactive"}
        animate={isOpen ? "active" : "inactive"}
        variants={wrapperVariants}
        transition={{
          duration: 0.6,
          ease: [0.33, 1, 0.68, 1],
        }}
        style={{ clipPath: clipPathValue }}
        className="fixed w-full h-full top-0 z-80 flex inset shadow-2xl"
      >
  
        <Close isActive={isActive} onClick={() => closeModal()}/>

        <motion.div className="bg-white z-10 flex flex-grow">
          <ScrollableBox
            ref={scrollRef}
            onScrollChange={handleScrollChange}
            onClose={closeModal}
            orientation={"vertical"}
            name={name}
            setName={setName}
          >
            <motion.article
              className="py-32  relative z-10 overflow-hidden mb-vhh bg-white rounded-xl"
              initial={{
                y: "100vh",
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                y: router.pathname === "/posts/[slug]" ? "-36vh" : 0,
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                duration: 0.6,
              }}
            >
              {children}
            </motion.article>
          </ScrollableBox>
        </motion.div>
      </motion.div>


    </>
  );
};

export default Modal;
