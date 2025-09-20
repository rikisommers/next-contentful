import Link from "next/link";
import { useThemeContext } from "../context/themeContext";
import { useAudioControls } from "./audio-utils";
import { motion } from "../../utils/motion";
import { useEffect, useState } from "react";
import Button, { ButtonType, ButtonSound } from "../base/button/button";
import { Brain } from "@phosphor-icons/react/dist/icons/Brain";
import { Barbell } from "@phosphor-icons/react/dist/icons/Barbell";
import { BookOpenText } from "@phosphor-icons/react/dist/icons/BookOpenText";
import { Eyes } from "@phosphor-icons/react/dist/icons/Eyes";
import { Fingerprint } from "@phosphor-icons/react/dist/icons/Fingerprint";
import { Intersect } from "@phosphor-icons/react/dist/icons/Intersect";
import { Panorama } from "@phosphor-icons/react/dist/icons/Panorama";
import { Smiley } from "@phosphor-icons/react/dist/icons/Smiley";
import Logo from "./logo";

export default function NavBarAwwwards2({
  pages,
  activePage,
  currentTheme,
  handleNavClick,
  logo,
}) {
  const renderDynamicIcon = (iconName, size = 20) => {
    if (iconName === "Brain") {
      return <Brain size={size} />;
    }
    if (iconName === "Barbell") {
      return <Barbell size={size} />;
    }
    if (iconName === "BookOpenText") {
      return <BookOpenText size={size} />;
    }
    if (iconName === "Eyes") {
      return <Eyes size={size} />;
    }
    if (iconName === "Fingerprint") {
      return <Fingerprint size={size} />;
    }
    if (iconName === "Intersect") {
      return <Intersect size={size} />;
    }
    if (iconName === "Panorama") {
      return <Panorama size={size} />;
    }
    if (iconName === "Smiley") {
      return <Smiley size={size} />;
    }
  };

  return (
    <div className="flex z-50 gap-1 self-center p-1 bg-[var(--surface-2)] rounded-xl backdrop-blur-lg pointer-events-auto">
      <div className="flex gap-1 p-2 rounded-lg aspect-square"
      style={{
        backgroundColor: "var(--body-background-color)",
      }}
      >
        <Logo logo={logo} />
      </div>

      <div className="flex gap-1 p-1 rounded-lg border border-gray-600">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={page.url}
            scroll={false}
            onClick={() => handleNavClick(page.id)}
            className="flex relative items-center text-sm no-underline uppercase rounded-lg"
            style={{
              color:
                activePage === page.id
                  ? "var(--text-color-inv)"
                  : "var(--text-color)",
            }}
          >
            {activePage === page.id && (
              <motion.div
                layoutd="indicator"
                style={{
                  borderColor: currentTheme.data.accentPri,
                  // boxShadow: `0 10px 15px -3px ${currentTheme.data.navShadow}, 0 4px 49px -4px ${currentTheme.data.navShadow}`,
                }}
                className="flex absolute top-0 left-0 w-full h-full bg-opacity-50 rounded-md border"
              ></motion.div>
            )}
            {/* <span className="flex relative items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer">
              
                </span> */}
            {/* <Button
                label={page.title}
                sound={ButtonSound.CLICK}
                type={ButtonType.TRANSPARENT}
                ></Button> */}
            <motion.div
              className="flex relative items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer"
              style={{
                color: currentTheme.data.textColorInv,
                writingMode:
                  currentTheme.data.navPosition === "leftCenter" ||
                  currentTheme.data.navPosition === "rightCenter"
                    ? "vertical-rl"
                    : "horizontal-tb",
              }}
            >
              {currentTheme.data.navLabelDisplay === "text" && page.title}
              {currentTheme.data.navLabelDisplay === "icons" &&
                renderDynamicIcon(page.icon, 20)}
              {currentTheme.data.navLabelDisplay === "textAndIcons" && (
                <div className="flex gap-2 items-center">
                  {renderDynamicIcon(page.icon, 20)}
                  {page.title}
                </div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
      <motion.div
        className="flex relative items-center px-3 py-3 text-xs uppercase rounded-lg border cursor-pointer"
        style={{
          color: "var(--accent-pri)",
          borderColor: "var(--accent-pri)",
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
