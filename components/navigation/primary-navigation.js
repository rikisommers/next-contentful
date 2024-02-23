import Link from "next/link";
import { motion, cubicBezier, useAnimationControls } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState, useContext, useRef } from "react";
import { useScrollPosition } from "../scrollPosContext";
import { RouteContext } from "../routeContext";
import useSound from "use-sound";
import Audio from "./audio";


export default function Navigation() {
  const router = useRouter();

  const { routeInfo } = useContext(RouteContext);

  const { scrollPosition } = useScrollPosition();
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState(0);

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
    <div className="absolute p-3 w-full flex justify-between">
     
     
      {/* <audio ref={audioRef} play={false} src='/audio/test.mp3' /> */}

      <motion.div className="audio">
        <img src="/logo6.svg" viewBox="0 0 43 27"></img>
      </motion.div>

      <motion.div
        className={`logo_wrapper ${isActive ? "active" : ""} ${
          router.asPath === "/" ? "text-white" : "bg-white text-black"
        }`}
      >
        <div className="logo">
          <img src="/logo3.svg" viewBox="0 0 32 32"></img>
        </div>

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
            Riki Sommers
            {/* {scrollPosition && scrollPosition} */}
          </motion.span>
        ) : (
          <motion.button className="logotext text-lg text-black">
            <Link href={'/'}><span>Back</span></Link>
            
          </motion.button>
        )}

 
        {/* <h1>{activePage}</h1> */}

      </motion.div>

    
      <div className="c-menu__wrapper">

        {pages.map((page) => (
          <Link
            href={page.url}
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className="c-menu__item"
          >
            <span
              className={` ${
                activePage === page.id ? "text-black" : "text-slate-800"
              } relative z-10`}
            >
              {page.title}
            </span>

            {activePage === page.id && (
              <motion.div
                layoutId="indicator"
                className="c-menu__indicator"
              ></motion.div>
            )}
          </Link>
        ))}
      </div>


      <div className="goo z-50 mr-6">
      <motion.div
              initial={{
                scale: 0,
                width: 40,
                height: 40,
                x: 0,
              }}
              animate={{
                scale: 1,
                width: 60,
                x: 0,
              }}
              transition={{
                scale: {
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                x: {
                  delay: 0.6,
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                },
                width: {
                  delay: 0.6,
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
              className="btn absolute right-1"
            >


                  <svg width="10px" height="8px" viewBox="0 0 10 8" version="1.1" xmlns="http://www.w3.org/2000/svg" className={`${(router.asPath !== '/') ? "text-teal-500" : "text-teal-500"}`}>
                    <g id="Audio" transform="translate(0.000000, 0.500000)" stroke="currentColor" strokeWidth="1" fillRule="evenodd"
                      strokeLinecap="round">
                      <line x1="8.5" y1="0.493135" x2="8.5" y2="6.50687" id="Line-5">
                        <animate attributeType="XML" attributeName="y1" values="2;0;2" keyTimes="0;0.5;1" dur=".8s"
                          repeatCount="indefinite"></animate>
                        <animate attributeType="XML" attributeName="y2" values="5;7;5" keyTimes="0;0.5;1" dur=".8s"
                          repeatCount="indefinite"></animate>
                      </line>
                      <line x1="6.5" y1="0.789016" x2="6.5" y2="6.21098" id="Line-4">
                        <animate attributeType="XML" attributeName="y1" values="0;2;0" keyTimes="0;0.5;1" dur=".5s"
                          repeatCount="indefinite"></animate>
                        <animate attributeType="XML" attributeName="y2" values="7;5;7" keyTimes="0;0.5;1" dur=".5s"
                          repeatCount="indefinite"></animate>
                      </line>
                      <line x1="4.5" y1="1.67582" x2="4.5" y2="5.32418" id="Line-3">
                        <animate attributeType="XML" attributeName="y1" values="1;3;1" keyTimes="0;0.5;1" dur=".6s"
                          repeatCount="indefinite"></animate>
                        <animate attributeType="XML" attributeName="y2" values="6;4;6" keyTimes="0;0.5;1" dur=".6s"
                          repeatCount="indefinite"></animate>
                      </line>
                      <line x1="2.5" y1="1.14678" x2="2.5" y2="5.85322" id="Line-2">
                        <animate attributeType="XML" attributeName="y1" values="2;1;2" keyTimes="0;0.5;1" dur=".7s"
                          repeatCount="indefinite"></animate>
                        <animate attributeType="XML" attributeName="y2" values="5;6;5" keyTimes="0;0.5;1" dur=".7s"
                          repeatCount="indefinite"></animate>
                      </line>
                      <line x1="0.5" y1="1.67582" x2="0.5" y2="5.32418" id="Line-1">
                        <animate attributeType="XML" attributeName="y1" values="3;0;3" keyTimes="0;0.5;1" dur=".9s"
                          repeatCount="indefinite"></animate>
                        <animate attributeType="XML" attributeName="y2" values="4;7;4" keyTimes="0;0.5;1" dur=".9s"
                          repeatCount="indefinite"></animate>
                      </line>
                    </g>
                  </svg>

            </motion.div>
      </div>
   
    </div>
  );
}
