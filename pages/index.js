import React from "react";
import Layout,{LayoutType} from "../components/layout";
import { getHomePage, getFooter, getLandingPage } from "../lib/api";
import ScrollContainer from "../components/utils/scroll-container";
import LandingPage from "../components/landingPage";

const Index = ({ data, footerData }) => {
  const date = new Date(data.sys.publishedAt);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateString = date.toLocaleDateString("en-US", options);
  // console.log('footerData',footerData)
   console.log('data',data)

  return (
    <Layout pageWidth={LayoutType.FLUID}>
      <ScrollContainer>
        <LandingPage data={data} footerData={footerData}  />

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
