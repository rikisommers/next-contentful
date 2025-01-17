import React from "react";
import Layout from "../components/layout";
import { getHomePage, getFooter } from "../lib/api";
import ScrollContainer from "../components/utils/scroll-container";
import BlockFooter from "../components/blocks/block-footer";
import BlockHero from "../components/blocks/block-hero";
import TransitionPage from "../components/transition/pageTransition";
import { ClipContainer } from "../components/motion/clippath-container";

const Index = ({ data, footerData }) => {
  const date = new Date(data.sys.publishedAt);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateString = date.toLocaleDateString("en-US", options);
  // console.log('footerData',footerData)
  // console.log('data',data)

  return (
    <TransitionPage>
      <ScrollContainer>
        <BlockHero
          intro={data.intro}
          content={data.content}
          titlealt={data.titlealt}
          contentalt={data.contentalt}
          date={dateString}
          image={data.image}
        />

        {/* <BlockHero/> */}

        {/* 
              <Layout>
              </Layout> */}
        <BlockFooter data={footerData} />
      </ScrollContainer>
    </TransitionPage>
  );
};

export async function getStaticProps() {
  const [landingPageData, footerData] = await Promise.all([
    getHomePage("home"),
    getFooter(),
  ]);

  return {
    props: {
      data: landingPageData || null,
      footerData: footerData || null,
    },
  };
}

export default Index;
