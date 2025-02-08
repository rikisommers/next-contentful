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
import AnimatedElement, { AnimStyleEl } from "../motion/animated-element";

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
  return (
    <div className="flex flex-col w-full gap-16 pb-8">
      {/* max-w-6xl gap-32 mx-auto */}
      {content.items &&
        content.items.map((item, index) => {
          return (
            <section key={index} className="w-full">
              {item.__typename === "BlockHero" && (
                <BlockHero
                  intro={item.intro}
                  tag={item.tag}
                  title={item.intro}
                  content={item.content}
                  image={item.image}
                />
              )}
              {item.__typename === "BlockHeader" && (
                <div className="max-w-screen-xl mx-auto">
                  <BlockHeader
                    key={item.id}
                    data={item}
                    id={item.title}
                  ></BlockHeader>
                </div>
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
                <div className="max-w-screen-xl mx-auto">
                  <BlockImg key={item.id} data={item} id={item.title} />
                </div>
                // </AnimatedElement>
              )}
              {item.__typename === "BlockHotspotImage" && (
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
