import React, { useRef } from "react";
import { motion } from "../../utils/motion";
import { useEffect, useState } from "react";
import Button, { ButtonType, ButtonSound } from "../base/button";
import { useThemeContext } from "../context/themeContext";
import Link from "next/link";
import { Smiley, Heart, Horse, Barbell, BookOpenText, Brain, Eyes, Fingerprint, Intersect, Panorama} from "@phosphor-icons/react";

export default function NavBar({ containerRef, data }) {
  const { currentTheme } = useThemeContext();
  const menuRef = useRef(null);
  const menuDragRef = useRef("menuDragRef");
  //const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState(0);

  const pages = [
    ...(Array.isArray(data) && data.length > 0
      ? data.map((page) => ({
          id: page.slug,
          title: page.title,
          icon: page.icon,
          url: `/${page.slug}`, // Ensure the URL is correct
        }))
      : []), // Fallback to an empty array if slugs is not an array or is empty
  ];

  // Check if pages is not empty before accessing pages[0].id
  const [activePage, setActivePage] = useState(
    pages.length > 0 ? pages[0].id : null
  ); // Set to null or a default value

  const [edges, setEdges] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });
  const [orientation, setOrientation] = useState("");

  const hexToRgba = (hex, alpha) => {
    // Remove the h ash at the start if it's there
    if (hex) {
      hex = hex.replace(/^#/, "");

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
        throw new Error("Invalid HEX color format");
      }

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return;
  };

  const getNavigationStyle = (navigationStyle) => {
    switch (navigationStyle) {
      case "solid":
        return currentTheme.data.accentPri;
      case "transparent":
        return currentTheme.data.navBg;
      default:
        return "solid";
    }
  };

  const getNavigationPositionClass = (navigationPosition) => {
    switch (navigationPosition) {
      case "topLeft":
        return "(col-start-2 col-span-1 row-span-1 row-start-1) w-fit";
      case "topCenter":
        return "col-start-3 col-span-1 row-span-1 row-start-1 w-fit mx-auto";
      case "topRight":
        return "col-start-4 col-span-1 row-span-1 row-start-1 w-fit";
      case "bottomLeft":
        return "col-start-1 col-span-1 row-span-1 row-start-5 w-fit";
      case "bottomCenter":
        return "col-start-2 col-span-1 row-span-1 row-start-5 w-fit mx-auto";
      case "bottomRight":
        return "col-start-3 col-span-1 row-span-1 row-start-5 w-fit";
      case "leftCenter":
        return "col-start-1 col-span-1 row-span-1 row-start-3 flex flex-col w-[40px] writing-mode-sideways-rl ml-4";
      case "rightCenter":
        return "col-start-5 col-span-1 row-span-1 row-start-3 flex flex-col w-[40px] writing-mode-sideways-rl mr-4";
      default:
        return "col-start-2 col-span-1 row-span-1 row-start-1";
    }
  };

  // export const navigationOptions = {
  //     floating: true,
  //     shadow: true,
  //     shadowColor: {
  //       default: 'default',
  //       accent: 'accent',
  //     },
  //     shadowSize:{
  //       sm:'sm',
  //       md:'md',
  //       lg:'lg',
  //     }
  //   }

  const getShadowColorClass = (color) => {
    switch (color) {
      case "default":
        return "(col-start-1 col-span-1 row-span-1 row-start-1)";
      case "accent":
        return "col-start-2 col-span-1 row-span-1 row-start-1";
      default:
        return ""; // Return an empty string if no match
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

  const getBgClass = (style) => {
    switch (style) {
      case "solid":
        return "shadow-sm";
      case "tranparent":
        return "shadow-lg";
      default:
        return ""; // Return an empty string if no match
    }
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

  useEffect(() => {
    if (
      menuRef.current &&
      menuDragRef.current &&
      currentTheme.data.navFloating
    ) {
      const navRect = menuRef.current.getBoundingClientRect();
      const navSize = navRect.width;
      const threshold = navSize / 2; // Use half of the nav width as threshold

      // Update orientation based on drag position
      setOrientation(
        navRect.left <= threshold ||
          navRect.right >= window.innerWidth - threshold
          ? "flex-col"
          : ""
      );
    }
  }, [menuRef, menuDragRef]);
  //  ${getShadowSizeClass(currentTheme.data.navShadowSize)}
  // boxShadow: `0 10px 15px -3px ${currentTheme.data.navShadow}, 0 4px 49px -4px ${currentTheme.data.navShadow}`,

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
    };

  return (
    <motion.div
      drag
      ref={menuRef}
      dragMomentum={0}
      dragConstraints={containerRef}
      dragSnapToOrigin={false}
      style={{
        backgroundColor: `${
          currentTheme.data.navStyle === "solid"
            ? currentTheme.data.navBg
            : "transparent"
        }`,
        // boxShadow: `0 10px 15px -3px ${currentTheme.data.navShadow}, 0 4px 49px -4px ${currentTheme.data.navShadow}`,
      }}
      //add orientation if floating  ${orientation}
      className={`
        ${getNavigationPositionClass(currentTheme.data.navPosition)} 
        ${getShadowSizeClass(currentTheme.data.navShadowSize)}
       
         flex self-center backdrop-blur-lg pointer-events-auto  z-50 gap-1 rounded-xl`}
    >
      {/* {currentTheme.data.navFloating && (
        <div
          ref={menuDragRef}
          className="flex items-center w-2 h-2 px-2 text-lg text-white bg-white"
          style={{ color: "var(--text-accent)" }}
        ></div>
      )} */}
      {/* <p>{currentTheme.data.navigationOptions?.floating === true ? 'true' : 'false'}</p>
      <p>{currentTheme.data.navigationOptions?.shadow === true ? 'true' : 'false'}</p> */}
      {pages.map((page) => (
        <Link
          key={page.id}
          href={page.url}
          scroll={false}
          onClick={() => setActivePage(page.id)}
          className="relative flex items-center text-sm no-underline uppercase rounded-lg"
          style={{
            color:
              activePage === page.id
                ? "var(--text-color-inv)"
                : "var(--text-color)",
          }}
        >
          {activePage === page.id && (
            <motion.div
              layoutId="indicator"
              style={{
                backgroundColor: `${
                  currentTheme.data.navStyle === "solid"
                    ? currentTheme.data.accentPri
                    : "transparent"
                }`,

                // boxShadow: `0 10px 15px -3px ${currentTheme.data.navShadow}, 0 4px 49px -4px ${currentTheme.data.navShadow}`,
              }}
              className="absolute top-0 left-0 flex w-full h-full bg-opacity-50 rounded-xl"
            ></motion.div>
          )}
          {/* <span className="relative flex items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer">
          
            </span> */}
          {/* <Button
            label={page.title}
            sound={ButtonSound.CLICK}
            type={ButtonType.TRANSPARENT}
            ></Button> */}
          <motion.div
            className="relative flex items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer"
            style={{
              writingMode:
                currentTheme.data.navPosition === "leftCenter" ||
                currentTheme.data.navPosition === "rightCenter"
                  ? "vertical-rl"
                  : "horizontal-tb",
            }}
          >
            {currentTheme.data.navLabelDisplay === "text" && 
            page.title
            }
          {currentTheme.data.navLabelDisplay === "icons" && 
          renderDynamicIcon(page.icon, 20)
          }
          {currentTheme.data.navLabelDisplay === "textAndIcons" && 
            <div className="flex items-center gap-2">
            {renderDynamicIcon(page.icon, 20)}
            {page.title}
            </div>
          }
          </motion.div>
        </Link>
      ))}

      <motion.div
        className="relative flex items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer"
        style={{
          color: "var(--text-color)",
          writingMode:
            currentTheme.data.navPosition === "leftCenter" ||
            currentTheme.data.navPosition === "rightCenter"
              ? "vertical-rl"
              : "horizontal-tb",
        }}
      >
        Contact
      </motion.div>
      {/* <Button

        label={"Contact"}
        sound={ButtonSound.ON}
        type={ButtonType.TRANSPARENT}
      ></Button> */}
    </motion.div>
  );
}
