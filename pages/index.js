import React from "react";
import Layout from "../components/layout";
import { getHomePage, getFooter, getLandingPage } from "../lib/api";
import ScrollContainer from "../components/utils/scroll-container";
import LandingPage from "../components/landingPage";
import BlockFooter from "../components/blocks/block-footer";
import SEOMeta from "../components/seo/seo-meta";
import { getGlobalProps, REVALIDATE_SECONDS } from "../lib/contentful/global";

const Index = ({ data, footerData }) => {
  if (!data) {
    return (
      <Layout>
        <SEOMeta home />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">No content available for the current space.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOMeta
        home
        title={data?.title}
        description={data?.description}
        image={data?.heroImage?.url}
      />
      <ScrollContainer>
        <LandingPage data={data} footerData={footerData} />
      </ScrollContainer>
    </Layout>
  );
};

export async function getStaticProps() {
  const [landingPageData, footerData, globalProps] = await Promise.all([
    getLandingPage("home"),
    getFooter(),
    getGlobalProps(),
  ]);

  return {
    props: {
      data: landingPageData || null,
      footerData: footerData || null,
      ...globalProps,
    },
    revalidate: REVALIDATE_SECONDS,
  };
}

export default Index;
