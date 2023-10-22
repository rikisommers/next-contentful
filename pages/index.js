import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { getHome, lastUpdatedDate } from "../lib/api";
import { motion, cubicBezier } from "framer-motion";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro"
import Chrome from "../components/navigation/chrome";
import Background from "../components/utils/background";

export default function Index({ home }) {
  const router = useRouter();
  // const [isFirstRender, setIsFirstRender] = useState(true);

  // useEffect(() => {
  //   if (router.asPath !== router.route) {
  //     setIsFirstRender(false);
  //   }
  // }, [router.asPath, router.route]);

  //console.log('home',home)

  useEffect(() => {
    const wheelEvent =
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
        ? "mousewheel"
        : "DOMMouseScroll";
    const touchEvent = "ontouchstart" in window ? "touchmove" : "";

    const handleScroll = (e) => {
      router.push("/posts");
    };

    window.addEventListener(wheelEvent, handleScroll);
    window.addEventListener(touchEvent, handleScroll);

    return () => {
      window.removeEventListener(wheelEvent, handleScroll);
      window.removeEventListener(touchEvent, handleScroll);
    };
  }, []);

  const lastUpdatedDate = home?.sys?.updatedAt || "N/A";
  const clipPathInitial = `inset(-1rem )`;
  const clipPathAnimate = `inset(1.5rem round 1.5rem )`;

  return (
    <Layout>




          <motion.div 
            initial={{ 
            //  top: '1.5rem',
            //  left: '1.5rem',
             }}
            animate={{ 
           //   top: '1.5rem',
            //  left: '1.5rem',
             }}
            transition={{
              duration: 0.6,
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
            }}
            className="absolute  pointer-events-auto ">
              {/* <div className="inset inset--top-left "></div> */}
            </motion.div>



          {/* <Chrome lastUpdate={lastUpdate} /> */}
  

         <div className="fixed w-full h-full pointer-events-none z-50">
<motion.div className="absolute pointer-events-auto origin-top-left	"
  initial={{
      scale:0,
      top:0,
      left:0
  }}
  animate={{
    scale:1,
    top:'1.5rem',
    left:'1.5rem',
    transition:{
      duration: 0.6,
      delay:0.3,
      easing: cubicBezier(0.25, 1, 0.5, 1),
    }
  }}
  exit={{
    scale:0,
    top:0,
    left:0,
    transition:{
      duration: 0.6,
      delay:0,
      easing: cubicBezier(0.25, 1, 0.5, 1),
    }
  }}

>
  <motion.div className="inset inset--top-left "></motion.div>
</motion.div> 
</div>

          <motion.div 
                    initial={{ clipPath: clipPathInitial }}
                    animate={{ clipPath: clipPathAnimate }}
                    exit={{ clipPath: clipPathInitial }}
                    transition={{
                      duration: 0.8,
                      easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                    }}
          className="w-screen h-screen flex items-center justify-end bg-black rounded-xl">
            

            <TransitionTilt>
            <div className="absolute w-full h-full top-0 z-10">
              <PostIntro title={home.title} content={home.intro} />
            </div>
            <Background/>
            </TransitionTilt>

          </motion.div>

     
  
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = (await getHome(preview)) ?? [];
  return {
    props: {
      home   
     },
  };
}
