import React, { useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button, { ButtonType, ButtonSound } from "../base/button";
import ButtonAlt from "../base/button-alt";
import { useThemeContext } from "../themeContext";
import Link from "next/link";
import { DotsSixVertical } from "@phosphor-icons/react";

export default function NavBar({ containerRef }) {
  
  const { currentTheme } = useThemeContext();
  const menuRef = useRef(null);
  const menuDragRef = useRef("menuDragRef");
  //const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState(0);

  const pages = [
    { id: "home", title: "Home", url: "/" },
    { id: "work", title: "Work", url: "/work" },
    { id: "blog", title: "Blog", url: "/blog" },
    { id: "about", title: "About", url: "/bio" },
  ];
  
  const [activePage, setActivePage] = useState(pages[0].id);


  const [edges, setEdges] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });
  const [orientation, setOrientation] = useState("");

  const getNavigationStyle = (navigationStyle) => {
    switch (navigationStyle) {
      case "solid":
        return currentTheme.navBg;
      case "transparent":
        return hexToRgba(currentTheme.navBg, 0.5);
      default:
        return ""; 
    }
  };

  const getNavigationPositionClass = (navigationPosition) => {
    switch (navigationPosition) {
      case "topLeft":
        return "(col-start-1 col-span-1 row-span-1 row-start-1)";
      case "topCenter":
        return "col-start-2 col-span-1 row-span-1 row-start-1";
      case "topRight":
        return "col-start-3 col-span-1 row-span-1 row-start-1";
      case "bottomCenter":
        return "col-start-2 col-span-1 row-span-1 row-start-3";
      default:
        return ""; // Return an empty string if no match
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
    if (menuRef.current && menuDragRef.current) {

        const navRect = menuRef.current.getBoundingClientRect();
        const navSize = navRect.width;
        const threshold = navSize / 2; // Use half of the nav width as threshold

        // Update orientation based on drag position
        setOrientation(
          navRect.left <= threshold || navRect.right >= window.innerWidth - threshold
            ? "flex-col"
            : ""
        );

    }
  }, [menuRef, menuDragRef]);
  

  return (
    <motion.div
      drag
      ref={menuRef}
      dragMomentum={0}
      dragConstraints={containerRef}
      dragSnapToOrigin={false}
      style={{
        backgroundColor: getNavigationStyle(currentTheme.navigationStyle),
       // boxShadow: `0 10px 15px -3px ${currentTheme.navShadow}, 0 4px 49px -4px ${currentTheme.navShadow}`,
      }}
      className={`
        ${getShadowSizeClass(currentTheme.navShadowSize)}
        ${getNavigationPositionClass(currentTheme.navigationPosition)} 
         backdrop-blur-lg pointer-events-auto  z-50 flex ${orientation} gap-1 rounded-xl`}
    >
      <div ref={menuDragRef} className="flex items-center px-2 text-lg text-white"><DotsSixVertical/></div>
      {/* <p>{currentTheme.navigationOptions?.floating === true ? 'true' : 'false'}</p>
      <p>{currentTheme.navigationOptions?.shadow === true ? 'true' : 'false'}</p> */}

      {pages.map((page) => (
        <Link
          key={page.id}
          href={page.url}
          scroll={false}
          onClick={() => setActivePage(page.id)}
          className="relative flex items-center text-sm uppercase rounded-lg"
          style={{ color: "var(--heading-color)" }}
        >
          {activePage === page.id && (
            <motion.div
              layoutId="indicator"
              style={{
                backgroundColor: "var(--accent-pri)",
              }}
              className="absolute top-0 left-0 flex w-full h-full bg-opacity-50 rounded-xl"
            ></motion.div>
          )}
          <Button label={page.title} type={ButtonType.TRANSPARENT} />
        </Link>
      ))}
      <Button
        label={"Contact"}
        sound={ButtonSound.ON}
        type={ButtonType.TRANSPARENT}
      ></Button>
    </motion.div>
  );
}
