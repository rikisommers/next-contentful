import React, { useState, useRef } from "react";
import Layout from "../components/layout";
import { getLandingPage, getFooter } from "../lib/api";

import PostIntro from "../components/post/post-intro";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
import { useScrollPosition } from "../components/scrollPosContext";
import TransitionPage from "../components/transition/pageTransition";

const Work = ({ data, footerData }) => {
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const { setScrollPosition } = useScrollPosition();


  return (

  
      <TransitionPage>
        {/* <ScrollContainer> */}
        {/* <ClipPathContainer>
          </ClipPathContainer> */}
            <Layout>
        <div className="flex flex-col px-8">
          <PostIntro title={data.titlealt} content={data.contentalt} />

          {data.video && (
            <div className="pb-24 o-content">
              <BlockVideo data={data.video} />
            </div>
          )}

          {data.csblocksCollection.items && (
            <PostBody content={data.csblocksCollection} />
          )}
        </div>
        </Layout>
        {footerData && <BlockFooter data={footerData} />}
{/* 
        </ScrollContainer> */}
        </TransitionPage>

           
      
  );
};

export async function getStaticProps({ preview = false }) {
  const [landingPageData, footerData] = await Promise.all([
    getLandingPage("work"), // Fetch the landing page content
    getFooter(), // Fetch the footer content
  ]);

  return {
    props: {
      data: landingPageData || null, // Use null as fallback if data is undefined
      footerData: footerData || null, // Use null as fallback if footerData is undefined
    },
  };
}

export default Work;
