import React from "react";
import { motion } from "../../utils/motion";;
import RichTextAsset from "../rich-text/rich-text-asset"
import { RichTextOptions } from "../rich-text/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

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
