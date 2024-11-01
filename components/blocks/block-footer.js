import React, { useState, useRef } from "react";
import Link from "next/link";
import { RichTextOptions } from "../rich-text/rich-text";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useThemeContext } from "../themeContext";
import AnimatedText, {
  AnimStyle,
  AnimTextOrder,
} from "../motion/animated-text";

import ButtonAlt, { ButtonType } from "../base/button-alt";
import { motion, useTransform, useScroll } from "framer-motion";

export default function BlockFooter({ data }) {
  const { currentTheme } = useThemeContext();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,

    offset: ["start end", "end end"],
    onChange: (latest) => {
      console.log("Latest scroll position:", latest);
      // You can perform any other actions or state updates here
    },
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [-600, 0]);

  const pages = [
    {
      id: "home",
      title: "Home",
      url: "/",
    },
    {
      id: "work",
      title: "Work",
      url: "/work",
    },
    {
      id: "blog",
      title: "Blog",
      url: "/blog",
    },
    {
      id: "about",
      title: "About",
      url: "/bio",
    },
  ];

  return (
    <motion.div
      ref={footerRef}
      style={
        {
          //y: yTransform,
          // clipPath: "inset( 1rem round 1rem )",
           backgroundColor: "var(--background-color)",
        }
      }
      className="flex flex-col justify-between w-screen min-h-[80vh] overflow-clip"
    >
      {/* pt-32 pb-16 */}

      <motion.div className="z-20 grid w-full h-full grid-cols-12 gap-8 px-16 py-16"
       style={{
         //  y: yTransform,
       }}
      >
        <div className="flex col-span-12 md:col-span-5">

        {/* ---columns: 3;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: calc(0.75* var(---colWidth)) calc(0.5* var(---colWidth)) calc(0.75* var(---colWidth));

     */}
          <div
            className="flex flex-col items-start gap-4"
            style={{ color: "var(--text-color-inv)" }}
          >
            {data?.title && <p className="text-sm">{data?.title}</p>}
            {/* <TextAnimation content={content?.title} /> */}

            {/* // <TextTitle
              //   content={content?.titlealt}
              //   color={"text-slate-400"}
              //   className="mb-8"
              // />
             */}

            {data?.content && (
              // <h2 className="text-2xl font-normal">{data.description}</h2>
              <h1 className="leading-normal text-balance"> 
              <AnimatedText content={data.description} delay={AnimTextOrder.ONE}/>
            </h1>
              // <AnimatedText content={data.description}/>
              // <div className="!text-xl" style={{ color: "var(--text-color)" }}>
              //   {documentToReactComponents(data.content.json, RichTextOptions)}
              // </div>
            )}

            {data?.ctalink && data?.cta && (
              <Link href={data.ctalink}>
                <ButtonAlt label={data.cta} type={ButtonType.SECONDARY} />
              </Link>
            )}
          </div>
        </div>

        <div className="flex col-span-12 gap-4 md:col-span-7">
          <div className="flex flex-col flex-grow basis-1">
            <h3
              className="text-sm font-normal"
              style={{ color: "var(--text-color)" }}
            >
              contact
              {/* {data?.description} */}
            </h3>
            {/* <div className="text-xs" style={{ color: "var(--subtext-color)" }}>
              {data?.address && (
                <p style={{ color: "var(--text-color)" }}>{data.address}</p>
              )}
              {data?.phone && (
                <div style={{ color: "var(--text-color)" }}>{data.phone}</div>
              )}
              {data?.email && (
                <div style={{ color: "var(--text-color)" }}>{data.email}</div>
              )}
            </div> */}
          </div>

          <div className="flex flex-col flex-grow rounded-lg basis-1 bg-black/10"
          >
            <h3
              className="text-sm font-normal"
              style={{ color: "var(--text-accent)" }}
            >
             Services
              {/* {data?.description} */}
            </h3>

            <div className="flex flex-col col-span-1 gap-0">
              {pages.map((page) => (
                <Link
                  className="text-xs"
                  key={page.id}
                  href={page.url}
                  scroll={false}
                  style={{ color: "var(--text-color)" }}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>

          
          <div className="flex flex-col flex-grow basis-1">
            <h3
              className="text-sm font-normal"
              style={{ color: "var(--text-accent)" }}
            >
             Social
              {/* {data?.description} */}
            </h3>

            <div className="flex flex-col gap-0">
              {pages.map((page) => (
                <Link
                  className="text-xs"
                  key={page.id}
                  href={page.url}
                  scroll={false}
                  style={{ color: "var(--text-color)" }}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div className="flex w-full col-span-12 gap-4">
          <div className="p-4 rounded-lg flex-grow bg-slate-300">Privacy shit</div>
          <div className="p-4 rounded-lg bg-slate-300">Social shit</div>
        </div>
      </motion.div>


      {/* <motion.div ref={footerRef} className="fixed relative testing123 h-vhh">
          <motion.div
            className="fuck"
            style={{ y: footerOffsetValue }}
            // style={{ translateY: y }}
            //  animate={{ y: footerOffset }}
          >
            {data.intro && <BlockFooter content={data.intro} />}
          </motion.div>
        </motion.div> */}

      <div className="absolute bottom-0 z-20 flex items-center justify-end w-full px-4 py-4">
        {/* <div
          className="text-xs mont-monocode"
          style={{ color: "var(--text-color)" }}
        >
          Site by{" "}
          <Link
          className="text-xs no-underline"
            href="https://www.linkedin.com/in/matias-garcia-dev/"
            target="_blank"
          >
            Matias Garcia
          </Link>
        </div> */}
        <div
          className="flex gap-4 text-xs !font-monocode"
          style={{ color: "var(--text-color)" }}
        >
          <Link 
                  className="text-xs no-underline"
          href="https://www.linkedin.com/in/matias-garcia-dev/">
            Privacy Policy
          </Link>
          <Link 
                  className="text-xs no-underline"
          href="https://www.linkedin.com/in/matias-garcia-dev/">
            Cookies Policy
          </Link>
          <span>Get Source Code</span>
        </div>
      </div>


      {/* <motion.div
        className="absolute w-full h-full"
        style={{
       //   y: yTransform,
          clipPath: "inset( 1rem round 1rem )",
          backgroundColor: "var(--background-color-inv)",
        }}
      /> */}
    </motion.div>
  );
}
