import { BLOCKS } from "@contentful/rich-text-types";

export const RichTextForAnimOptions = {
 
  renderNode: {

    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <span>{children}</span>;
    },

   
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};
