import React, { useState, useRef } from "react";
import PostIntro from "../components/post/post-intro";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
import { ClipContainer } from "../components/motion/clippath-container";
import BackgroundGrad from "./background/background-grad";
import TextureContainer from "./background/texture-container";
export default function LandingPage({ data, footerData, tags }) {

  return (
      <TextureContainer>  
        <ClipContainer background={<BackgroundGrad/>}>
            {data?.csblocksCollection?.items && (
              <PostBody content={data.csblocksCollection} tags={tags} />
            )}
        </ClipContainer>
        
        {footerData && <BlockFooter data={footerData} />}
      </TextureContainer>
   
  );
}
