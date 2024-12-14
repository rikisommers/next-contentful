import React, { useRef } from "react";
import Layout from "../components/layout";
import PostIntro from "../components/post/post-intro";
import { getLandingPage, getFooter } from "../lib/api";
import BlockFooter from "../components/blocks/block-footer";
import LandingPageContent from "../components/landing-page-content";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TransitionPage from "../components/transition/pageTransition";

const Bio = ({ data, footerData }) => {
  console.log("-------------------------------", data);

  return (
    <TransitionPage>
                <SpeedInsights />
                <Layout>
      <div
        className="relative"
        style={{
          backgroundColor: "var(--body-background-color)",
        }}
      >
        <div
          className={`${
           "max-w-screen-md mx-auto"
          }`}
        >

          <div className="flex flex-col px-8 py-12">
          <h1 className="h-32">sd</h1>
              <PostIntro title={data.titlealt} content={data.contentalt} />
            <LandingPageContent data={data} />
          </div>
        </div>
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
