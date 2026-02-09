import React, { useState, useRef } from "react";
import Link from "next/link";
import { useThemeContext } from "../context/themeContext";
import AnimatedText, {
  AnimStyle,
  AnimTextOrder,
} from "../motion/animated-text";
import PostTileImg from "../tile/post-tile-img";
import Button from "../base/button/button";
import ButtonWipe from "../base/button/button-wipe";
import ButtonMonks from "../base/button/button-monks";
import { ButtonType, ButtonSound } from "../base/button/button.util";
import ButtonSwap from "../base/button/button-swap";
import { motion, useTransform, useScroll } from "../../utils/motion";

export default function FooterOnto({ data, pages }) {
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

  const yTransform = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <footer className="flex z-10 flex-col items-center justify-center w-full h-screen overflow-clip">
      {/* pt-32 pb-16 */}

      <div className="flex flex-col items-center text-center  gap-8 w-full  px-16 md:max-w-5xl">
        {data?.title && (
          <div className="inline-flex px-2 py-1 text-xs font-medium uppercase rounded-full">
            {data?.title}
          </div>
        )}

        {data?.content && (
          <h2 className="text-4xl font-normal text-[var(--text-color)]">
            {data.content}
          </h2>
          /* <h2
                  className="text-3xl font-normal leading-normal text-balance"
                  style={{ color: "var(--text-color)" }}
                >
                  <AnimatedText
                    type={AnimStyle.NONE}
                    content={data.content}
                    delay={AnimTextOrder.ONE}
                  />
                </h2> */
        )}

        {data?.ctalink && data?.cta && (
          <Link href={data.ctalink} className="no-underline">
            <ButtonWipe label={data.cta} type={ButtonType.PRIMARY} />
          </Link>
        )}
      </div>

      <div className="flex justify-between items-baseline absolute bottom-0 left-0 right-0 p-4">
        <div className="flex gap-2">
          {data.socialCollection &&
            data.socialCollection.items?.length &&
            data.socialCollection.items.map((item, i) => (
              <Link
                href={item.url}
                key={i}
                className="text-sm no-underline text-[var(--text-color)]"
              >
                {item.title}
              </Link>
            ))}
        </div>

        <div className="flex gap-2">
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
    </footer>
  );
}
