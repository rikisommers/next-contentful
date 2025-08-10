import React from "react";
import Layout from "../components/layout";
import { getHomePage, getFooter, getLandingPage } from "../lib/api";
import ScrollContainer from "../components/utils/scroll-container";
import LandingPage from "../components/landingPage";

const Index = ({ data, footerData }) => {
  // If no data is available, show a message
  if (!data) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg">No content available for the current space.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollContainer>
        <LandingPage data={data} footerData={footerData} />
      </ScrollContainer>
    </Layout>
  );
};

export async function getStaticProps() {
  const [landingPageData, footerData] = await Promise.all([
    getLandingPage("home"),
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
