import React, { useState, useRef, useContext, useEffect } from "react";
import { motion } from "../../utils/motion";
import { MousePosContext } from "../context/mousePosContext";
import { useThemeContext } from "../context/themeContext";

const CursorGabriel = () => {
  const { mousePosition } = useContext(MousePosContext);
  const { currentTheme } = useThemeContext();
  
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [pathData, setPathData] = useState("");
  const [trailOpacity, setTrailOpacity] = useState(0);
  
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const positionHistory = useRef([]);
  const maxTrailLength = 15;

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsHovering(true);
      setCursorVariant("hover");
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant("default");
    };

    const hoverElements = document.querySelectorAll('a, button, .cursor-hover');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const currentPos = { x: mousePosition.x, y: mousePosition.y };
    
    positionHistory.current.push(currentPos);
    
    if (positionHistory.current.length > maxTrailLength) {
      positionHistory.current.shift();
    }
    
    if (positionHistory.current.length > 1) {
      const pathString = positionHistory.current
        .map((pos, index) => {
          return index === 0 ? `M ${pos.x} ${pos.y}` : `L ${pos.x} ${pos.y}`;
        })
        .join(' ');
      
      setPathData(pathString);
      setTrailOpacity(1);
    }
  }, [mousePosition]);

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 1,
      mixBlendMode: "difference",
    },
    hover: {
      scale: 1.5,
      opacity: 0.8,
      mixBlendMode: "difference",
    },
  };

  const trailVariants = {
    default: {
      scale: 1,
      opacity: 0.3,
    },
    hover: {
      scale: 2,
      opacity: 0.2,
    },
  };

  return (
    <>
      <svg 
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-full w-full"
        style={{ opacity: trailOpacity }}
      >
        <path 
          d={pathData}
          fill="none" 
          stroke={currentTheme.data.accentPri} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      
      <motion.div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full"
        style={{
          backgroundColor: currentTheme.data.accentPri,
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={cursorVariant}
        variants={trailVariants}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.8,
        }}
      />
      
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-3 h-3 rounded-full"
        style={{
          backgroundColor: currentTheme.data.backgroundColor,
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          mixBlendMode: "difference",
        }}
        animate={cursorVariant}
        variants={cursorVariants}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5,
        }}
      />
    </>
  );
};

export default CursorGabriel;