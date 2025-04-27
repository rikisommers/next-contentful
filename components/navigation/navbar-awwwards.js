import Link from "next/link";
import { useThemeContext } from "../context/themeContext";
import { useAudioControls } from "../navigation/audio-utils";
import { motion } from "../../utils/motion";
import { useEffect, useState } from "react";
import Button, { ButtonType, ButtonSound } from "../base/button/button";

export default function NavBarAwwwards({
  pages,
  activePage,
  currentTheme,
  handleNavClick,
}) {
  return (
    <div className="z-50 flex self-center gap-1 pointer-events-auto  backdrop-blur-lg rounded-xl">
                

      {pages.map((page) => (
        <Link
          key={page.id}
          href={page.url}
          scroll={false}
          onClick={() => handleNavClick(page.id)}
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
            {currentTheme.data.navLabelDisplay === "text" && page.title}
            {/* {currentTheme.data.navLabelDisplay === "icons" && 
              renderDynamicIcon(page.icon, 20)
              } */}
            {currentTheme.data.navLabelDisplay === "textAndIcons" && (
              <div className="flex items-center gap-2">
                {/* {renderDynamicIcon(page.icon, 20)} */}
                {page.title}
              </div>
            )}
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
       // onClick={playClick}
      >
        Contact
      </motion.div>
    </div>
  );
}
