import Link from "next/link";
import { motion, cubicBezier, useAnimationControls } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState, useContext, useRef } from "react";
import { useScrollPosition } from "../scrollPosContext";
import { RouteContext } from "../routeContext";
import Chrome from "./chrome";
import useSound from "use-sound";

export default function Navigation() {
  const router = useRouter();

  const { routeInfo } = useContext(RouteContext);

  const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (scrollPosition > 200) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
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
      url: "/posts",
    },
    {
      id: "about",
      title: "About",
      url: "/bio",
    },
  ];

  const [activePage, setActivePage] = useState(pages[0].id);
  const audioRef = useRef();

  const [play] = useSound("/audio/test.mp3", { volume: 0.5 });

  const handleClick = () => {
    play();
  };

  // const play = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play()
  //   } else {
  //     // Throw error
  //   }
  // }

  return (
    <>
      {/* <Chrome /> */}

      {/* <audio ref={audioRef} play={false} src='/audio/test.mp3' /> */}

      <motion.div
        className={`logo_wrapper ${isActive ? "active" : ""} ${
          routeInfo.sourceRoute === "/" ? "text-white" : ""
        }`}
      >
        <motion.span
          className="logo origin-top-left"
          onClick={handleClick}
          //  key={router.asPath} // Key should be based on the route to trigger exit and enter animations

          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          exit={{
            scale: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.3,
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          }}
        >
          <img src="/logo7.svg" viewBox="0 0 43 27"></img>
        </motion.span>

        {router.asPath === "/" ? (
          <motion.span
            layoutId="title"
            className="logotext text-lg"
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
            Brandname
            {/* {scrollPosition && scrollPosition} */}
          </motion.span>
        ) : (
          <motion.span className="logotext text-lg text-black">
            - All Projects
          </motion.span>
        )}

        {/* <h1>{router.asPath}</h1>
    <h1>{activePage}</h1>
    <h1>{routeInfo.sourceRoute}</h1> */}
      </motion.div>

      {/* //backdrop-blur-md  */}
      <div
        className="flex space-x-2 absolute bottom-6 right-6 lg:top-6 lg:right-6 lg:bottom-auto lg:right-6  p-2 rounded-md backdrop-blur-md bg-slate-400"
        style={{ zIndex: 9999 }}
      >
        {pages.map((page) => (
          <Link
            href={page.url}
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`relative rounded-md px-3 py-3 text-white ${
              activePage === page.id ? "text-black" : "hover:opacity-50 "
            }  rounded-full text-sm`}
          >
            <span
              className={` ${
                activePage === "home" ? "" : "text-gray-900"
              } relative z-10 mix-blend-exclusion`}
            >
              {page.title}
            </span>

            {activePage === page.id && (
              <motion.div
                layoutId="indicator"
                className="absolute inset-0 top-0 bg-white rounded-md"
              ></motion.div>
            )}
          </Link>
        ))}
      </div>
      {/* <motion.nav className={`c-menu__wrapper ${isActive && (router.asPath !== '/') ? "active" : ""}`}
     initial={{
      clipPath: clipPathInitial,
    }}
     animate={{ 
      clipPath: clipPathAnimate ,
    }}
     transition={{
      delay:0.6,
      duration: 0.6,
      easing:cubicBezier(0.35, 0.17, 0.3, 0.86)
    }}
    >
    <motion.ul className="c-menu with-indicator"
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{
      delay:0.6,
      duration: 1.2,
      easing:cubicBezier(0.35, 0.17, 0.3, 0.86)
    }}
    >
      <li className={router.pathname == "/" ? "is-active" : ""}>
        <Link href="/">Home</Link>
      </li>
      <li className={router.pathname == "/posts" ? "is-active" : ""}>
        <Link href="/posts">Work</Link>
      </li>

      <li className={router.pathname == "/bio" ? "is-active" : ""}>
        <Link href="/bio">About</Link>
      </li>
  
    </motion.ul>
    </motion.nav> */}
{/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>
</svg> */}


    </>
  );
}
