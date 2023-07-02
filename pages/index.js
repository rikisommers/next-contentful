import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { getHome, lastUpdatedDate } from "../lib/api";
import { motion, cubicBezier } from "framer-motion";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import Chrome from "../components/navigation/chrome";
export default function Index({ home, lastUpdate }) {
  const router = useRouter();

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
      <TransitionTilt>
        <motion.div
          initial={{ clipPath: clipPathInitial }}
          animate={{ clipPath: clipPathAnimate }}
          transition={{
            duration: 1.2,
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
          }}
          className="fixed w-full h-full top-0 z-30 flex inset"
        >
          <Chrome lastUpdate={lastUpdate} />
          <div className="w-full h-full 0 flex items-end justify-end  grad">
            <PostIntro title={home.title} content={home.intro} />
          </div>
        </motion.div>
      </TransitionTilt>
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const home = (await getHome(preview)) ?? [];
  const lastUpdate = (await lastUpdatedDate(preview)) ?? [];
  return {
    props: {
      home,
      lastUpdate,
    },
  };
}
