import { BLOCKS } from "@contentful/rich-text-types";
import RichTextAsset from "../rich-text/rich-text-asset";
import BlockQuote from "../blocks/block-quote";
import BlockImg from "../blocks/block-img";
import BlockEmbed from "../blocks/block-embed";
import BlockImages from "../blocks/block-images";
import BlockHotspotImg from "../blocks/block-hotspot-image";
import BlockList from "../blocks/block-list";
import BlockCode from "../blocks/block-code";
import BlockArticle from "../blocks/block-article";
import BlockArticles from "../blocks/block-articles";
import BlockHeader from "../blocks/block-header";
import BlockHero from "../blocks/block-hero";
import BlockIntro from "../blocks/block-intro";
import { BlockPreviewGrid } from "../blocks/block_preview_grid";
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";
import { useThemeContext } from "../context/themeContext";
import { pageWidthThemes } from "../../utils/theme";

const ArticleWrapper = ({ children }) => {
  const { currentTheme } = useThemeContext();
  return (
    <div className={`max-w-screen-xl mx-auto pb-12
      ${currentTheme.data.navPosition === 'leftCenter' ? 'pl-32 pr-24' : ''}
      ${currentTheme.data.navPosition === 'rightCenter' ? 'pr-32 pr-24' : ''}
    `}>
      {children}
    </div>
  )
}


export default function PostBody({ content, tags }) {
  const { currentTheme } = useThemeContext();
  const pageWidth = currentTheme.data.pageWidth;

  // console.log('currentTheme',currentTheme)
  // console.log('content',content)
  return (
    <div className={`flex flex-col gap-16 self-center
       ${(() => {
         // For Tailwind v4, max-width classes have changed
         const widthClasses = {
           'fluid': "w-full mx-auto", // No max width constraint
           'large': "max-w-[1280px] mx-auto", // Equivalent to previous max-w-screen-xl
           'small': "max-w-[768px] mx-auto", // Equivalent to previous max-w-screen-md
           'medium': "max-w-[1024px] mx-auto" // Equivalent to previous max-w-screen-lg
         };
         
         // Get the width value, defaulting to 'medium'
         const width = currentTheme.data.pageWidth || 'medium';
         
         // Return the matching class or default
         return widthClasses[width];
       })()}
    
    `}>
      <h1>ssss{pageWidth.toString()}sss</h1>

      {/* max-w-6xl gap-32 mx-auto */}
      {content.items &&
        content.items.map((item, index) => {
          return (
            <section key={index} className="w-full">
              {item.__typename === "BlockHero" && (
                <>
                <BlockHero
                  // clip={content.items.length === 1 ? false : true}
                  intro={item.intro}
                  tag={item.tag}
                  title={item.intro}
                  content={item.content}
                  image={item.image}
                />
                </>
              )}
              {item.__typename === "BlockHeader" && (
               <ArticleWrapper>
                  <BlockHeader
                    key={item.id}
                    data={item}
                    id={item.title}
                  ></BlockHeader>
                </ArticleWrapper>
              )}
              {item.__typename === "BlockPreview" && (
                <ArticleWrapper>
                  <BlockPreviewGrid />
                </ArticleWrapper>
              )}
              {item.__typename === "BlockArticle" && (
                <ArticleWrapper>
                  <BlockArticle key={item.id} data={item} id={item.title} />
                </ArticleWrapper>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockArticles" && (
            
                  <BlockArticles
                    key={item.id}
                    data={item}
                    tags={tags}
                    id={item.title}
                  />
        
              )}
              {item.__typename === "BlockImage" && (
                // <AnimatedElement type={AnimStyleEl.FADEIN}>
                <ArticleWrapper>
                  <BlockImg key={item.id} data={item} id={item.title} />
                </ArticleWrapper>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockHotspotImage px-16" && (
                // <AnimatedElement type={AnimStyleEl.FADEIN}>
                <ArticleWrapper>
                  <BlockHotspotImg key={item.id} data={item} id={item.title} />
                </ArticleWrapper>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockIg" && (
                // <AnimatedElement type={AnimStyleEl.FADEIN}>
                <ArticleWrapper>
                  <BlockImages key={item.id} data={item} id={item.title} />
                </ArticleWrapper>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockQuote" && (
                //  <AnimatedElement type={AnimStyleEl.FADEIN}>
                <ArticleWrapper>
                  <BlockQuote key={item.id} data={item} id={item.title} />
                </ArticleWrapper>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockEmbed" && (
                <ArticleWrapper>
                  <BlockEmbed key={item.id} data={item} id={item.title} />
                </ArticleWrapper>
              )}
              {item.__typename === "BlockCode" && (
             
                 <ArticleWrapper>
                    <BlockCode key={item.id} data={item} id={item.title} />
                  </ArticleWrapper>
              )}
              {item.__typename === "BlockList" && (
                <div className="mx-auto max-w-screen-xl">
                  <ArticleWrapper>
                    <BlockList key={item.id} data={item} id={item.title} />
                  </ArticleWrapper>
                </div>
              )}
              {item.__typename === "BlockIntro" && (
                <div className="mx-auto max-w-screen-xl">
                  <ArticleWrapper>
                    <BlockIntro key={item.id} data={item} id={item.id} />
                  </ArticleWrapper>
                </div>
              )}
            </section>
          );
        })}
    </div>
  );
}
