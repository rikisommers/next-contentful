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

      <motion.div className="z-20 grid w-full h-full grid-cols-12 gap-8 px-16 pt-16 pb-8">
        <div className="flex col-span-12 md:col-span-7">
          <div className="flex flex-col items-start gap-4">
            {data?.title && (
              <p className="text-xs" style={{ color: "var(--subtext-color)" }}>
                {data?.title}
              </p>
            )}

            {data?.content && (
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
            )}

            {data?.ctalink && data?.cta && (
              <Link href={data.ctalink} className="no-underline">
                <ButtonAlt label={data.cta} type={ButtonType.PRIMARY} />
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
                className="flex flex-col p-8 rounded-lg "
                style={{ backgroundColor: "var(--surface1)" }}
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
        </div>

        <div className="flex w-full col-span-12 gap-2">
          <div
            className="flex items-center flex-grow gap-4 px-5 rounded-lg"
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
            <div className="flex gap-2 ">
              {data.socialCollection.items.map((item, i) => (
                <Link
                  href={item.url}
                  key={i}
                  className={`w-[32px] h-[32px] flex items-center justify-center rounded-lg p-2`}
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
