"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "../../utils/motion";

const PageNav = ({ content }) => {
  const [isMenuActive, toggleMenuActive] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isOpen ? "animate" : "initial");
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id); // Set the active item based on the ID of the intersecting element
        }
      });
    });

    // Observe each section
    content.forEach((item) => {
      const section = document.getElementById(item.title); // Assuming each section has an ID matching the item title
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      // Cleanup the observer on unmount
      content.forEach((item) => {
        const section = document.getElementById(item.title);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [content]);

  const subMenuAnimate = {
    animate: {
      opacity: 1,
      scale: 1,
      display: "block",
      transition: {
        type: "spring",
        stiffness: 100,
        staggerChildren: 0.05,
      },
    },
    initial: {
      opacity: 0.9,
      scale: 0.9,
      transitionEnd: {
          display: "none",
      },
    },
  };

  const childVariants = {
    animate: {
      opacity: 1,
    },
    initial: {
      opacity: 0.2,
    },
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1],
    },
  };

  const indicatorAnimate = {
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        staggerChildren: 0.05,
      },
    },
    initial: {
      opacity: 0.9,
      scale: 0.9,
    },
  };

  return (
   
        <div
          className="group relative grid grid-cols-[1fr_2rem_0.5rem_0.5rem] h-full items-center grid-rows-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.ul
            className="flex flex-col p-4 pr-[40px] z-40 col-start-1 col-end-4 row-span-1 row-start-1 origin-center rounded-lg shadow-xl origin-right
"
            initial="initial"
            animate={controls}
            variants={subMenuAnimate}
            transition={{ duration: 0.2 }}
            onMouseEnter={isOpen ? handleMenuMouseEnter : null}
            onMouseLeave={isOpen ? handleMenuMouseLeave : null}
          //  onBlur={handleMenuMouseLeave} 

            style={{
              backgroundColor: "var(--surface2)",
            }}
          >
            {content &&
              content.length > 0 &&
              content.map((item, index) => {
                return (
                  <motion.li
                    variants={childVariants}
                    key={index}
                    className={`relative px-2 py-1 mb-1 text-sm rounded-md transition-colors hover:bg-slate-200`}
                    whileHover={{
                      backgroundColor: "var(--body-background-color)",
                    }}
                  >
                    {activeItem === item.title && (
                      <motion.div
                        layoutid="indicatorSection"
                        style={{
                          backgroundColor: "var(--body-background-color)",
                        }}
                        className="flex absolute top-0 left-0 z-0 w-full h-full bg-opacity-20 rounded-md"
                      ></motion.div>
                    )}

                    <a
                      href={`#${item.title}`}
                      className="relative z-50 no-underline"
                      style={{
                        color:
                          activeItem === item.title
                            ? "var(--text-accent)"
                              : "var(--text-color)",
                        }}
                    >
                      {item.title}
                    </a>
                  </motion.li>
                );
              })}
          </motion.ul>

          <motion.ul
            id="trigger"
            className="flex relative z-50 flex-col col-start-2 col-end-3 row-span-1 row-start-1 gap-4 items-end px-3 py-4 rounded-lg transition-all pointer-events-none trigger"
           // style={{ backgroundColor: "var(--nav-bg)" }}
            variants={indicatorAnimate}
            animate={controls}
          >
            {content &&
              content.length > 0 &&
              content.map((item, index) => {
                return (
                  <li
                    className="relative"
                    key={index}

                    style={{
                      backgroundColor:
                        activeItem === item.title
                          ? "var(--text-accent)"
                          : "var(--surface3)",
                    }}
                  >
                    {/* {activeItem === item.title && (
                      <motion.div
                        layoutId="indicatorSectionSm"
                        style={{
                          backgroundColor: "var(--accent-pri)",
                          x:'-50%'
                        }}
                        className="flex absolute top-0 right-0 z-0 w-5 h-5 bg-opacity-50 rounded-xs"
                      ></motion.div>
                    )} */}

                    <a
                                  onFocus={handleMenuMouseEnter} // Open menu on focus
                      href={`#${item.title}`}
                      className="flex w-2 h-0.5 rounded-sm"
                    ></a>
                  </li>
                );
              })}
          </motion.ul>
        </div>

       

  );
};

export default PageNav;
