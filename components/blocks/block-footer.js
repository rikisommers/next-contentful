import React, { useState, useRef } from "react";
import Link from "next/link";
import { useThemeContext } from "../context/themeContext";
import AnimatedText, {
  AnimStyle,
  AnimTextOrder,
} from "../motion/animated-text";

import Button from "../base/button/button";
import ButtonWipe from "../base/button/button-wipe";
import ButtonMonks from "../base/button/button-monks";
import { ButtonType, ButtonSound } from "../base/button/button.util";
import ButtonSwap from "../base/button/button-swap";
import { motion, useTransform, useScroll } from "../../utils/motion";

export default function BlockFooter({ data }) {
  const { currentTheme } = useThemeContext();
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,

    offset: ["start end", "end end"],
    onChange: (latest) => {
    //  console.log("Latest scroll position:", latest);
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
      className="flex z-10 flex-col justify-between w-screen overflow-clip"
    >
      {/* pt-32 pb-16 */}

      <motion.div className="grid z-20 grid-cols-12 gap-8 px-16 pt-16 pb-8 w-full h-full">
        <div className="flex col-span-12 md:col-span-7">
          <div className="flex flex-col gap-4 items-start">
            {data?.title && (
              <p className="text-xs" style={{ color: "var(--subtext-color)" }}>
                {data?.title}
              </p>
            )}

            {data?.content && (
              <div className="fluid-type">
              // <h2 className="text-2xl font-normal">{data.description}</h2>
              <h2
                className="text-3xl font-normal leading-normal text-balance"
                style={{ color: "var(--text-color)" }}
              >
                <AnimatedText
                  type={AnimStyle.NONE}
                  content={data.content}
                  delay={AnimTextOrder.ONE}
                />
              </h2>
              </div>
            )}




            {data?.ctalink && data?.cta && (
              <Link href={data.ctalink} className="no-underline">
                <ButtonWipe label={data.cta} type={ButtonType.PRIMARY} />
              </Link>
            )}
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
                style={{ color: "var(--subtext-color)" }}
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
                  style={{ color: "var(--subtext-color)" }}
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
                className="flex flex-col p-8 rounded-lg"
                style={{ backgroundColor: "var(--surface1)" }}
              >
                <h3
                  className="mb-4 text-sm font-normal"
                  style={{ color: "var(--text-color)" }}
                >
                  Product
                  {/* {data?.description} */}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex col-span-12 gap-2 w-full">
          <div
            className="flex flex-grow gap-4 items-center px-5 rounded-lg"
            style={{ color: "var(--text-color)" }}
          >
            {data.privacypolicy && (
              <Link className="text-xs no-underline" href={data.privacypolicy}>
                Privacy Policy
              </Link>
            )}
            {data.cookiespolicy && (
              <Link className="text-xs no-underline" href={data.cookiespolicy}>
                Cookies Policy
              </Link>
            )}
          </div>

          {data.socialCollection && data.socialCollection.items?.length && (
            <div className="flex gap-2">
              {data.socialCollection.items.map((item, i) => (
                <Link
                  href={item.url}
                  key={i}
                  className={`flex justify-center items-center p-2 rounded-lg w-[32px] h-[32px]`}
                  style={{
                    backgroundColor: "var(--surface1)",
                  }}
                >
                  <img
                    alt={item.title}
                    src={item.icon.url}
                    viewBox="0 0 24 24"
                  ></img>
                </Link>
              ))}
            </div>
          )}
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
