import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { RichTextOptions } from "../rich-text/rich-text";
import ContentfulImage from "../image/contentful-image";
import { useTheme } from 'next-themes';
import { themes } from "../../utils/theme";
import { getThemeByKey } from '../../utils/theme';


export const BlockArticle = ({ article }) => {

  const {theme} = useTheme()
  const currentTheme = getThemeByKey(theme);

  return (
    <article className="grid grid-cols-12 gap-3 article-content" id={article.title}>
 

      <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
        
        {article.title && 
        <h2 className="mb-10 text-3xl" style={{color:currentTheme?.headingColor}}>{article.title}</h2>
        }
        {article.content && (
          <p className="mb-8 text-base" style={{color:currentTheme?.subtitleColor}}>{article.content.content}</p>
        )}

        {article.contentRich && (
          <div style={{color:currentTheme?.textColor}}>
            {documentToReactComponents(
              article.contentRich.json,
              RichTextOptions
            )}
          </div>
        )}
        {article.img &&
          article.img.map((img) => {
            return (
              <ContentfulImage
                key={img.title}
                width={2000}
                height={1000}
                alt={`Cover Image for ${img.title}`}
                src={img.url}
              />
            );
          })}
      </div>
    </article>
  );
};

export default BlockArticle;
