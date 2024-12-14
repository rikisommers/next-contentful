"use client";

import { useEffect, useState } from "react";
import { motion, controls, useAnimation } from "framer-motion";
import CtxMenu from "./ctx-menu";

const PageNav = ({ content }) => {
  const [isMenuActive, toggleMenuActive] = useState(false);

  const handleHoverStart = () => {
    toggleMenuActive(true);
  };

  const handleHoverEnd = () => {
    toggleMenuActive(false);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <>
      <nav className="fixed right-0 z-50 flex flex-col self-start justify-center h-screen inset-y-1/3">
        <CtxMenu
          menuContent={
            <ul className="absolute p-2 bg-white "
            style={{
              transform: 'translateX(-100%)', // Add this line
    
            }}
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
          }
          buttonContent={
            <ul
              id="trigger"
              className="z-50 flex flex-col items-end gap-3 p-3 pointer-events-auto trigger ml-50"
            >
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
          }
        ></CtxMenu>

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
    </>
  );
};

export default PageNav;
