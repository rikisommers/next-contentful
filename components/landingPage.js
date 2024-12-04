import React, { useState, useRef } from "react";
import Layout from "../components/layout";

import PostIntro from "../components/post/post-intro";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
import { useScrollPosition } from "../components/scrollPosContext";
import TransitionPage from "../components/transition/pageTransition";

export default function LandingPage({ data, footerData, tags }) {

//   const contentRef = useRef(null);
//   const headerRef = useRef(null);
//   const [scrollValue, setScrollValue] = useState(0);
//   const { setScrollPosition } = useScrollPosition();

  return (
    <>
      <div className="flex flex-col px-8">

        <div className="pt-[16rem] pb-8 ">
        <PostIntro title={data.titlealt} content={data.contentalt} />
        </div>
        {data.video && (
          <div className="pb-24 o-content">
            <BlockVideo data={data.video} />
          </div>
        )}

        {data.csblocksCollection.items && (
          <PostBody content={data.csblocksCollection} tags={tags}/>
        )}

      </div>
      {footerData && <BlockFooter data={footerData} />}

      </>
  );
};
