"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { motion ,LayoutGroup} from "framer-motion";
import { RouteContext } from "../../components/routeContext";
import { useTheme } from 'next-themes';
import { themes } from "../../utils/theme";
import { getThemeByKey } from '../../utils/theme';


const HomeTransitionContent = () => {

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  return (
    <motion.div
      className="transition-wipe--y "
      style={{
        backgroundColor:currentTheme?.backgroundColor
      }}
      initial={{ y: "100%" }}
      exit={{
        y: -40,
        zIndex:40,
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
        delay: 0.3,
      }}
      
    >
        <div
             style={{
        backgroundColor:currentTheme?.backgroundColor
            }}
        className="flex items-center justify-center w-full h-full rounded-xl">
       
      </div>
    </motion.div>
  );
};

const WorkTransitionContent = () => {

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  return (
    <motion.div
      id="tranny-content"
      style={{
        backgroundColor:currentTheme?.backgroundColor
      }}
      className="shadow-xl transition-wipe--y"
      initial={{ y: "100%" }}
      exit={{
        y: -40,
        zIndex:40,
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

const BioTransitionContent = () => {

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  return (
    <motion.div
      id="tranny-content"
      style={{
        backgroundColor:currentTheme?.backgroundColor
      }}
      className="shadow-xl transition-wipe--y"
      initial={{ y: "100%" }}
      exit={{
        y: -40,
        zIndex:40,
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

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  return (
    <motion.div
      id="tranny-content"
      style={{
        backgroundColor:currentTheme?.backgroundColor
      }}
      className="transition-wipe--y rounded-2xl"
      initial={{ y: "100%" }}
      exit={{
        y: -40,
        zIndex:40,
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

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);
  
  return (
    <motion.div
      id="overlay"
      style={{
        backgroundColor:currentTheme?.bodyBackgroundColor
      }}
      className="fixed top-0 w-full h-full opacity-50"
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
        duration:0.9,
        delay: 0,
      }}
    ></motion.div>
  );
};

const TransitionWipe = ({ children }) => {
  const router = useRouter();

  const { routeInfo } = useContext(RouteContext);
  const [destRoute, setDestRoute] = useState('');
 
  // useEffect(() => {
  //   setDestRoute(routeInfo.destRoute)
  // }, [routeInfo]); // Include routeInfo in the dependency array if needed


  return (
    <LayoutGroup>

      {routeInfo.destRoute === "/" && (
        <>
          <HomeTransitionContent />
          <Overlay />
        </>
      )}
      {routeInfo.destRoute === "/posts"  && (
        <>
          <WorkTransitionContent />
          <Overlay />
        </>
      )}
      {routeInfo.destRoute.includes("/projects/") && (
        <>
          <ProjectTransitionContent />
          <Overlay />
        </>
      )}
        {routeInfo.destRoute.includes("/bio") && (
        <>
          <BioTransitionContent />
          {/* <Overlay /> */}
        </>
      )}
    </LayoutGroup>
  );
};

export default TransitionWipe;
