import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { getHome, lastUpdatedDate } from "../lib/api";
import { motion, cubicBezier } from "framer-motion";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import Chrome from "../components/navigation/chrome";
import TextAnimation from "../components/utils/text-animation";

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
  const clipPathAnimate = `inset( 1.5rem round 1rem )`;
  const clipPathExit = `inset( 1.5rem 1.5rem 90vh 1.5rem round 1rem )`;

  return (
    <Layout>
      <div className="home">
        {/* <PostIntro title={home.title} content={home.intro} /> */}

        <div className="lead">
          <TextAnimation content={home.title} color="white"></TextAnimation>

          <motion.p
            className=" text-2xl text-left xl:text-right text-balance text-gray-500"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              ease: [0.33, 1, 0.68, 1],
              duration: 1.6,
              delay: 0.6,
            }}
          >
            {home.intro}
          </motion.p>
        </div>

        <div className="home__footer">
          <div className="flex">
            <span>Location:</span> chch
          </div>
          <div className="service flex">
            <span>Location:</span> chch
          </div>
          <div className="sound goo">
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
              className="btn absolute bottom-6 right-6 "
            ></motion.div>
            <motion.div
              initial={{
                scale: 0,
                width: 40,
                height: 40,
                x: 0,
              }}
              animate={{
                scale: 1,
                width: 80,
                x: -80,
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
              className="btn absolute bottom-6 right-6 "
            ></motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="w-screen h-screen flex items-center justify-end bg-black "
        initial={{ clipPath: clipPathInitial }}
        animate={{ clipPath: clipPathInitial }}
        exit={{ clipPath: clipPathExit }}
        transition={{
          duration: 0.6,
          easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
        }}
      >
        <TransitionTilt></TransitionTilt>
      </motion.div>

      <TransitionWipe />


    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = (await getHome(preview)) ?? [];
  return {
    props: {
      home,
    },
  };
}
