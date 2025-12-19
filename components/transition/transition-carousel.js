"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { motion, LayoutGroup } from "../../utils/motion";
import { RouteContext } from "../context/routeContext";
import { useThemeContext } from "../../components/context/themeContext";

// Calculate carousel item dimensions to match scaled page
const getCarouselDimensions = () => {
  const scaleRatio = 0.65; // How much we scale the page down
  const aspectRatio = 16 / 10; // Common aspect ratio for the carousel items

  // Calculate dimensions based on viewport
  const maxWidth = window.innerWidth * scaleRatio;
  const maxHeight = window.innerHeight * scaleRatio;

  // Maintain aspect ratio
  let itemWidth = maxWidth;
  let itemHeight = maxWidth / aspectRatio;

  if (itemHeight > maxHeight) {
    itemHeight = maxHeight;
    itemWidth = itemHeight * aspectRatio;
  }

  return { itemWidth, itemHeight };
};

// Individual carousel page rectangle
const CarouselPage = ({ index, isCenter, currentTheme, offset, itemWidth, itemHeight }) => {
  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-lg overflow-hidden"
      style={{
        width: `${itemWidth}px`,
        height: `${itemHeight}px`,
        left: `calc(50vw - ${itemWidth/2}px + ${offset * itemWidth * 1.1}px)`,
        top: `calc(50vh - ${itemHeight/2}px)`,
        backgroundColor: index % 2 === 0
          ? currentTheme?.data?.surface1
          : currentTheme?.data?.surface2,
        border: isCenter
          ? `2px solid ${currentTheme?.data?.gradStart}`
          : `1px solid ${currentTheme?.data?.surface3}`,
        boxShadow: isCenter
          ? `0 0 30px ${currentTheme?.data?.gradStart}40`
          : '0 4px 20px rgba(0,0,0,0.1)',
      }}
      animate={{
        scale: isCenter ? 1 : 0.9,
        opacity: isCenter ? 1 : 0.7,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Optional: Add some visual content to distinguish pages */}
      <div
        className="text-lg font-semibold opacity-40"
        style={{ color: currentTheme?.data?.textColor }}
      >
        Page {index + 1}
      </div>
    </motion.div>
  );
};

// The carousel background that creates the illusion
const CarouselBackground = ({ isVisible, currentPageIndex, currentTheme }) => {
  const mockPages = Array.from({ length: 6 }, (_, i) => i);
  const [dimensions, setDimensions] = useState({ itemWidth: 800, itemHeight: 500 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimensions = () => {
        setDimensions(getCarouselDimensions());
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  const { itemWidth, itemHeight } = dimensions;

  return (
    <motion.div
      className="fixed inset-0 z-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: `radial-gradient(circle at center, ${currentTheme?.data?.backgroundColor}90, ${currentTheme?.data?.backgroundColor})`,
      }}
    >
      {/* Carousel container that slides */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          x: `-${currentPageIndex * itemWidth * 1.1}px`,
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {mockPages.map((_, index) => (
          <CarouselPage
            key={index}
            index={index}
            isCenter={index === currentPageIndex}
            currentTheme={currentTheme}
            offset={index - currentPageIndex}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Page content wrapper that clips to carousel dimensions
const PageContentWrapper = ({ children, isScaledBack, showContent, currentTheme }) => {
  const [dimensions, setDimensions] = useState({ itemWidth: 800, itemHeight: 500 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimensions = () => {
        setDimensions(getCarouselDimensions());
      };

      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  const { itemWidth, itemHeight } = dimensions;
  const scaleRatio = 0.65;

  return (
    <div className="relative z-30">
      {/* Full page content - always present for normal state */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          opacity: isScaledBack ? 0 : (showContent ? 1 : 0),
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>

      {/* Scaled and clipped version for carousel state */}
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center"
        style={{ pointerEvents: 'none' }}
        animate={{
          opacity: isScaledBack && showContent ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: showContent ? 0.6 : 0,
        }}
      >
        {/* Clipped page content container */}
        <motion.div
          className="relative overflow-hidden rounded-lg"
          style={{
            width: `${itemWidth}px`,
            height: `${itemHeight}px`,
            backgroundColor: currentTheme?.data?.backgroundColor,
            border: `2px solid ${currentTheme?.data?.gradStart}`,
            boxShadow: `0 0 30px ${currentTheme?.data?.gradStart}40`,
          }}
          animate={{
            scale: isScaledBack ? 1 : 1.5,
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Page content scaled to fit */}
          <div
            className="absolute inset-0 origin-top-left"
            style={{
              transform: `scale(${scaleRatio})`,
              width: `${100 / scaleRatio}%`,
              height: `${100 / scaleRatio}%`,
            }}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const TransitionCarousel = ({ children }) => {
  const { currentTheme } = useThemeContext();
  const { routeInfo } = useContext(RouteContext);
  const [isScaledBack, setIsScaledBack] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Mock page mapping
  const getPageIndex = (route) => {
    const pageMap = {
      '/': 0,
      '/home': 0,
      '/bio': 1,
      '/work': 2,
      '/blog': 3,
    };
    const cleanRoute = route.replace(/\/$/, '') || '/';
    return pageMap[cleanRoute] || 0;
  };

  useEffect(() => {
    if (routeInfo.destRoute !== routeInfo.sourceRoute) {
      const sourceIndex = getPageIndex(routeInfo.sourceRoute);
      const destIndex = getPageIndex(routeInfo.destRoute);

      setCurrentPageIndex(sourceIndex);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Transition sequence
      // 1. Scale back and show clipped version
      setIsScaledBack(true);

      // 2. After scale animation, show carousel
      timeoutRef.current = setTimeout(() => {
        setShowCarousel(true);
      }, 500);

      // 3. Rotate carousel to new page
      setTimeout(() => {
        setCurrentPageIndex(destIndex);
      }, 700);

      // 4. Hide carousel and scale back to full
      setTimeout(() => {
        setShowCarousel(false);
        setIsScaledBack(false);
      }, 1500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [routeInfo]);

  return (
    <LayoutGroup>
      {/* Carousel Background */}
      <CarouselBackground
        isVisible={showCarousel}
        currentPageIndex={currentPageIndex}
        currentTheme={currentTheme}
      />

      {/* Page Content with proper clipping */}
      <PageContentWrapper
        isScaledBack={isScaledBack}
        showContent={showContent}
        currentTheme={currentTheme}
      >
        {children}
      </PageContentWrapper>
    </LayoutGroup>
  );
};

export default TransitionCarousel;