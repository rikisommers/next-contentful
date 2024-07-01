import Link from "next/link";
import { motion, cubicBezier, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState, useContext, useRef } from "react";
import { useScrollPosition } from "../scrollPosContext";
import { RouteContext } from "../routeContext";
import useSound from "use-sound";
import Audio from "./audio";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import CtxMenu from "../base/ctx-menu";

import { useTheme } from "next-themes";
import { themes } from "../../utils/theme";
import { getThemeByKey } from "../../utils/theme";
import ThemeEditor from "./themeEditor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function Navigation() {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  //console.log(currentTheme);

  const router = useRouter();
  const menuRef = useRef(null);
  const menuDragRef = useRef("menuDragRef");

  const { routeInfo } = useContext(RouteContext);

  const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  const toggleTheme = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    controls.start(isOpen ? "visible" : "hidden");
  }, [controls, isOpen]);

  // const handleMouseEnter = () => {
  //   setIsOpen(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsOpen(false);
  // };

  useEffect(() => {
    if (menuRef.current && menuDragRef.current) {
      // Initialize Draggable when both menuRef and menuDragRef are available
      Draggable.create(menuRef.current, {
        type: "x,y",
        edgeResistance: 0.65,
        trigger: menuDragRef.current, // Use menuDragRef.current instead of menuDragRef
      });
    }
  }, [menuRef, menuDragRef]); // Include both refs in the dependency array to handle re-renders correctly

  useEffect(() => {
    if (router.asPath !== router.route) {
      if (router.asPath === "/") {
        setOffset(20);
      } else if (router.asPath === "/posts") {
        setOffset(-50);
      }
    }
  }, [router.asPath, router.route]);

  useEffect(() => {
    if (scrollPosition < 7) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    console.log("sc", scrollPosition);
  }, [scrollPosition]);

  const pages = [
    {
      id: "home",
      title: "Home",
      url: "/",
    },
    {
      id: "work",
      title: "Work",
      url: "/work",
    },
    {
      id: "blog",
      title: "Blog",
      url: "/blog",
    },
    {
      id: "about",
      title: "About",
      url: "/bio",
    },
  ];

  const [activePage, setActivePage] = useState(pages[0].id);

  // const audioRef = useRef();
  // const [play] = useSound("/audio/test.mp3", { volume: 0.5 });
  // const handleClick = () => {
  //  // play();
  // };
  // const play = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play()
  //   } else {
  //     // Throw error
  //   }
  // }

  return (
    <div className="fixed z-50 flex justify-between w-full p-6">
      {/* <audio ref={audioRef} play={false} src='/audio/test.mp3' /> */}

      {/* <motion.div className="audio">
        <img src="/logo6.svg" viewBox="0 0 43 27"></img>
      </motion.div> */}
      <motion.div
        style={{
          color:
            router.asPath === "/"
              ? currentTheme?.textColorInv
              : currentTheme?.textColor,
        }}
        className={`relative z-50 flex items-center rounded-xl bg-gray-600 bg-opacity-50 backdrop-blur-lg p-1.5`}
      >
        <div
          style={{
            backgroundColor: isActive ? currentTheme?.accent : null,
          }}
          className="w-10 h-10 p-2 rounded-lg"
        >
          <img src="/logo3.svg" viewBox="0 0 32 32"></img>
        </div>

        <motion.span
          className="self-center p-3 text-sm"
          style={{ color: currentTheme?.textAccent }}
          layoutId="title"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
            delay: 0,
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          }}
        >
          Riki Sommers
        </motion.span>
      </motion.div>

      <div className="flex gap-2">
        <div
          ref={menuRef}
          className="absolute flex items-center gap-1 rounded-lg top-6 left-[320px]"
        >
          <div className="px-3 text-white py-" ref={menuDragRef}>
            :
          </div>
          <div className="relative z-50 flex gap-1 p-1.5 rounded-xl bg-gray-600 bg-opacity-50 backdrop-blur-lg">
            {/* <motion.div
              className="absolute right-0 z-10 overflow-hidden rounded-lg shadow-lg top-14 "
              // popover="auto" id="context"
              // anchor="anchor"
              initial="hidden"
              animate={controls}
              // whileHover={handleMouseEnter}
              // onHoverEnd={handleMouseLeave}
              variants={{
                visible: { height: 100, opacity: 1, y: 0 },
                hidden: { height: 0, opacity: 0, y: 0 },
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-3 gap-2 p-1.5">
                <div className="w-24 h-24 rounded-md bg-slate-400"></div>
                <div className="w-24 h-24 rounded-md bg-slate-400"></div>
                <div className="w-24 h-24 rounded-md bg-slate-400"></div>
                <div className="w-24 h-24 rounded-md bg-slate-400"></div>
                <div className="w-24 h-24 rounded-md bg-slate-400"></div>
                <div className="w-24 h-24 rounded-md bg-slate-400"></div>
              </div>
            </motion.div> */}

            {pages.map((page) => (
              <Link
                key={page.id}
                href={page.url}
                scroll={false}
                onClick={() => setActivePage(page.id)}
                className="relative flex items-center px-3 py-3 text-sm text-white uppercase rounded-lg"
              >
                <span
                  style={{
                    color:
                      activePage === page.id
                        ? currentTheme?.textAccent
                        : currentTheme?.textColor,
                  }}
                  className={`relative z-10`}
                >
                  {page.title}
                </span>
                {activePage === page.id && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute top-0 left-0 flex w-full h-full rounded-xl bg-slate-800/50"
                  ></motion.div>
                )}
              </Link>
            ))}

            <button
              style={{
                backgroundColor: currentTheme?.accent,
                color: currentTheme?.textColor,
              }}
              className={`px-3 py-3 text-xs  uppercase rounded-lg`}
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="absolute flex items-center gap-1 rounded-lg top-6 right-6">
          <div className="relative z-50 flex gap-1 p-1.5 rounded-xl bg-gray-600 bg-opacity-50 backdrop-blur-lg">
            <div className="relative">
              <button
                style={{
                  backgroundColor: currentTheme?.backgroundColor,
                  color: currentTheme?.textColor,
                }}
                onClick={toggleTheme}
                className="px-3 py-3 text-xs uppercase rounded-lg"
              >
                Theme
              </button>
              {isOpen && (
                <div className="absolute right-0 w-[350px] mt-2 bg-white rounded shadow-lg top-full">
                  <ThemeEditor />
                </div>
              )}
            </div>

            <button
              style={{
                backgroundColor: currentTheme?.backgroundColor,
                color: currentTheme?.textColor,
              }}
              className={`px-3 py-3 text-xs  uppercase rounded-lg`}
            >
              Audio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
