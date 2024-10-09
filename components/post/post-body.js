import { BLOCKS } from "@contentful/rich-text-types"
import RichTextAsset from "../rich-text/rich-text-asset"
import BlockQuote from "../blocks/block-quote"
import BlockImg from "../blocks/block-img"
import BlockEmbed  from "../blocks/block-embed"
import BlockImages from "../blocks/block-images"
import BlockHotspotImg from "../blocks/block-hotspot-image"
import BlockList from "../blocks/block-list"
import BlockCode from "../blocks/block-code"
import BlockArticle from "../blocks/block-article"
import BlockArticles from "../blocks/block-articles"
import BlockHeader from "../blocks/block-header"
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element"

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

export default function PostBody({ content }) {



  return (
    <div className="flex flex-col gap-24 pb-16">
        {/* max-w-6xl gap-32 mx-auto */}
        {content.items &&
          content.items.map((item,index) => {
            return (
              <section key={index}>
                 {item.__typename === "BlockHeader" && (
                  <BlockHeader key={item.id} data={item} ></BlockHeader>
                )}
                {item.__typename === "BlockArticle" && (
                  // <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockArticle key={item.id} data={item} />
                  // </AnimatedElement>
                )}
                {item.__typename === "BlockArticles" && (
                    <BlockArticles key={item.id} data={item} />
                )}
                {item.__typename === "BlockImage" && (
                  // <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockImg key={item.id} data={item} />
                  // </AnimatedElement>
                )}
                {item.__typename === "BlockHotspotImage" && (
                  // <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockHotspotImg key={item.id} data={item} />
                  // </AnimatedElement>
                )}
                {item.__typename === "BlockIg" && (
                  // <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockImages key={item.id} data={item} />
                  // </AnimatedElement>
                )}
                {item.__typename === "BlockQuote" && (
                //  <AnimatedElement type={AnimStyleEl.FADEIN}>
                  <BlockQuote key={item.id} data={item} />
                  // </AnimatedElement>
                )}
                {item.__typename === "BlockEmbed" && (
                  <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockEmbed key={item.id} data={item} />
                  </AnimatedElement>
                )}
                {/* {item.__typename === "BlockList" && (
                  <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockList key={item.id} data={item} />
                  </AnimatedElement>
                )}     */}
                {item.__typename === "BlockCode" && (
                  <AnimatedElement type={AnimStyleEl.FADEIN}>
                    <BlockCode key={item.id} data={item} />
                  </AnimatedElement>
                )}    
              </section>
            );
          })}
  
    </div>
  );
}
