import React, { useRef } from "react";
import Layout from "../components/layout";
import TransitionWipe from "../components/transition/transition-wipe";
import PostIntro from "../components/post/post-intro";
import { getLandingPage, getFooter } from "../lib/api";
import BlockFooter from "../components/blocks/block-footer";
import LandingPageContent from "../components/landing-page-content";

import TransitionPage from "../components/transition/pageTransition";


const Bio = ({ data, footerData }) => {
  
  console.log("-------------------------------", data);

  const contentRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <TransitionPage>

    <Layout>
        <div className="flex flex-col px-8">
          <PostIntro title={data.titlealt} content={data.contentalt} />
          <LandingPageContent data={data} />
          <BlockFooter content={footerData} />
        </div>
    </Layout>
    </TransitionPage>

  );
};

export async function getStaticProps({ preview = false }) {
  const data = (await getLandingPage("bio")) ?? [];
  const footerData = (await getFooter()) ?? {};

  return {
    props: {
      data,
      footerData,
    },
  };
}

export default Bio;
