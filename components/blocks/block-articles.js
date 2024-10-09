import React from "react";
import PostTile from "../post/post-tile";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import AnimatedText, { AnimStyle } from "../motion/animated-text";
import { useThemeContext } from '../themeContext';
import { useMousePos } from "../mousePosContext"

export const BlockArticles = ({ data }) => {
  const { setVisible, setContent } = useMousePos();

  const handleShowCursor = ({content}) => {
    setVisible(true);
    setContent(content); // Set content based on the article index or any other logic

  };

  const handleHideCursor = ({content}) => {
    setVisible(false);
    setContent(''); // Set content based on the article index or any other logic

  };


  const { currentTheme } = useThemeContext();

  return (
    <>

    
      {data.title && (
        <h3
          className="py-2 font-mono text-xs"
          style={{ color: "var(--heading-color)" }}
        >
          <AnimatedText type={AnimStyle.CHARFADE} content={data.title} />
        </h3>
      )}

      <div className="grid grid-cols-12 gap-4">
        {data.articlesCollection?.items &&
          (() => {
            switch (data.type[0]) {
              case "titledCardGrid":
                return data.articlesCollection.items.map((item, i) => (
                  <div key={i} 
                       className="col-span-12 md:col-span-6"
                       onMouseEnter={handleShowCursor(item.title)} 
                       onMouseLeave={handleHideCursor(item.title)} >
                    <AnimatedElement type={AnimStyleEl.FADEIN}>

                          { currentTheme.cardStyle === 'formal' && 
                             <PostTileCs post={item} />
                            }
                         { currentTheme.cardStyle === 'funky' && 
                             <PostTileLg post={item} />
                            }
                    </AnimatedElement>
                  </div>
                ));
              case "tileGrid":
                return data.articlesCollection.items.map((item, i) => {
                  const isFullWidth =
                    i > 0 && i % 2 === 0
                      ? "col-span-12"
                      : "col-span-12 md:col-span-6";
                  return (
                    <div key={i} className={isFullWidth}>
                      <AnimatedElement type={AnimStyleEl.FADEIN}>
                        <PostTileLg
                          post={item}
                          size={isFullWidth === "col-span-12" ? "rect" : "sq"}
                        />
                      </AnimatedElement>
                    </div>
                  );
                });
              case "list":
                return data.articlesCollection.items.map((item, i) => (
                  <div key={i} className="col-span-12 md:col-span-6">
                    <AnimatedElement type={ElAnimStyle.FADEIN}>
                      <PostTile post={item} />
                    </AnimatedElement>
                  </div>
                ));
              default:
                // Add a default case to handle unexpected data.type values
                return data.articlesCollection.items.map((item, i) => (
                  <div key={i} className="col-span-12 md:col-span-6">
                    <AnimatedElement type={AnimStyleEl.FADEIN}>
                      <PostTileCs post={item} />
                    </AnimatedElement>
                  </div>
                ));
            }
          })()}
      </div>
    </>
  );
};

export default BlockArticles;
