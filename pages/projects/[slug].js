import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import {
  getAllCaseStudies,
  getAllCaseStudies2,
  getAllCaseStudiesNext,
} from "../../lib/api";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  useScroll,
} from "framer-motion";
import { ScrollableBox } from "../../components/utils/scrollable";

import PostHeader from "../../components/post/post-header";
import TransitionWipe from "../../components/transition/transition-wipe";
import TransitionTilt from "../../components/transition/transition-tilt";
import PostContent from "../../components/post/post-content";
import Link from "next/link";
import PostTile from "../../components/post/post-tile";
import FadeInWhenVisible from "../../components/utils/fade-in-visible";
import NextPost from "../../components/post/post-next";
import { RouteContext } from "../../components/routeContext";
import Lenis from '@studio-freight/lenis'


export default function Post({ post, nextPost }) {
  const router = useRouter();

  const [scrollValue, setScrollValue] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const isOpen = true;

  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  useEffect(() => {
    setSourceRoute(routeInfo.sourceRoute);
    setDestRoute(routeInfo.destRoute);
  }, [routeInfo]); // Include routeInfo in the dependency array if needed

  const shouldFadeIn = !destRoute.includes("/projects/");

  const handleScrollChange = (value) => {
    setScrollValue(value);

    if (value <= 1000) {
      x.set(value);
      if (value <= 600) {
        setIsActive(false);
      }
      if (value > 600) {
        setIsActive(true);
      }
    }
  };

  const easing = cubicBezier(0.35, 0.17, 0.3, 0.86);
  const x = useMotionValue(0);

  const input = [0, 200];
  const cpyo = [8, 0.01];
  const cpxo = [1.5, 0.01];
  const ro = [1, 0];
  const yv = useTransform(x, input, cpyo, { easing });
  const xv = useTransform(x, input, cpxo, { easing });
  const rv = useTransform(x, input, ro, { easing });
  const clipPathValue = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem 0px 0px)`;

  const wrapperVariants = {
    active: {
      y: 0,
      opacity: 1,
    },
    inactive: {
      opacity: 0,
      y: "100vh",
    },
    transition: { duration: 0.6, easing: easing },
  };

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }



  const footerRef = useRef(null);
  const contentRef = useRef(null);


  const [dimension, setDimension] = useState({width:0, height:0});






  const { scrollYProgress } = useScroll({

    target: footerRef,

    offset: ['start end', 'end end']

})
const { height } = dimension;


const y = useTransform(scrollYProgress, [0, 1], [-300, 0])
const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])



useEffect( () => {


  const lenis = new Lenis()



  const raf = (time) => {

    lenis.raf(time)
    //console.log(scrollYProgress.current)
    requestAnimationFrame(raf)

  }



  requestAnimationFrame(raf)


  const resize = () => {

    setDimension({width: window.innerWidth, height: window.innerHeight})

  }



  window.addEventListener("resize", resize)

  requestAnimationFrame(raf);

  resize();



  return () => {

    window.removeEventListener("resize", resize);

  }

}, [])




  return (
    <Layout>
  
  <div
              className="relative flex flex-col pb-20 z-50 bg-slate-100" 
              ref={contentRef}
            >

      <h1>Map csblocks collectoion article</h1>

      {/* xxl:grid grid-cols-3 */}
        <div className="relative z-10 overflow-hidden bg-slate-50 rounded-xl ">
        {/* className="xxl:col-span-2" */}
          <motion.div
            className="pt-32 px-8 md:px-24 xl:px-xlx"
            exit={{
              opacity: 0,
            }}
            transition={{
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
              duration: 0.3,
              delay: 0,
            }}
          >
            
              <PostContent post={post}></PostContent>
            </motion.div>
        

  

      
        </div>

        {nextPost && (
                <motion.div ref={footerRef} className="testing123 relative h-vhh w-full">
                <motion.div
                
                className="absolute bottom-0"
                style={{y}}
                // style={{ translateY: y }}
                //  animate={{ y: footerOffset }}
                >
                <NextPost post={nextPost} />
                </motion.div>
              </motion.div>
            )}

              </div>
      {shouldFadeIn && <TransitionWipe />}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const data = await getAllCaseStudies2(slug, preview);
  const next = await getAllCaseStudiesNext(slug, preview);

  return {
    props: {
      slug,
      preview,
      post: data[0] ?? null,
      nextPost: next[0] ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllCaseStudies(false);
  return {
    paths: allPosts?.map(({ slug }) => `/projects/${slug}`) ?? [],
    fallback: true,
  };
}
