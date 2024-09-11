import React, { useRef } from "react";
import { useThemeContext } from '../themeContext';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useScrollPosition } from "../scrollPosContext";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import CtxMenu from "../base/ctx-menu";
import ThemeEditor from "./themeEditor";
import Button, { ButtonType, ButtonSound } from "../base/button";
import AnimatedText, { AnimStyle } from "../motion/animated-text";
import Modal, { ModalDirection, ModalWidth, ModalPosition } from "../base/modal";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function Navigation() {
  const router = useRouter();
  const menuRef = useRef(null);
  const menuDragRef = useRef("menuDragRef");
  const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isThemeDialogOpen, setIsThemeDialogOpen } = useThemeContext();

  // Function to toggle the ThemeEditor modal
  const toggleThemeEditor = () => {
    setIsThemeDialogOpen(prev => !prev);
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      if (router.asPath === "/") {
        setOffset(20);
      } else if (router.asPath === "/posts") {
        setOffset(-50);
      }
    }
  }, [router.asPath, router.route]);

  useEffect(() => {
    if (scrollPosition < 7) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [scrollPosition]);

  const pages = [
    { id: "home", title: "Home", url: "/" },
    { id: "work", title: "Work", url: "/work" },
    { id: "blog", title: "Blog", url: "/blog" },
    { id: "about", title: "About", url: "/bio" },
  ];

  const [activePage, setActivePage] = useState(pages[0].id);

  return (
    <motion.div 
      className="fixed z-50 flex justify-between p-6 rounded-full"
      animate={{ 
        width: isThemeDialogOpen ? 'calc(100% - 400px)' : '100%' 
      }}
      transition={{
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      }}
          >
      <motion.div
        style={{
          backgroundColor: 'var(--accent-pri)',
          color: router.asPath === "/" ? 'var(--text-color)' : 'var(--heading-color)',
        }}
        whileHover={{
          style: {
            backgroundColor: 'var(--accent-pri)',
          }
        }}
        className={`relative z-50 flex items-center rounded-xl px-4`}
      >
        <div className="w-4 h-4 rounded-full" style={{backgroundColor:'var(--accent-sec)'}}></div>
        <span
          className="self-center p-3 font-mono text-sm cursor-pointer page-title"
          style={{ color: 'var(--text-color)' }}
          onClick={() => setIsModalOpen(true)}
        > 
          'Available for work'
        </span>
      </motion.div>

      <motion.div 
        ref={menuRef} 
        className="flex items-center gap-1 rounded-lg"
        animate={{ 
          x: isThemeDialogOpen ? '-200px' : 0 // Adjust this value as needed
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative z-50 flex gap-1 bg-black bg-opacity-50 rounded-xl backdrop-blur-lg">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={page.url}
              scroll={false}
              onClick={() => setActivePage(page.id)}
              className="relative flex items-center text-sm uppercase rounded-lg"
              style={{color: 'var(--text-color-inv)'}}
            >
              {activePage === page.id && (
                <motion.div
                  layoutId="indicator"
                  style={{
                    backgroundColor: 'var(--accent-pri)',
                  }}
                  className="absolute top-0 left-0 flex w-full h-full bg-opacity-50 rounded-xl"
                ></motion.div>
              )}
              <Button label={page.title} type={ButtonType.TRANSPARENT}/>
            </Link>
          ))}
          <Button label={'Contact'} sound={ButtonSound.ON} type={ButtonType.TRANSPARENT}></Button>
        </div>
      </motion.div>

      <motion.div 
        className="flex items-center gap-1 rounded-lg"
      >
        <div className="relative z-50 flex gap-1 bg-opacity-50 rounded-xl backdrop-blur-lg"
        style={{backgroundColor: 'var(--background-color)'}}>
          <Button label={"Audio"} />
          <div className="relative">
            <Button 
              click={toggleThemeEditor}
              label={"Theme"} 
              type={ButtonType.SECONDARY}
            />
          </div>
        </div>
      </motion.div>

      {/* Modal for "Available for work" */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        direction={ModalDirection.RIGHT}
        width={ModalWidth.PANEL_SM}
        position={ModalPosition.BOTTOM_RIGHT}
      >
        <div className="p-8 h-vh66"
             style={{backgroundColor: 'var(--accent-pri)'}}>
          <h2>Hello, I'm available for work!</h2>
          <p>This is some sample content for the modal. You can customize this as needed.</p>
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
        <div className="w-full h-screen p-8 overflow-y-auto"
             >
          <h2>Theme Editor</h2>
          <ThemeEditor />
          <button onClick={toggleThemeEditor}>Close</button>
        </div>
      </Modal>
    </motion.div>
  );
}
