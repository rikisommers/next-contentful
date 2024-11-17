import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";
import ContentfulImage from "../image/contentful-image";

export const BlockArticle = ({ data }) => {


  return (

    <article className="max-w-lg article-content" id={data.title}>
 

        
        {data.title && 
        <h2 className="mb-4 font-normal text-1xl" style={{color: 'var(--heading-color)',}}>{data.title}</h2>
        }
        {data.content && (
          <p className="mb-8 text-base" style={{color: 'var(--subtext-color)',}}>{data.content.content}</p>
        )}

        {data.contentRich && (
          <div style={{color:'var(--text-color)'}} className="leading-normal text-balance">
            {documentToReactComponents(
              data.contentRich.json,
              RichTextOptions
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
