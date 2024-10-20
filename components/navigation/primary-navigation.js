import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import { useScrollPosition } from "../scrollPosContext";

import ThemeEditor from "../../utils/themeEditor";
import Button, { ButtonType, ButtonSound } from "../base/button";
import ButtonAlt from "../base/button-alt";
import Modal, {
  ModalDirection,
  ModalWidth,
  ModalPosition,
} from "../base/modal";
import Link from "next/link";
import { useThemeContext } from "../themeContext";


export default function Navigation() {
  const router = useRouter();
  const menuRef = useRef(null);
  const containerRef = useRef(null);

  const menuDragRef = useRef("menuDragRef");
  //const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isThemeDialogOpen, setIsThemeDialogOpen } = useThemeContext();

  const { currentTheme } = useThemeContext();



  const [edges, setEdges] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });
  const [orientation, setOrientation] = useState("");

  // Function to toggle the ThemeEditor modal
  const toggleThemeEditor = () => {
    setIsThemeDialogOpen((prev) => !prev);
  };

  // useEffect(() => {
  //   if (menuRef.current && menuDragRef.current) {
  //     // Initialize Draggable when both menuRef and menuDragRef are available
  //     Draggable.create(menuRef.current, {
  //       type: "x,y",
  //       edgeResistance: 0.65,
  //       trigger: menuDragRef.current, // Use menuDragRef.current instead of menuDragRef
  //     });
  //   }
  // }, [menuRef, menuDragRef]); // Include both refs in the dependency array to handle re-renders correctly

  // useEffect(() => {
  //   if (menuRef.current && menuDragRef.current) {

  //       const navRect = menuRef.current.getBoundingClientRect();
  //       const navSize = navRect.width;
  //       const threshold = navSize / 2; // Use half of the nav width as threshold

  //       // Update orientation based on drag position
  //       setOrientation(
  //         navRect.left <= threshold || navRect.right >= window.innerWidth - threshold
  //           ? "flex-col"
  //           : ""
  //       );

  //   }
  // }, [menuRef, menuDragRef]);

  useEffect(() => {
    if (router.asPath !== router.route) {
      if (router.asPath === "/") {
        setOffset(20);
      } else if (router.asPath === "/posts") {
        setOffset(-50);
      }
    }
  }, [router.asPath, router.route]);

  // useEffect(() => {
  //   if (scrollPosition < 7) {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [scrollPosition]);

  const pages = [
    { id: "home", title: "Home", url: "/" },
    { id: "work", title: "Work", url: "/work" },
    { id: "blog", title: "Blog", url: "/blog" },
    { id: "about", title: "About", url: "/bio" },
  ];


  const getNavigationStyle = (navigationStyle) => {
    switch (navigationStyle) {
      case 'solid':
        return currentTheme.navBg;
      case 'transparent':
        return hexToRgba(currentTheme.navBg, 0.5);
      default:
        return ''; // Return an empty string if no match
    }
  };

 const hexToRgba = (hex, alpha) => {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');
  
    // Parse r, g, b values
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      throw new Error('Invalid HEX color format');
    }
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  const getNavigationPositionClass = (navigationPosition) => {
    switch (navigationPosition) {
      case 'topLeft':
        return '(col-start-1 col-span-1 row-span-1 row-start-1)';
      case 'topCenter':
        return 'col-start-2 col-span-1 row-span-1 row-start-1';
      case 'topRight':
        return 'col-start-3 col-span-1 row-span-1 row-start-1';
      case 'bottomCenter':
        return 'col-start-2 col-span-1 row-span-1 row-start-3';
      default:
        return ''; // Return an empty string if no match
    }
  };
  
  const [activePage, setActivePage] = useState(pages[0].id);

  return (
    <>
      <div ref={containerRef} className="fixed pointer-events-none left-0 top-0 w-screen h-screen z-50 px-3 pt-3 pb-16 grid grid-rows-[48px_1fr_48px] grid-cols-[1fr_1fr_1fr] ">
       
      <motion.div
          style={{
            backgroundColor: "var(--accent)",
            color:
              router.asPath === "/"
                ? "var(--text-color)"
                : "var(--heading-color)",
          }}
          whileHover={{
            style: {
              backgroundColor: "var(--heading-color)",
            },
          }}
          className={` pointer-events-auto col-start-1  col-span-1 row-span-1 row-start-1 z-50 flex items-center rounded-xl px-4`}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "var(--accent-pri)" }}
          ></div>
          <span
            className="self-center p-3 font-mono text-sm cursor-pointer page-title"
            style={{ color: "var(--text-color)" }}
            onClick={() => setIsModalOpen(true)}
          >
            'Available for work'
          </span>
        </motion.div>
        
        <motion.div
          drag
          ref={menuRef}
          dragMomentum={0}
          dragConstraints={containerRef}
          dragSnapToOrigin={false}
          style={{
            backgroundColor:getNavigationStyle(currentTheme.navigationStyle),
            boxShadow: `0 10px 15px -3px ${currentTheme.navShadow}, 0 4px 49px -4px ${currentTheme.navShadow}`,
          }}
          className={`${getNavigationPositionClass(currentTheme.navigationPosition)} shadow-lg backdrop-opacity-95 opacity(0.95); backdrop-blur-lg pointer-events-auto  z-50 flex ${orientation} gap-1 rounded-xl`}
        >
          <div ref={menuDragRef}>DD</div>
          <h1 className="text-xs text-white">{currentTheme.navigationPosition}</h1>
          {pages.map((page) => (
            <Link
              key={page.id}
              href={page.url}
              scroll={false}
              onClick={() => setActivePage(page.id)}
              className="relative flex items-center text-sm uppercase rounded-lg"
              style={{ color: "var(--heading-color)" }}
            >
              {activePage === page.id && (
                <motion.div
                  layoutId="indicator"
                  style={{
                    backgroundColor: "var(--accent-pri)",
                  }}
                  className="absolute top-0 left-0 flex w-full h-full bg-opacity-50 rounded-xl"
                ></motion.div>
              )}
              <Button label={page.title} type={ButtonType.TRANSPARENT} />
            </Link>
          ))}
          <Button
            label={"Contact"}
            sound={ButtonSound.ON}
            type={ButtonType.TRANSPARENT}
          ></Button>
        </motion.div>
       

        {/* <motion.div
        style={{
          backgroundColor: 'var(--accent',
          color:
            router.asPath === "/"
              ? 'var(--text-color)'
              : 'var(--heading-color)',
        }}
        className={`relative z-50 flex items-center rounded-xl`}
      >
        <div className={`scene bg-opacity-80 backdrop-blur-sm`} 
          style={{backgroundColor:'var(--accent-pri)'}}
        >
          <div
            style={{
              backgroundColor: isActive ? 'var(--accent)' : 'var(--text-accent)',
            }}
            className={`cube ${isActive ? "show-right" : ""}`}
          >
            <div className="cube__face cube__face--front">
              <img src="/logo3.svg" viewBox="0 0 32 32"></img>
            </div>
            <div className="cube__face cube__face--back "></div>
            <div className=" cube__face cube__face--right">
             <img src="/back.svg" viewBox="0 0 32 32"></img>

            </div>
            <div className="cube__face cube__face--left "></div>
            <div className="cube__face cube__face--top "></div>
            <div className="cube__face cube__face--bottom "></div>
          </div>
        </div>

        <motion.span
          className="self-center p-3 text-sm font-aon"
          style={{ color: 'var(--text-heading)' }}
          layoutId="title"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
            delay: 0,
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          }}
        >
           <TextTitle content={ isActive ? 'Back' : 'Riki Sommers'}/> 
          Riki Sommers
        </motion.span>
      </motion.div> */}

        <motion.div className="fixed z-50 flex items-center gap-1 rounded-lg top-3 right-3">
          <Button
            click={toggleThemeEditor}
            label={"Theme"}
            type={ButtonType.SECONDARY}
          />

          <ButtonAlt
            click={toggleThemeEditor}
            type={ButtonType.PRIMARY}
            label={"Theme"}
          />
        </motion.div>
      </div>

      {/* Modal for "Available for work" */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        direction={ModalDirection.RIGHT}
        width={ModalWidth.PANEL_SM}
        position={ModalPosition.BOTTOM_RIGHT}
      >
        <div
          className="p-8 h-vh66"
          style={{ backgroundColor: "var(--accent-pri)" }}
        >
          <h2>Hello, I'm available for work!</h2>
          <p>
            This is some sample content for the modal. You can customize this as
            needed.
          </p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </Modal>

      {/* Modal for ThemeEditor */}
      <Modal
        isOpen={isThemeDialogOpen}
        onClose={toggleThemeEditor}
        direction={ModalDirection.RIGHT}
        width={ModalWidth.PANEL_SM}
        position={ModalPosition.BOTTOM_RIGHT}
        bodyClass="theme-dialog-open"
      >
        <div className="w-full h-screen p-8 overflow-y-auto">
          <h2>Theme Editor</h2>
          <ThemeEditor />
          <button onClick={toggleThemeEditor}>Close</button>
        </div>
      </Modal>
    </>
  );
}
