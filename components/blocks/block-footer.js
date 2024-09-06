import React, { useState, useRef } from "react";
import Link from "next/link";
import { RichTextOptions } from "../rich-text/rich-text";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Button, { ButtonType } from "../base/button";
import {
  motion,
  useTransform,
  useMotionValue,
  cubicBezier,
  useScroll,
  useInView,
  useMotionValueEvent,
} from "framer-motion";

export default function BlockFooter({ data }) {
  console.log("foot d", data);
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

  const yTransform = useTransform(scrollYProgress, [0, 1], [100, 0]);

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
      className="relative flex flex-col justify-between overflow-clip h-vh44"
    >
      {/* pt-32 pb-16 */}

      <div className="z-20 grid w-full grid-cols-12 gap-8 px-16 py-16">
        <div className="flex col-span-12 md:col-span-5">
          <div className="flex flex-col items-start gap-4 ">
            {data?.title && (
              <motion.p
                className="text-sm"
                style={{ color: "var(--text-color-inv)" }}
              >
                {data?.title}
              </motion.p>
            )}
            {/* <TextAnimation content={content?.title} /> */}

            {/* // <TextTitle
              //   content={content?.titlealt}
              //   color={"text-slate-400"}
              //   className="mb-8"
              // />
             */}

            {data?.content && (
              <div className="text-2xl" style={{ color: "var(--text-color)" }}>
                {documentToReactComponents(data.content.json, RichTextOptions)}
              </div>
            )}

            {data?.ctalink && data?.cta && (
              <Link href={data.ctalink}>
                <Button label={data.cta} type={ButtonType.SECONDARY} />
              </Link>
            )}
          </div>
        </div>

        <div
          className="flex flex-col col-span-12 gap-6 pt-8 font-light text-left md:col-span-7 text-balance"
          style={{ color: "var(--text-color-inv)" }}
        >
          <div className="grid grid-cols-12">
            <h3
              className="col-span-2 col-start-4 text-sm"
              style={{ color: "var(--text-accent)" }}
            >
              contact
              {/* {data?.description} */}
            </h3>

            <div className="col-span-4">
              {data?.address && (
                <div style={{ color: "var(--text-color)" }}>{data.address}</div>
              )}
              {data?.phone && (
                <div style={{ color: "var(--text-color)" }}>{data.phone}</div>
              )}
              {data?.email && (
                <div style={{ color: "var(--text-color)" }}>{data.email}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <h3
              className="col-span-2 col-start-4 text-sm"
              style={{ color: "var(--text-accent)" }}
            >
              pages
              {/* {data?.description} */}
            </h3>

            <div className="flex flex-col gap-0">
              {pages.map((page) => (
                <Link
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
      </div>

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

      <div className="z-20 flex items-center justify-between w-full px-16 py-8">
        <div
          className="text-xs mont-monocode"
          style={{ color: "var(--text-color)" }}
        >
          Site by{" "}
          <Link
            href="https://www.linkedin.com/in/matias-garcia-dev/"
            target="_blank"
          >
            Matias Garcia
          </Link>
        </div>
        <div
          className="flex gap-4 text-xs !font-monocode"
          style={{ color: "var(--text-color)" }}
        >
          <Link href="https://www.linkedin.com/in/matias-garcia-dev/">
            Privacy Policy
          </Link>
          <Link href="https://www.linkedin.com/in/matias-garcia-dev/">
           Cookies Policy
          </Link>
          <span>
            Get Source Code
          </span>
        </div>
      </div>

      <motion.div
        className="absolute w-full h-full"
        style={{
          y: yTransform,
          clipPath: "inset( 1rem round 1rem )",
          backgroundColor: "var(--accent)",
        }}
      />
    </motion.div>
  );
}
