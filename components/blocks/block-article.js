import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { RichTextOptions } from "../rich-text/rich-text";
import ContentfulImage from "../image/contentful-image";

export const BlockArticle = ({ article }) => {
  return (
    <article className="grid grid-cols-12 gap-3" id={article.title}>
 

      <div className="col-start-2 col-span-10 md:col-start-3 md:col-span-8">
        
        {article.title && 
        <h2 className="text-3xl mb-10">{article.title}</h2>
        }
        {article.content && (
          <p className="text-base mb-8">{article.content.content}</p>
        )}

        {article.contentRich && (
          <>
            {documentToReactComponents(
              article.contentRich.json,
              RichTextOptions
            )}
          </>
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
