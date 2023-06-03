import React, { useState, useEffect, useCallback } from "react";
import { Router, useRouter } from "next/router";
import { motion } from "framer-motion";

const HomeTransitionContent = () => {
  return (
    <motion.div
      className="fixed top-0 h-full w-full bg-white rounded-xl z-20"
      initial={{ y: "100%" }}
      exit={{
        y: 0,
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
        delay: 1.6,
      }}
    >
      <div className="fixed w-full h-full p-6">
        <div className="w-full h-full bg-blue-200 0 flex items-center justify-center rounded-xl">
          <h1>HOME</h1>
        </div>
      </div>
    </motion.div>
  );
};

const WorkTransitionContent = () => {
  return (
    <motion.div
      id="tranny-content"
      className="fixed top-0 h-full w-full bg-white rounded-xl z-20"
      initial={{ y: "100%" }}
      exit={{
        y: 0,
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
        delay: 0.6,
      }}
    >
      <div className="flex align-middle rounded-xl">
        <h1>WORK</h1>
      </div>
    </motion.div>
  );
};

const Overlay = () => {
  return (
    <motion.div
      id="overlay"
      className="fixed top-0 h-full w-full bg-green-400 z-0"
      initial={{  opacity: 0 }}
      animate={{
        opacity:0
      }}
      exit={{
        zIndex:10,
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

const Transition = ({ children }) => {
  const router = useRouter();
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
      console.log("------ROUTESTART", url);
      // console.log(`routing to ${url}`);
    });
    router.events.on("routeChangeComplete", (url) => {
      setLoadingFalse();
      console.log("------ROUTEEND", url);
    });
  }, []);

  return (
    <>
      <div className="postop">route:{route}</div>
      {route === "/" && (
        <>
          <Overlay />
          <HomeTransitionContent />
        </>
      )}
      {route === "/work" && (
        <>
          <Overlay />
          <WorkTransitionContent />
        </>
      )}
    </>
  );
};

export default Transition;
