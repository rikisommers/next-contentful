import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

export const RichTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data;
      return (
        <a href={uri} className="no-underline hover:underline"
          style={{
            color:'var(--text-accent)'
          }}
        >
          {children}
        </a>
      );
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2 className="mb-2 text-2xl font-normal">{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="mb-2 text-xl font-normal">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4 className="mb-2 text-lg font-normal">{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (node, children) => {
      return <h5 className="mb-2 text-base font-normal">{children}</h5>;
    },

    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="mb-4">{children}</p>;
    },
    // [BLOCKS.TABLE]: (node, children) => {
    //   return <table className="table-auto">{children}</table>;
    // },
    // [BLOCKS.EMBEDDED_ASSET]: (node) => {
    //   const { gatsbyImageData, description } = node.data.target;
    //   return (
      
    //     <ContentfulImage
    //     key={img.title}
    //     width={2000}
    //     height={1000}
    //     alt={`Cover Image for ${img.title}`}
    //     src={img.url}
    //   />
    //   );
    // },
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};
