import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import Audio from "../navigation/audio";
import Link from "next/link";
import { useTheme } from "next-themes";
import { themes } from "../../utils/theme";
import { getThemeByKey } from "../../utils/theme";

export default function BlockList({ data }) {

  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  return (
    <article className="grid grid-cols-12 gap-3 article-content">

      <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
        <div className="flex flex-col w-full gap-3 p-4 rounded"
             style={{ backgroundColor: currentTheme?.surface1 }}>
          {data.title && <h1 className="s"
          style={{ color: currentTheme?.headingColor }}>{data.title}</h1>}
          {data.itemsCollection &&
            data.itemsCollection.items.map((item, index) => {
              return (
                <div
                  className="flex flex-col p-3 rounded"
                  style={{ backgroundColor: currentTheme?.surface2 }}
                  key={index}
                >
                  {item.title && <h3 className="mb-0 text-h4" 
                  style={{ color: currentTheme?.textColor }}>{item.title}</h3>}
                  {item.content && <p style={{ color: currentTheme?.subtextColor }}>{item.content}</p>}
                </div>
              );
            })}
        </div>
      </div>
    </article>
  );
}
