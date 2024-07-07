import React from "react";
import { motion } from "framer-motion";
import TextAnimation from "../utils/text-animation";
import { TextTitle } from "../rich-text/text-title";
import Audio from "../navigation/audio";
import Link from "next/link";
import { useTheme } from "next-themes";
import { themes } from "../../utils/theme";
import { getThemeByKey } from "../../utils/theme";

import PostTile from "../post/post-tile";
import PostTileCs from "../post/post-tile-cs";
import PostTileImg from "../post/post-tile-img";
import PostTileLg from "../post/post-tile-lg";

export const BlockArticles = ({ data }) => {


  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);
  return (
    <section lassName="p-8">

            
          {data.title && 
          <h1 style={{ color: currentTheme?.headingColor }}>{data.title}
          </h1>
          }

          <div className="grid grid-cols-12 gap-4">
          {data.articlesCollection &&
            data.articlesCollection.items.map((item, i) => {
                    //const isRect = (i > 0 && i % 3 == 0);
                    return (
                    <div className={i > 0 && i % 2 == 0 ? 'col-span-12' : 'col-span-12 md:col-span-6'}>
                    <PostTileLg post={item} size={i > 0 && i % 2 == 0 ? 'rect' : 'sq'}/>
                        </div>
                    )
              
           
            })}
            </div>
    </section>
  );
}
export default BlockArticles;
