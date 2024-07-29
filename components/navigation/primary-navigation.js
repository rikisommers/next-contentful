import Link from "next/link";
import { motion, cubicBezier, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, useRef } from "react";
import { useScrollPosition } from "../scrollPosContext";
import { RouteContext } from "../routeContext";
import useSound from "use-sound";
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
          backgroundColor: 'var(--accent',
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
              backgroundColor: isActive ? 'var(--accent)' : 'var(--text-accent)',
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
          layoutId="title"
      
        > 

          {/* TODO: ADD GLOBAL PAGE TITLE */}
          <AnimatedText type={AnimStyle.CHARFADE} content="Riki Sommers"></AnimatedText>
          
        </span>
      </motion.div>

      <div className="flex gap-2">
        {/* absolute  top-6 left-[320px] */}
        <div ref={menuRef} className="flex items-center gap-1 rounded-lg">
          {/* <div className="px-3 text-white py-" ref={menuDragRef}>
            :
          </div> */}
          <div className="relative z-50 flex gap-1 bg-black bg-opacity-50 rounded-xl backdrop-blur-lg"
          
          >
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
                className="relative flex items-center text-sm uppercase rounded-lg"
                style={{color: 'var(--text-color-inv)'}}
              >
                  {/* <span
                 style={{
                    color:
                       activePage === page.id
                         ? 'var(--text-color-inv)'
                         : 'var(--text-color)',
                   }}
                   className={`z-10 relative flex items-center px-3 py-3 text-xs uppercase rounded-lg cursor-pointer`}
                 >
                   {page.title}
                 </span>   */}
                {activePage === page.id && (
                  <motion.div
                    layoutId="indicator"
                    style={{
                      background: 'var(--accent-pri)',
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

          {/* <button
            style={{
              backgroundColor: currentTheme?.backgroundColor,
              color: currentTheme?.textColor,
            }}
            className={`px-3 py-3 text-xs  uppercase rounded-lg`}
          >
            Audio
          </button> */}
        </div>
      </div>
    </div>
  );
}
