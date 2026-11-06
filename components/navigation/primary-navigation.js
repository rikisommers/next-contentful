"use client";
import dynamic from "next/dynamic";

import React, { useRef } from "react";
import { motion } from "../../utils/motion";
import { useRouter } from "next/router";
import { useState } from "react";
import ThemeTrigger from "../base/theme-trigger";
//import { useScrollPosition } from "../scrollPosContext";
import Button, { ButtonType, ButtonSize } from "../base/button/button";
import Audio from "./audio";
import Modal, {
  ModalDirection,
  ModalWidth,
  ModalPosition,
} from "../base/modal";
import { useThemeContext } from "../context/themeContext";
import NavBar from "./navbar";
import Logo from "./logo";
import { navigationOptions } from "../../utils/theme";
import { useFocusManagement, handleKeyboardNavigation } from "../utils/accessibility-helper";

// The theme editor is a developer tool: it is only bundled and rendered in development.
const IS_DEV = process.env.NODE_ENV === "development";
const ThemeEditorPanel = IS_DEV
  ? dynamic(() => import("./theme-editor-panel"), { ssr: false })
  : null;

export default function Navigation({ data, logo, customThemes, title, isLoading }) {
  const router = useRouter();
  const containerRef = useRef(null);
  const modalRef = useRef(null);

  const menuDragRef = useRef("menuDragRef");
  //const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isThemeDialogOpen, setIsThemeDialogOpen } = useThemeContext();
  const { currentTheme } = useThemeContext();
  
  // Accessibility hooks
  const { saveFocus, restoreFocus, trapFocus } = useFocusManagement();

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
    if (!isModalOpen) {
      saveFocus();
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      restoreFocus();
    }
  };

  // Handle modal close with accessibility
  const closeModal = () => {
    setIsModalOpen(false);
    restoreFocus();
  };

  const toggleThemeEditor2 = () => {
    //  console.log("sdd");
    setIsThemeDialogOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        id="navigation"
        role="navigation" 
        aria-label="Main navigation"
        ref={containerRef}
        className={`theme-editor-active-offset
      
          ${
          currentTheme.data.navLayoutPosition == navigationOptions.position.fixed
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
          className="flex z-50 col-start-1 row-span-1 justify-start items-center w-fit"
        >
          <Logo logo={logo} 
                type={currentTheme.data.logoStyle} 
                background={currentTheme.data.logoBackground}
                title={title} />
        </div>


        <NavBar containerRef={containerRef} data={data} logo={logo} />


<div className="flex col-start-5 row-start-1 gap-2 justify-end items-center">

        <ThemeTrigger/>
        {IS_DEV && (
        <button 
          className="cursor-pointer flex pointer-events-auto gap-1 items-center p-1 bg-[var(--accent-pri)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-sec)] focus:ring-offset-2"
          onClick={toggleThemeEditor}
          onKeyDown={(e) => handleKeyboardNavigation(e, { 
            onEnter: toggleThemeEditor, 
            onSpace: toggleThemeEditor 
          })}
          aria-label="Open theme editor"
          aria-expanded={isModalOpen}
          aria-haspopup="dialog"
        >
            <img 
              className="w-[30px] h-[30px]" 
              src="./icons/change.svg" 
              alt="Theme settings icon"
              role="img"
            />
        </button> 
        )}
</div>



      </nav>

      {IS_DEV && ThemeEditorPanel && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          direction={ModalDirection.ORIGIN}
          width={ModalWidth.PANEL_SM}
          position={ModalPosition.TOP_RIGHT}
        >
          <ThemeEditorPanel
            ref={modalRef}
            customThemes={customThemes}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
}
