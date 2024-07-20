import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichTextOptions } from "../rich-text/rich-text";
import ContentfulImage from "../image/contentful-image";

export const BlockArticle = ({ data }) => {


  return (

    <article className="grid grid-cols-12 gap-3 article-content" id={data.title}>
 

      <div className="col-span-10 col-start-2 md:col-start-3 md:col-span-8">
        
        {data.title && 
        <h2 className="mb-10 text-3xl" style={{color: 'var(--heading-color)',}}>{data.title}</h2>
        }
        {data.content && (
          <p className="mb-8 text-base" style={{color: 'var(--subtext-color)',}}>{data.content.content}</p>
        )}

        {data.contentRich && (
          <div style={{color:'var(--text-color)'}}>
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
      </div>
    </article>
  
  );
};

export default BlockArticle;
