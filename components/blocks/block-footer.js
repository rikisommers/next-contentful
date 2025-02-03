import React, { useState, useRef } from "react";
import Link from "next/link";
import { useThemeContext } from "../context/themeContext";
import AnimatedText, {
  AnimStyle,
  AnimTextOrder,
} from "../motion/animated-text";

import ButtonAlt, { ButtonType } from "../base/button-alt";
import { motion, useTransform, useScroll } from "../../utils/motion";

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

  const yTransform = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

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
      style={{
        y: yTransform,
        scale: scaleTransform,
        clipPath: "inset( 1rem round 1rem )",
        backgroundColor: "var(--body-background-color)",
      }}
      className="z-10 flex flex-col justify-between w-screen overflow-clip"
    >
      {/* pt-32 pb-16 */}

      <motion.div
        className="z-20 grid w-full h-full grid-cols-12 gap-8 px-16 pt-16 pb-8"
        style={
          {
            //  y: yTransform,
          }
        }
      >
        <div className="flex col-span-12 md:col-span-7">
          {/* ---columns: 3;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: calc(0.75* var(---colWidth)) calc(0.5* var(---colWidth)) calc(0.75* var(---colWidth));

     */}
          <div
            className="flex flex-col items-start gap-4"
            style={{ color: "var(--subtext-color)" }}
          >
            {data?.title && <p className="text-xs">{data?.title}</p>}
            {/* <TextAnimation content={content?.title} /> */}

            {/* // <TextTitle
              //   content={content?.titlealt}
              //   color={"text-slate-400"}
              //   className="mb-8"
              // />
             */}

            {data?.content && (
              // <h2 className="text-2xl font-normal">{data.description}</h2>
              <h1 className="leading-normal text-balance"
              style={{ color: "var(--subtext-color)" }}

              >
                <AnimatedText
                  type={currentTheme.data.textAnimationPri}
                  content={data.description}
                  delay={AnimTextOrder.ONE}
                />
              </h1>
              // <AnimatedText content={data.description}/>
              // <div className="!text-xl" style={{ color: "var(--text-color)" }}>
              //   {documentToReactComponents(data.content.json, RichTextOptions)}
              // </div>
            )}

            {data?.ctalink && data?.cta && (
              <Link href={data.ctalink} className="no-underline">
                <ButtonAlt label={data.cta} type={ButtonType.PRIMARY} />
              </Link>
            )}

            {/* <button
              id="anchor_1"
              popovertarget="popover_1" // This should match the ID of the popover
              className="p-4 bg-purple-300 cursor-pointer popover-trigger"
            >
              Open popover
            </button>
            <div role="menu"
              className="popover-target"
              id="popover_1" // This ID should match the popovertarget
              popover="true" // Ensure this attribute is set
            >
              <button
                onClick={() =>
                  document.getElementById("popover_1").hidePopover()
                }
              >
                Close
              </button>
              <button>sdsdsd</button>
              <button>sdsdsd</button>
              <button>sdsdsd</button>
            </div> */}
          </div>
        </div>

        <div className="flex flex-col col-span-12 gap-4 md:col-span-5">
          <div className="flex flex-col col-span-12 gap-4 sm:flex-row md:col-span-5">
            <div
              className="flex flex-col flex-grow p-8 rounded-lg basis-1"
              // style={{
              //   backgroundColor: "var(--surface1)",
              // }}
            >
              <h3
                className="mb-4 text-sm font-normal"
                style={{ color: "var(--accent-pri)" }}
              >
                contact
                {/* {data?.description} */}
              </h3>
              <div className="flex flex-col col-span-1 gap-2">
                {pages.map((page) => (
                  <Link
                    className="text-sm no-underline"
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
            <div className="flex flex-col flex-grow gap-4 basis-1">
              <div
                className="flex flex-col p-8 rounded-lg"
                // style={{
                //   backgroundColor: "var(--surface1)",
                // }}
              >
                <h3
                  className="mb-4 text-sm font-normal"
                  style={{ color: "var(--accent-pri)" }}
                >
                  Services
                  {/* {data?.description} */}
                </h3>

                <div className="flex flex-col col-span-1 gap-2">
                  {pages.map((page) => (
                    <Link
                      className="text-sm no-underline"
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
              <div
                className="flex flex-col p-8 rounded-lg "
                // style={{
                //   backgroundColor: "var(--accent-pri)",
                // }}
              >
                <h3
                  className="mb-4 text-sm font-normal "
                  style={{ color: "var(--text-color)" }}
                >
                  Product
                  {/* {data?.description} */}
                </h3>
              </div>
            </div>
          </div>
          {/* <h3
              className="text-sm font-normal"
              style={{ color: "var(--text-accent)" }}
            >
              Social
            </h3> */}
          {/* {data?.description} */}
          {/* <div className="flex flex-col flex-grow basis-1">
        

            <div className="grid grid-cols-2 grid-rows-2 gap-4 ">
              {pages.map((page) => (
                <Link
                  className="text-xs rounded-lg bg-black/10 aspect-square"
                  key={page.id}
                  href={page.url}
                  scroll={false}
                  style={{ color: "var(--text-color)" }}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          </div> */}
        </div>

        <div className="flex w-full col-span-12 gap-2">
          <div
            className="flex items-center flex-grow gap-4 px-5 rounded-lg"
            style={{
              backgroundColor: "var(--surface1)",
            }}
          >
            <Link
              className="text-xs no-underline"
              style={{ color: "var(--text-color)" }}
              href="https://www.linkedin.com/in/matias-garcia-dev/"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-xs no-underline"
              style={{ color: "var(--text-color)" }}
              href="https://www.linkedin.com/in/matias-garcia-dev/"
            >
              Cookies Policy
            </Link>
          </div>
          <div
            className="p-2 rounded-lg "
            style={{
              backgroundColor: "var(--surface1)",
            }}
          >
            <div
              className={`w-[32px] h-[32px] flex items-center justify-center`}
            >
              <img
                src="/shapes/star.svg"
                viewBox="0 0 32 32"
                className="h-full"
              ></img>
            </div>
          </div>
          <div
            className="p-2 rounded-lg "
            style={{
              backgroundColor: "var(--surface1)",
            }}
          >
            <div
              className={`w-[32px] h-[32px] flex items-center justify-center`}
            >
              <img
                src="/shapes/star.svg"
                viewBox="0 0 32 32"
                className="h-full"
              ></img>
            </div>
          </div>
          <div
            className="p-2 rounded-lg "
            style={{
              backgroundColor: "var(--surface1)",
            }}
          >
            <div
              className={`w-[32px] h-[32px] flex items-center justify-center`}
            >
              <img
                src="/shapes/star.svg"
                viewBox="0 0 32 32"
                className="h-full"
              ></img>
            </div>
          </div>
          <div
            className="p-2 rounded-lg "
            style={{
              backgroundColor: "var(--surface1)",
            }}
          >
            <div
              className={`w-[32px] h-[32px] flex items-center justify-center`}
            >
              <img
                src="/shapes/star.svg"
                viewBox="0 0 32 32"
                className="h-full"
              ></img>
            </div>
          </div>
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
