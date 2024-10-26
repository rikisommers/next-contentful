import React, { useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
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
import { useThemeContext } from "../themeContext";
import NavBar from "./navbar";

export default function Navigation() {
  const router = useRouter();
  const containerRef = useRef(null);

  const menuDragRef = useRef("menuDragRef");
  //const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isThemeDialogOpen, setIsThemeDialogOpen } = useThemeContext();


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


 

  return (
    <>
      <div
        ref={containerRef}
        className="fixed pointer-events-none left-0 top-0 w-screen h-screen z-50 p-3 grid grid-rows-[48px_1fr_48px_48px] grid-cols-[1fr_1fr_1fr] "
      >

        <div className="flex col-span-1 col-start-1 row-span-1 row-start-1">
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
            className={` pointer-events-auto z-50 flex items-center rounded-xl px-4`}
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
            style={{
              backgroundColor: "var(--accent",
              color:
                router.asPath === "/"
                  ? "var(--text-color)"
                  : "var(--heading-color)",
            }}
            className={`relative z-50 flex items-center rounded-xl`}
          >
            <div
              className={`scene bg-opacity-80 backdrop-blur-sm`}
              // style={{ backgroundColor: "var(--accent-pri)" }}
            >
              <div
                style={{
                  backgroundColor: isActive
                    ? "var(--accent)"
                    : "var(--text-accent)",
                }}
                className={`cube ${isActive ? "show-right" : ""}`}
              >
                <div className="cube__face cube__face--front">
                  <div className="h-[32px] relative">
                  <img src="/shapes/star.svg" viewBox="0 0 32 32" className="h-full"></img>
                  </div>
                </div>
                <div className="cube__face cube__face--back "></div>
                <div className=" cube__face cube__face--right">
                <div className="h-[32px] relative">
                <img src="/shapes/tri.svg" viewBox="0 0 32 32" className="h-full"></img>
                  </div>
                </div>
                <div className="cube__face cube__face--left "></div>
                <div className="cube__face cube__face--top "></div>
                <div className="cube__face cube__face--bottom "></div>
              </div>
            </div>

            <motion.span
              className="self-center p-3 text-sm font-aon"
              style={{ color: "var(--text-heading)" }}
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
            
              Riki Sommers
            </motion.span>
          </motion.div>
              
</div>
   
{/*             
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
        </motion.div> */}

        <NavBar containerRef={containerRef}/>


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
