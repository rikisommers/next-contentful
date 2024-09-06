

import Link from "next/link";
import { motion, cubicBezier, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, useRef } from "react";
import { useScrollPosition } from "../scrollPosContext";

import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import CtxMenu from "../base/ctx-menu";
import ThemeEditor from "./themeEditor";
import Button,{ButtonType,ButtonSound} from "../base/button";
import AnimatedText, {AnimStyle} from "../motion/animated-text";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

export default function Navigation() {


  const router = useRouter();
  const menuRef = useRef(null);
  const menuDragRef = useRef("menuDragRef");

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

  return (
    <div className="fixed z-50 flex justify-between w-full p-6">
      <motion.div
        style={{
          backgroundColor: 'var(--background-color)',
          color:
            router.asPath === "/"
              ? 'var(--text-color)'
              : 'var(--heading-color)',
        }}
        className={`relative z-50 flex items-center rounded-xl`}
      >
        <div className={`scene bg-opacity-80 backdrop-blur-sm`} 
          style={{backgroundColor:'var(--accent-pri)'}}
        >
          <div
            style={{
              backgroundColor: isActive ? 'var(--accent)' : 'var(--accent-sec)',
            }}
            className={`cube ${isActive ? "show-right" : ""}`}
          >
            <div className="cube__face cube__face--front">
              <img src="/logo3.svg" viewBox="0 0 32 32"></img>
            </div>
            <div className="cube__face cube__face--back "></div>
            <div className=" cube__face cube__face--right">
             <img src="/back.svg" viewBox="0 0 32 32"></img>

            </div>
            <div className="cube__face cube__face--left "></div>
            <div className="cube__face cube__face--top "></div>
            <div className="cube__face cube__face--bottom "></div>
          </div>
        </div>

        <span
          className="self-center p-3 font-mono text-sm"
          style={{ color: 'var(--text-color)' }}
        > 

          {/* TODO: ADD GLOBAL PAGE TITLE */}
          <AnimatedText type={AnimStyle.CHARFADE} content="Riki Sommers"></AnimatedText>
          
        </span>
      </motion.div>

      <div className="flex gap-2">
        <div ref={menuRef} className="flex items-center gap-1 rounded-lg">
          <div className="relative z-50 flex gap-1 bg-black bg-opacity-50 rounded-xl backdrop-blur-lg"
          
          >
            {pages.map((page) => (
              <Link
                key={page.id}
                href={page.url}
                scroll={false}
                onClick={() => setActivePage(page.id)}
                className="relative flex items-center text-sm uppercase rounded-lg"
                style={{color: 'var(--text-color-inv)'}}
              >
                {activePage === page.id && (
                  <motion.div
                    layoutId="indicator"
                    style={{
                      backgroundColor: 'var(--accent-pri)',
                    }}
                     
                    className="absolute top-0 left-0 flex w-full h-full bg-opacity-50 rounded-xl"
                  ></motion.div>
                )}
                <Button label={page.title} type={ButtonType.TRANSPARENT}/>

              </Link>
            ))}

            <Button label={'Contact'} sound={ButtonSound.ON}
              type={ButtonType.TRANSPARENT}
            ></Button>
            
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-lg">
        <div className="relative z-50 flex gap-1 bg-opacity-50 rounded-xl backdrop-blur-lg"
        style={{backgroundColor: 'var(--background-color)'}}>

          <Button label={"Audio"} />
          
          <div className="relative">
          


            {/* TODO: Add audio */}
            <Button click={toggleTheme} label={"Theme"} type={ButtonType.SECONDARY}/>
            {isOpen && (
              <div className="absolute right-0 w-[350px] mt-2 rounded shadow-lg top-full"
              style={{backgroundColor: 'var(--body-background-color)'}}>
                <ThemeEditor />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
