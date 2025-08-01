import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRichTextOptions } from "../rich-text/rich-text";
import ContentfulImage from "../image/contentful-image";
import { useThemeContext } from "../context/themeContext";

export const BlockArticle = ({ data }) => {

  const { currentTheme } = useThemeContext();
  const richTextOptions = useRichTextOptions();

  const getContentClass = (height) => {
    switch (height) {
      case "center":
        return "mx-auto max-w-prose";
      case "left":
        return "max-w-prose";
        case "split":
          return "w-full grid grid-cols-2";
      default:
        return "mx-auto max-w-prose";
    }
  };


  return (

    <article className={`${getContentClass(currentTheme.data.bodyTextAlign)} richtext`} id={data.title}>
 

        
        {data.title && 
        <h2 className="mb-4 text-sm font-normal" style={{color: 'var(--subtext-color)'}}>{data.title}</h2>
        }
        {data.content && (
          <p className={`mb-8 text-base ${currentTheme.data.bodyTextIndent ? "indent-12" : ""}`} 
          style={{color: 'var(--subtext-color)',}}>{data.content.content}</p>
        )}

        {data.contentRich && (
          <div style={{color:'var(--text-color)'}} className={`leading-normal text-balance ${currentTheme.data.bodyTextIndent ? "[&>p:first-of-type]:indent-12" : ""}`}>
            {documentToReactComponents(
              data.contentRich.json,
              richTextOptions
            )} 
          </div>
        )}
        {data.img &&
          data.img.map((img) => {
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
    </article>
  
  );
};

export default BlockArticle;
