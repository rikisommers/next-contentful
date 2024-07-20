import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import { TextAnimRandom } from "../rich-text/text-anim-random";
import { TextAnimLineUp } from "../rich-text/text-anim-line-up";
import { TextAnimLinear } from "../rich-text/text-anim-linear";
import { TextSubtitle } from "../rich-text/text-subtitle";
import Audio from "../navigation/audio";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getThemeByKey } from "../../utils/theme";

export default function BlockHeader({ data }) {
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);

  return (
    <div
      className={`relative flex items-end ${
        data.primaryPageHeader === true ? "h-vhh" : ""
      }`}
    >
      {/* pt-32 pb-16 */}
      <div className="z-20 grid items-start w-full grid-cols-12 gap-3 px-8 py-16">
        <div className="col-span-12 md:col-span-6">
          {/* <TextAnimation content={content?.title} /> */}
          {data?.title && (
            <h2 className="text-xl font-regular font-aon">
              <TextAnimation content={data.title} />
            </h2>
          )}
        </div>
        <p
          className="col-span-6 text-4xl font-medium text-right font-aon md:col-span-6"
          style={{ color: currentTheme?.headingColor }}
        >
          <TextAnimLineUp content={data?.content} />
        </p>
      </div>
    </div>
  );
}
