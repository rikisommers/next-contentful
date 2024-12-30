"use client";

import { useEffect, useState } from "react";
import { motion, controls, useAnimation, stagger } from "framer-motion";




const PageNav = ({ content }) => {
  const [isMenuActive, toggleMenuActive] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isOpen ? 'visible' : 'hidden');
  }, [controls, isOpen]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleMenuMouseEnter = () => {
    if (!isOpen) {
      setIsOpen(true); // Ensure menu stays closed when hovered over
    }
  };

  const handleMenuMouseLeave = () => {
    if (isOpen) {
      setIsOpen(false); // Close menu when mouse leaves menu
    }
  };

  const subMenuAnimate = {
    visible: {
      opacity: 1,
      scale:1,
      display:'block', 
    },
    hidden: {
      opacity:0, 
      scale:0.9,
      transitionEnd: {
          display: "none",
        },
    
    },
    transition:{ 
      type: "spring", stiffness: 100,
      staggerChildren: 0.2,
      delayChildren:0.3,
     }
    
  };

  const subMenuItemAnimate = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity:0,     
    },
    transition:{ type: "spring", stiffness: 100 }
  };


 


  return (
    <div className="relative">
      <nav className="fixed right-0 z-50 flex flex-col self-start justify-center h-screen">

      <div className="relative grid grid-cols-[1fr_2rem_0.5rem_0.5rem] items-center grid-rows-1" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
     
      <motion.div
        className="z-40 col-start-1 col-end-4 row-span-1 row-start-1 origin-center rounded-lg shadow-xl "
        initial="hidden"
      
        animate={controls}
        variants={subMenuAnimate}
        transition={{ duration: 0.2 }}
        onMouseEnter={isOpen ? handleMenuMouseEnter : null}
        onMouseLeave={isOpen ? handleMenuMouseLeave : null}
        style={{
          backgroundColor:'var(--nav-bg)',
        }}
      >
            <ul className="flex flex-col p-4 mr-[40px]"
            style={{
             //transform: 'translateX(calc(-100% + 40px))',
            }}
            >
              {content &&
                content.length > 0 &&
                content.map((item, index) => {
                  return (
                    <motion.li 
                    animate={controls}
                    variants={subMenuItemAnimate}
                    key={index} className="px-2 py-1 text-sm transition-colors rounded-md hover:bg-slate-200">
                      <a href={`#${item.title}`} className="no-underline"
                      style={{
                        color:'var(--text-color)'
                      }}
                      >
                        {item.title}
                      </a>
                    </motion.li>
                  );
                })}
            </ul>
      </motion.div>

      <ul
              id="trigger"
              className="relative z-50 flex flex-col items-end col-start-2 row-span-1 row-start-1 gap-3 px-3 py-4 transition-all rounded-lg pointer-events-auto hover:gap-4 col-emd-3 trigger ml-50 "
              style={{backgroundColor:'var(--nav-bg)'}}

           >
              {content &&
                content.length > 0 &&
                content.map((item, index) => {
                  return (
                    <li key={index}
                    style={{backgroundColor:'var(--subtext-color)'}}
                    >
                      <a href={`#${item.title}`}  className="flex w-2 h-0.5 rounded-sm"
                        
                      >
                    
                      </a>
                    </li>
                  );
                })}
            </ul>
            
    </div>




        {/* <ul
            id="menu-trigger"
            className="z-50 flex flex-col items-end gap-3 p-3 pointer-events-auto ml-50 hover:bg-red-600"
            onMouseEnter={handleHoverStart}

          >

            <h1>ss{isMenuActive ? 't' : 'f'}</h1>
            {content &&
              content.length > 0 &&
              content.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex w-6 h-1 text-red-400 rounded-sm bg-slate-300">
                      -
                    </div>
                  </div>
                );
              })}
          </ul>
          <motion.div
            id="menu"
            className="absolute top-0 z-40 p-6 rounded-md shadow-lg bg-slate-300"
            initial="exit"
            animate={isMenuActive ? "enter" : "exit"}
            variants={subMenuAnimate}
            onMouseLeave={handleHoverEnd}

          >
            <ul className="flex flex-col gap-3" 
                        >
              {content &&
                content.length > 0 &&
                content.map((item, index) => {
                  return (
                    <li key={index} className="text-sm ">
                      <a href={`#${item.title}`} className="no-underline">
                        {item.title}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </motion.div> */}
      </nav>
    </div>
  );
};

export default PageNav;
