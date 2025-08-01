"use client";
import dynamic from "next/dynamic";

import React, { useRef } from "react";
import { motion } from "../../utils/motion";
import { useRouter } from "next/router";
import { useState } from "react";
import ThemeTrigger from "../base/theme-trigger";
//import { useScrollPosition } from "../scrollPosContext";
import ThemeEditor from "../../utils/themeEditor";
import ThemeScrollContainer from "../utils/theme-scroll-container";
import Button, { ButtonType, ButtonSize } from "../base/button/button";
// import ThemeEditor from "../../utils/themeEditor";
import Audio from "./audio";
import Modal, {
  ModalDirection,
  ModalWidth,
  ModalPosition,
} from "../base/modal";
import { useThemeContext } from "../context/themeContext";
import NavBar from "./navbar";
import Logo from "./logo";
import { X } from "@phosphor-icons/react/dist/icons/X";

export default function Navigation({ data, logo, customThemes }) {
  const router = useRouter();
  const containerRef = useRef(null);

  const menuDragRef = useRef("menuDragRef");
  //const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
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

  // console.log('menu:',data)
  // Function to toggle the ThemeEditor modal
  const toggleThemeEditor = () => {
    //  console.log("sdd");
    setIsModalOpen((prev) => !prev);
  };

  const toggleThemeEditor2 = () => {
    //  console.log("sdd");
    setIsThemeDialogOpen((prev) => !prev);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`theme-editor-active-offset ${
          currentTheme.data.navFixed
            ? "fixed h-dvh grid grid-cols-[150px_1fr_1fr_1fr_150px] grid-rows-[auto_1fr_1fr_1fr_auto]"
            : "absolute"
        } ${
          currentTheme.data.navBorder
            ? "border-solid border-b-[1px] border-t-0 border-l-0 border-r-0"
            : "border-none"
        } bg-opacity-25 top-0 left-0 z-50 w-full px-3 pt-3 pb-8 pointer-events-none grid grid-cols-3 `}
        style={{
          //  backgroundColor: currentTheme.data.navBorder ? 'var(--body-background-color)' : 'transparent',
          borderColor: "var(--nav-shadow-color)",
        }}
      >
        <div
          className="flex z-50 col-start-1 row-span-1 row-start-1 justify-start items-start w-fit"
          onClick={toggleThemeEditor}
        >
          <Logo logo={logo} showTitle={true} />
        </div>

        <NavBar containerRef={containerRef} data={data} logo={logo} />

        <ThemeTrigger toggleThemeEditor={toggleThemeEditor} />

        {/* <motion.div className="flex absolute top-4 right-4 z-50 gap-1 items-center p-1 bg-red-400 rounded-lg">
            <img className="w-[30px] h-[30px]" src="./icons/change.svg" title="theme"/>
            <Audio />
        </motion.div>  */}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        direction={ModalDirection.RIGHT}
        position={ModalPosition.BOTTOM_RIGHT}
      >
        <div
          className="h-screen w-[300px] flex flex-col gap-3 bg-[var(--background-color)]"
          style={
            {
              // backgroundColor: "var(--background-color)",
            }
          }
        >
          <ThemeScrollContainer>
            <div className="flex flex-col gap-8 justify-start">
              <div className="flex sticky top-0 gap-8 justify-start p-2">
                <Button
                  className="self-end"
                  type={ButtonType.SECONDARY}
                  size={ButtonSize.SM}
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
              <ThemeEditor customThemes={customThemes} />
            </div>
          </ThemeScrollContainer>
        </div>
      </Modal>
    </>
  );
}
