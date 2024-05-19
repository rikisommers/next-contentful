import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import Layout from "../components/layout";
import Head from "next/head";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import PostIntro from "../components/post/post-intro";
import { getBio } from "../lib/api";
import TextRotating from "../components/utils/text-rotating";
import { ScrollableBox } from "../components/utils/scrollable";
import BlockFooter from "../components/blocks/block-footer";
import Lenis from "@studio-freight/lenis";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../components/rich-text/rich-text";
import Link from "next/link";

import { useTheme } from 'next-themes';
import { themes } from "../utils/theme";
import { getThemeByKey } from '../utils/theme';


import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export default function Bio({ data }) {
  console.log(data);
  const contentRef = useRef(null);
  const footerRef = useRef(null);

  const { theme } = useTheme()
  const currentTheme = getThemeByKey(theme);


  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [footerOffsetValue, setFooterOffsetValue] = useState(0);

  const easing = cubicBezier(0.33, 1, 0.68, 1);

  const { scrollYProgress: scrollFooter } = useScroll({
    target: footerRef,

    offset: ["start end", "end end"],
    onChange: (latest) => {
      // Perform actions based on the scroll position changes
      console.log("Latest scroll position:", latest);
      // You can perform any other actions or state updates here
    },
  });
  const { height } = dimension;

  const y = useTransform(scrollFooter, [0, 1], [-300, 0], easing);

  useMotionValueEvent(scrollFooter, "change", (latest) => {
    //z.set(latest);
    setFooterOffsetValue(y);
  });

  const { scrollYProgress: scrollContent } = useScroll({
    target: contentRef,
    offset: ["start start", "start -100px"],
  });

  const yv = useTransform(scrollContent, [0, 1], [8, 0.01]);
  const xv = useTransform(scrollContent, [0, 1], [1.5, 0.01]);
  const rv = useTransform(scrollContent, [0, 1], [1, 0]);
  const x = useTransform(scrollContent, [0, 1], [1, 100]);


  const initialClipPath = "inset( 0rem 0rem 0px round 0rem 0rem 0rem 0rem)";
  const finalClipPath = "inset( 5rem 1.5rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)";

  const [clipPath, setClipPathValue] = useState(
    initialClipPath
  );

  useMotionValueEvent(scrollContent, "change", (latest) => {
    setClipPathValue(
      `inset(${yv.current}rem ${xv.current}rem 0px round 1.5rem 1.5rem 1.5rem 1.5rem)`
    );
  });

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);

    requestAnimationFrame(raf);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Layout>
      <TransitionTilt>
        <motion.div
                style={{ backgroundColor:currentTheme?.backgroundColor}}
          className="relative z-10 flex flex-col pb-20 "
          ref={contentRef}
          animate={{ clipPath: [initialClipPath, finalClipPath] }}
          transition={{
            easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
            duration: 1.6,
            delay: 0,
          }}
        >
          <Head>
            <title>{data.title}</title>
          </Head>



          <motion.div
            className="px-8 md:px-24 xl:px-xlx o-content"
            exit={{
              opacity: 0,
            }}
            transition={{
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
              duration: 0.3,
              delay: 0,
            }}
          >
            <PostIntro title={data.titlealt} content={data.contentalt}></PostIntro>

            <div className="grid grid-cols-12">
              <div className="flex flex-col col-span-12 gap-6 md:col-span-6">
                {data.content && (
                  <>
                    {documentToReactComponents(
                      data.content.json,
                      RichTextOptions
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="p-24">
              {/* <TextRotating leadText={data.textLoop.lead} rotatingWords={data.textLoop.textCollection.items}/> */}
              {/* <motion.h2 
                     initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
                      duration: 0.6,
                      delay: 1.6,
                    }}
                  className="col-span-6 text-2xl font-light text-left text-slate-500 md:col-span-6 text-balance">
                    {data.contentx}
                  </motion.h2> */}
            </div>
            <div className="flex flex-col gap-1 py-32">
              <p className="text-red-600">convert to table</p>
              <div className="flex justify-between gap-3 p-4">
                <p className="text-xs">Project</p>
                <p className="text-xs">Role</p>
                <p className="text-xs">Date</p>
              </div>
              {data.sectionsCollection &&
                data.sectionsCollection.items.map((item, index) => {
                  return (
                    <div className="mb-8" key={index}>
                      <h3 className="text-lg">{item.title}</h3>
                      <div className="flex flex-col gap-2 mb-4">
                        {item.articlesCollection &&
                          item.articlesCollection.items.map((item, index) => {
                            return (
                              <div key={index}>
                                {item?.__typename === "BlockArticle" && (
                                  <div
                                    className="flex gap-3 p-4 bg-slate-200"
                                    key={index}
                                  >
                                    <h1>{item.title}</h1>
                                    <h1>{item.caption}</h1>
                                    {item.contentRich && (
                                      <>
                                        {documentToReactComponents(
                                          item.contentRich.json,
                                          RichTextOptions
                                        )}
                                      </>
                                    )}
                                  </div>
                                )}
                                {item?.__typename === "CaseStudy" && (
                                  <div
                                    className="flex gap-3 p-4 bg-slate-200"
                                    key={index}
                                  >
                                    <div className="flex justify-start flex-grow gap-6">
                                      <p>s</p>

                                      {!item.url && (
                                        <p className="">{item.title}</p>
                                      )}

                                      {item.url && (
                                        <Link
                                          href={item.url}
                                          className="text-teal-400"
                                        >
                                          <p className="">{item.title}</p>
                                        </Link>
                                      )}
                                      <p className="flex-1">{item.client}</p>

                                      {item.tags && (
                                        <div className="flex justify-end gap-1">
                                          {item.tags
                                            .slice(0, 2)
                                            .map((tag, index) => {
                                              return (
                                                <div
                                                  key={index}
                                                  className="text-xs text-slate-400 uppercase py-0.5 px-1.5 bg-slate-200 rounded-md"
                                                >
                                                  {tag}
                                                </div>
                                              );
                                            })}
                                        </div>
                                      )}

                                      <span>{item.duration}</span>
                                      <span>%=%=%</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </motion.div>
        <motion.div ref={footerRef} className="fixed relative testing123 h-vhh">
          <motion.div
            className="fuck"
            style={{ y: footerOffsetValue }}
            // style={{ translateY: y }}
            //  animate={{ y: footerOffset }}
          >
            {data.intro && <BlockFooter content={data.intro} />}
          </motion.div>
        </motion.div>
      </TransitionTilt>
      {/* <TransitionWipe /> */}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const data = (await getBio(preview)) ?? [];
  return {
    props: {
      data,
    },
  };
}
