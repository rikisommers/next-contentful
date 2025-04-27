import Link from "next/link";
import { useThemeContext } from "../context/themeContext";
import { useAudioControls } from "../navigation/audio-utils";
import { motion } from "../../utils/motion";
import { useEffect, useState, useRef } from "react";
import Button, { ButtonType, ButtonSound } from "../base/button/button";

export default function NavBarApplause({
  pages,
  activePage,
  currentTheme,
  handleNavClick,
}) {
  // State to track mouse position globally
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInContainer, setIsMouseInContainer] = useState(false);
  const containerRef = useRef(null);
  
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
      className="relative z-50 flex self-center gap-1 pointer-events-auto backdrop-blur-lg rounded-xl"
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
        />
      ))}
    </div>
  );
}

// Helper function to calculate distance between two points
const distancePoints = (x1, y1, x2, y2) => Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

// Separate component for each nav item to handle individual hover effects
function NavItem({ page, activePage, handleNavClick, mousePosition, containerRect, isMouseInContainer }) {
  const [scale, setScale] = useState(1);
  const divRef = useRef(null);
  
  // Base size (66px)
  const baseSize = 66;
  // Max size (90px)
  const maxSize = 90;
  // Maximum distance for scaling effect (in pixels)
  const maxDistance = 200;
  
  // Update scale based on mouse position
  useEffect(() => {
    // If mouse is not in container, reset scale to 1
    if (!isMouseInContainer) {
      setScale(1);
      return;
    }
    
    if (!divRef.current || !containerRect) return;
    
    const rect = divRef.current.getBoundingClientRect();
    
    // Calculate the center of the element
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;
    
    // Calculate the mouse position
    const mouseX = containerRect.left + mousePosition.x;
    const mouseY = containerRect.top + mousePosition.y;
    
    // Calculate the distance between the mouse and the element's center
    const distance = distancePoints(mouseX, mouseY, elementCenterX, elementCenterY);
    
    // If the distance is greater than the maximum distance, return to initial size
    if (distance >= maxDistance) {
      setScale(1);
      return;
    }
    
    // Calculate the scale based on the distance
    // Closer to center = larger scale
    // At center (distance = 0) = maximum scale
    // At maxDistance = minimum scale (1)
    const distanceScale = 1 - (distance / maxDistance);
    
    // Calculate the new size based on the distance scale
    const newSize = baseSize + (maxSize - baseSize) * distanceScale;
    setScale(newSize / baseSize);
  }, [mousePosition, containerRect, isMouseInContainer]);
  
  return (
    <motion.div 
      ref={divRef}
      className="border-2 border-red-500 rounded-lg aspect-square"
      initial={{
        width: "66px",
        height: "66px",
      }}
      animate={{
        width: `${66 * scale}px`,
        height: `${66 * scale}px`,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut'
      }}
    >
      <Link
        href={page.url}
        scroll={false}
        onClick={() => handleNavClick(page.id)}
        className="relative flex items-center w-full h-full p-3 text-sm no-underline uppercase rounded-lg aspect-square"
        style={{
          backgroundColor: "var(--surface1)",
          color:
            activePage === page.id
              ? "var(--text-color-inv)"
              : "var(--text-color)",
        }}
      >
        <img src='/logo7.svg' alt={page.title} className="w-6 h-6" />
      </Link>
    </motion.div>
  );
}
