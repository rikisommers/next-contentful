import React from "react";
import { getLandingPage, getFooter } from "../lib/api";
import LandingPage from "../components/landingPage";
import Layout from "../components/layout";

const Work = ({ data, footerData }) => {

  return (
    <Layout>
      <LandingPage data={data} footerData={footerData}/>
      </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const [landingPageData, footerData] = await Promise.all([
    getLandingPage("work"),
    getFooter(),
  ]);

  return {
    props: {
      data: landingPageData || null,
      footerData: footerData || null,
    },
  };
}

export default Work;
