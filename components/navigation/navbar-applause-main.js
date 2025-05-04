'use client';

import Link from "next/link";
import { useThemeContext } from "../context/themeContext";
import { useAudioControls } from "../navigation/audio-utils";
import { motion , cubicBezier} from "../../utils/motion";
import { useEffect, useState, useRef } from "react";
import Button, { ButtonType, ButtonSound } from "../base/button/button";
import { Brain } from "@phosphor-icons/react/dist/icons/Brain";
import { Barbell } from "@phosphor-icons/react/dist/icons/Barbell";
import { BookOpenText } from "@phosphor-icons/react/dist/icons/BookOpenText";
import { Eyes } from "@phosphor-icons/react/dist/icons/Eyes";
import { Fingerprint } from "@phosphor-icons/react/dist/icons/Fingerprint";
import { Intersect } from "@phosphor-icons/react/dist/icons/Intersect";
import { Panorama } from "@phosphor-icons/react/dist/icons/Panorama";
import { Smiley } from "@phosphor-icons/react/dist/icons/Smiley";
import { DiamondsFour } from "@phosphor-icons/react/dist/icons/DiamondsFour";
import TextAnimSwap from "../motion/text-anim-swap";

export default function NavBarApplauseMain({
  pages,
  activePage,
  currentTheme,
  handleNavClick,
}) {
  // State to track mouse position globally
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInContainer, setIsMouseInContainer] = useState(false);
  const containerRef = useRef(null);

  const getNavigationPositionClass = (navigationPosition) => {
    switch (navigationPosition) {
      case "topLeft":
      case "topCenter":
      case "topRight":
        return "margin-auto items-start";
      case "bottomLeft":
      case "bottomCenter":
      case "bottomRight":
        return "margin-auto mb-8 items-end";
      case "leftCenter":
        return "col-start-1 col-span-1 row-span-1 row-start-3 flex flex-col w-[40px] writing-mode-sideways-rl ml-4";
      case "rightCenter":
        return "col-start-5 col-span-1 row-span-1 row-start-3 flex flex-col w-[40px] writing-mode-sideways-rl mr-4";
      default:
        return "col-start-2 col-span-1 row-span-1 row-start-1";
    }
  };

  const getShadowSizeClass = (size) => {
    switch (size) {
      case "sm":
        return "shadow-sm";
      case "md":
        return "shadow-md";
      case "lg":
        return "shadow-lg";
      default:
        return ""; // Return an empty string if no match
    }
  };

  


  // Handle mouse movement at the container level
  const handleContainerMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  // Handle mouse enter/leave for the container
  const handleContainerMouseEnter = () => {
    setIsMouseInContainer(true);
  };
  
  const handleContainerMouseLeave = () => {
    setIsMouseInContainer(false);
  };
  
  return (
    <div 
      ref={containerRef}
      className={`        
        ${getNavigationPositionClass(currentTheme?.data?.navPosition)} 
        relative z-50 flex self-center gap-1 pointer-events-auto
      `}
      onMouseMove={handleContainerMouseMove}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
     
      
      {pages.map((page) => (
        <NavItem 
          key={page.id}
          page={page}
          activePage={activePage}
          handleNavClick={handleNavClick}
          mousePosition={mousePosition}
          containerRect={containerRef.current?.getBoundingClientRect()}
          isMouseInContainer={isMouseInContainer}
          currentTheme={currentTheme}
        />
      ))}
    </div>
  );
}


// Separate component for each nav item to handle individual hover effects
function NavItem({ page, activePage, handleNavClick, mousePosition, containerRect, isMouseInContainer, currentTheme }) {
  const divRef = useRef(null);
  const contentRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const width = contentRef.current.scrollWidth;
      setContentWidth(width);
    }
  }, [page.title]);

  const renderDynamicIcon = (iconName, size = 20) => {
    if (iconName === 'Brain') {
      return <Brain size={size} />;
    }
    if (iconName === 'Barbell') {
      return <Barbell size={size} />;
    }
    if (iconName === 'BookOpenText') {
      return <BookOpenText size={size} />;
    } 
    if (iconName === 'Eyes') {
      return <Eyes size={size} />;
    }
    if (iconName === 'Fingerprint') {
      return <Fingerprint size={size} />;
    }
    if (iconName === 'Intersect') {
      return <Intersect size={size} />;
    }
    if (iconName === 'Panorama') {
      return <Panorama size={size} />;
    }
    if (iconName === 'Smiley') {
      return <Smiley size={size} />;
    }
    if (iconName === 'DiamondsFour') {
      return <DiamondsFour size={size} />;
    }
  };
  
  
  return (
    <motion.div 
      ref={divRef}
      className="overflow-hidden rounded-lg"
      style={{
        backgroundColor: `${
          currentTheme?.data?.navStyle === "solid"
            ? currentTheme?.data?.navBg
            : "transparent"
        }`,
        color: activePage === page.id ? "var(--text-accentPri)" : "var(--text-color)",
      }}
      initial={{ width: "66px" }}
      animate={{ 
        width: isHover ? `${contentWidth + 52}px` : "66px"
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      transition={{
        duration: 0.3,
        ease: cubicBezier(0.16, 1, 0.3, 1)
      }}
    >
      <Link
        href={page.url}
        scroll={false}
        onClick={() => handleNavClick(page.id)}
        className="relative flex items-center justify-center p-5 text-sm no-underline uppercase"
      >
        <div className="relative flex items-center w-full gap-2 overflow-hidden text-center"
         ref={contentRef}>
            <TextAnimSwap 
              icon={renderDynamicIcon(page.icon, 20)}
              text={page.title}
              isHover={isHover}
            />
        </div>
      </Link>
    </motion.div>
  );
}
