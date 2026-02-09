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
import { navigationOptions } from "../../utils/theme";
import { SkipLinks, useFocusManagement, handleKeyboardNavigation } from "../utils/accessibility-helper";

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
      <SkipLinks />
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
</div>



      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        direction={ModalDirection.ORIGIN}
        width={ModalWidth.PANEL_SM}
        position={ModalPosition.TOP_RIGHT}
      >
        <div
          ref={modalRef}
          className="h-screen flex flex-col gap-3 bg-[var(--background-color)]"
//          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-editor-title"
          aria-describedby="theme-editor-description"
          style={
            {
              // backgroundColor: "var(--background-color)",
            }
          }
        >
          <ThemeScrollContainer>
            <div className="flex flex-col gap-8 justify-start">
              <div className="flex sticky top-0 gap-8 justify-start p-2">
                <h2 id="theme-editor-title" className="sr-only">Theme Editor</h2>
                <p id="theme-editor-description" className="sr-only">
                  Configure site theme settings including colors, typography, and layout options
                </p>
                <Button
                  className="self-end"
                  type={ButtonType.SECONDARY}
                  size={ButtonSize.SM}
                  onClick={closeModal}
                  aria-label="Close theme editor"
                >
                  <X size={16} aria-hidden="true" />
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
