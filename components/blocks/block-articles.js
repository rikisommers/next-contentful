import React from "react";
import PostTile from "../post/post-tile";
import PostTileCs from "../post/post-tile-cs";
import PostTileLg from "../post/post-tile-lg";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import AnimatedText, { AnimStyle } from "../motion/animated-text";
import PostTileRe from "../post/post-tile-reone";
import PostTileImg from "../post/post-tile-img";
import { useThemeContext } from '../themeContext';
// import { useMousePos } from "../mousePosContext"

export const BlockArticles = ({ data }) => {
  // const { setVisible, setContent } = useMousePos();

  // const handleShowCursor = ({content}) => {
  //   setVisible(true);
  //   setContent(content); // Set content based on the article index or any other logic

  // };

  // const handleHideCursor = ({content}) => {
  //   setVisible(false);
  //   setContent(''); // Set content based on the article index or any other logic

  // };


  const { currentTheme } = useThemeContext();
  console.log('data',data.articlesCollection?.items)

  
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
                  <p className="text-red-500">{currentTheme.cardGrid}</p>

      <div className="flex flex-col w-full gap-6">
        {data.articlesCollection?.items &&


          (() => {
            
              
                const GridGroup = ({ items, templateSize, startIndex }) => {
                  if (items.length === 0) return null;
                
                  const groupItems = items.slice(0, templateSize);
                  const remainingItems = items.slice(templateSize);
                
                  let nextTemplateSize;
                  if (templateSize === 6) nextTemplateSize = 4;
                  else if (templateSize === 4) nextTemplateSize = 2;
                  else nextTemplateSize = 6;
                
                  return (
                    <>
                      <div className={`grid-template-${templateSize}`}>
                        {groupItems.map((item, i) => (
                          <div key={startIndex + i} className={`my--${i + 1}`}>
                            <AnimatedElement type={AnimStyleEl.FADEIN}>
                              {currentTheme.cardLayout === 'formal' && <PostTileCs post={item} />}
                              {currentTheme.cardLayout === 'funky' && <PostTileLg post={item} />}
                              {currentTheme.cardLayout === 'reone' && <PostTileRe post={item} />}
                              {currentTheme.cardLayout === 'img' && <PostTileImg post={item} />}


                            </AnimatedElement>
                          </div>
                        ))}
                      </div>
                      <GridGroup 
                        items={remainingItems} 
                        templateSize={nextTemplateSize} 
                        startIndex={startIndex + templateSize} 
                      />
                    </>
                  );
                };
                return (
                  <GridGroup 
                    items={data.articlesCollection.items} 
                    templateSize={6} 
                    startIndex={0} 
                  />
                );
                
             
           
          })()}
      </div>
    </>
  );
};

export default BlockArticles;
