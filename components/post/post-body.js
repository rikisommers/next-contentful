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
const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    ),
  },
});




export default function PostBody({ content, tags }) {
  const { currentTheme } = useThemeContext();
  const pageWidth = currentTheme.data.pageWidth;

  console.log('currentTheme',currentTheme)
  return (
    <div className={`flex flex-col gap-16 self-center pb-20
       ${currentTheme.data.navPosition === 'leftCenter' ? 'pl-16' : ''}
       ${currentTheme.data.navPosition === 'rightCenter' ? 'pr-16' : ''}
       ${(() => {
         // For Tailwind v4, max-width classes have changed
         const widthClasses = {
           'fluid': "w-full ", // No max width constraint
           'large': "max-w-[1280px]", // Equivalent to previous max-w-screen-xl
           'small': "max-w-[768px]", // Equivalent to previous max-w-screen-md
           'medium': "max-w-[1024px]" // Equivalent to previous max-w-screen-lg
         };
         
         // Get the width value, defaulting to 'medium'
         const width = currentTheme.data.pageWidth || 'medium';
         
         // Return the matching class or default
         return widthClasses[width] || "max-w-[1024px] mx-auto";
       })()}
    
    `}>

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
                <div className="">
                
                  <BlockHeader
                    key={item.id}
                    data={item}
                    id={item.title}
                  ></BlockHeader>
                </div>
              )}
              {item.__typename === "BlockPreview" && (
                  <BlockPreviewGrid />
              )}
              {item.__typename === "BlockArticle" && (
                <div className="max-w-screen-xl mx-auto">
                  <BlockArticle key={item.id} data={item} id={item.title} />
                </div>
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
                <div className="max-w-screen-xl px-16 mx-auto">
                  <BlockImg key={item.id} data={item} id={item.title} />
                </div>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockHotspotImage px-16" && (
                // <AnimatedElement type={AnimStyleEl.FADEIN}>
                <BlockHotspotImg key={item.id} data={item} id={item.title} />
                // </AnimatedElement>
              )}
              {item.__typename === "BlockIg" && (
                // <AnimatedElement type={AnimStyleEl.FADEIN}>
                <BlockImages key={item.id} data={item} id={item.title} />
                // </AnimatedElement>
              )}
              {item.__typename === "BlockQuote" && (
                //  <AnimatedElement type={AnimStyleEl.FADEIN}>
                <div className="max-w-screen-xl mx-auto">
                  <BlockQuote key={item.id} data={item} id={item.title} />
                </div>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockEmbed" && (
                <AnimatedElement type={AnimStyleEl.FADEIN}>
                  <BlockEmbed key={item.id} data={item} id={item.title} />
                </AnimatedElement>
              )}
              {item.__typename === "BlockCode" && (
                <div className="max-w-screen-xl mx-auto">
                  <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockCode key={item.id} data={item} id={item.title} />
                  </AnimatedElement>
                </div>
              )}
              {item.__typename === "BlockList" && (
                <div className="max-w-screen-xl mx-auto">
                  <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockList key={item.id} data={item} id={item.title} />
                  </AnimatedElement>
                </div>
              )}
              {item.__typename === "BlockIntro" && (
                <div className="max-w-screen-xl mx-auto">
                  <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockIntro key={item.id} data={item} id={item.id} />
                  </AnimatedElement>
                </div>
              )}
            </section>
          );
        })}
    </div>
  );
}
