import React, { useState, useEffect, useCallback } from "react";
import { Router, useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const HomeTransitionContent = () => {
  return (
    <motion.div
      className="transition-wipe--y"
      initial={{ y: "100%" }}
      exit={{
        y: -40,
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
        delay: 0.3,
      }}
    >
        <div className="w-full h-full grad flex items-center justify-center rounded-xl">
      </div>
    </motion.div>
  );
};

const WorkTransitionContent = () => {
  return (
    <motion.div
      id="tranny-content"
      className="transition-wipe--y bg-slate-100"
      initial={{ y: "100%" }}
      exit={{
        y: -40,
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
        delay: 0.3,
      }}
    >
      <div className="flex align-middle rounded-xl">
      </div>
    </motion.div>
  );
};


const ProjectTransitionContent = () => {
  return (
    <motion.div
      id="tranny-content"
      className="transition-wipe--y bg-white"
      initial={{ y: "100%" }}
      exit={{
        y: -40,
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
        delay: 0.3,
      }}
    >
      <div className="flex align-middle rounded-xl">
      </div>
    </motion.div>
  );
};

const Overlay = () => {
  return (
    <motion.div
      id="overlay"
      className="fixed top-0 h-full w-full  bg-slate-100 z-0"
      initial={{  opacity: 0 }}
      animate={{
        opacity:0
      }}
      exit={{
        zIndex:40,
        opacity: 0.5,
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.3,
        // delay: 0.6,
      }}
    ></motion.div>
  );
};

const TransitionWipe = ({ children }) => {
  const router = useRouter();
  const dynamicRoute = useRouter().asPath;

  const [route, setRoute] = useState("/");
  const [isLoading, setLoaded] = useState(false);

  const setRouteOnChangeStart = (newRoute) => {
    setRoute(newRoute);
  };
  const setLoadingTrue = () => {
    setLoaded(true);
  };

  const setLoadingFalse = () => {
    setLoaded(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setRouteOnChangeStart(url);
    });
    router.events.on("routeChangeComplete", (url) => {
    });
  }, []);

  return (
    <>
      {route === "/" && (
        <>
          <HomeTransitionContent />
          {/* <Overlay /> */}
        </>
      )}
      {(route === "/posts" || route === "/posts?") && (
        <>
          <WorkTransitionContent />
          {/* <Overlay /> */}
        </>
      )}
      {route.includes("/projects/") && (
        <>
          <ProjectTransitionContent />
          {/* <Overlay /> */}
        </>
      )}
    </>
  );
};

export default TransitionWipe;
