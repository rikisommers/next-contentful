import { BLOCKS } from "@contentful/rich-text-types"
import RichTextAsset from "../rich-text/rich-text-asset"
import BlockArticle from "../blocks/block-article"
import BlockQuote from "../blocks/block-quote"
import BlockImg from "../blocks/block-img"
import BlockEmbed  from "../blocks/block-embed"
import BlockImages from "../blocks/block-images"
import BlockHotspotImg from "../blocks/block-hotspot-image"
import BlockList from "../blocks/block-list"
import BlockCode from "../blocks/block-code"

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
    <div className="flex flex-col max-w-6xl gap-32 mx-auto">

        {content.items &&
          content.items.map((item,index) => {
            return (
              <section key={index}>
                {item.__typename === "BlockArticle" && (
                  <BlockArticle key={item.id} article={item} ></BlockArticle>
                )}

                {item.__typename === "BlockImage" && (
                  <BlockImg key={item.id} data={item} />
                )}

                {item.__typename === "BlockHotspotImage" && (
                  <BlockHotspotImg key={item.id} data={item} />
                )}
                {item.__typename === "BlockIg" && (
                  <BlockImages key={item.id} data={item} />
                )}


                {item.__typename === "BlockQuote" && (
                  <BlockQuote key={item.id} data={item} />
                )}

                {item.__typename === "BlockEmbed" && (
                  <BlockEmbed key={item.id} data={item} />
                )}

                {item.__typename === "BlockList" && (
                  <BlockList key={item.id} data={item} />
                )}    
                {item.__typename === "BlockCode" && (
                  <BlockCode key={item.id} data={item} />
                )}    
              </section>
            );
          })}
  
    </div>
  );
}
