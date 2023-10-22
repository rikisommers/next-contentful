import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { motion ,LayoutGroup} from "framer-motion";
import { RouteContext } from "../../components/routeContext";

const HomeTransitionContent = () => {



  return (
    <motion.div
      className="transition-wipe--y "
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
        <div className="w-full h-full bg-black flex items-center justify-center rounded-xl">
       
      </div>
    </motion.div>
  );
};

const WorkTransitionContent = () => {
  return (
    <motion.div
      id="tranny-content"
      className="transition-wipe--y bg-white shadow-xl"
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


  return (
    <motion.div
      id="tranny-content"
      className="transition-wipe--y bg-white rounded-2xl"
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
  return (
    <motion.div
      id="overlay"
      className="fixed top-0 h-full w-full bg-white opacity-50"
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
        <h1>add</h1>
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
    </LayoutGroup>
  );
};

export default TransitionWipe;
