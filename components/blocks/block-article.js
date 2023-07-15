import React, {useRef} from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { motion, useScroll } from "framer-motion";
import RichTextOptions from "../rich-text/rich-text";
import ContentfulImage from "../image/contentful-image";


export const BlockArticle = ({ article }) => {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"]
  });

  return (
    <section ref={ref} className="u-mb--80" id={article.title}>
              

        <div className="title mb-4">
          {article.title && (
            <h2 className="text-2xl">{article.title}</h2>
          )}
          {article.content && (
            <p className="text-base mb-2">{article.content.content}</p>
          )}
        </div>

        <div className="rich-content">
          {article.contentRich && (

            <>{documentToReactComponents(article.contentRich.json, RichTextOptions)}</>
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
      
    </section>
  );
};

export default BlockArticle;
