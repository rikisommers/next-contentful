import React from "react";
import { getLandingPage, getFooter, getAllBlogTags } from "../lib/api";
import LandingPage from "../components/landingPage";
import Layout from "../components/layout";

const Blog = ({ data, footerData, tags }) => {

  return (
    <Layout>
      <LandingPage data={data} footerData={footerData} tags={tags} />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const [landingPageData, footerData, tagsData] = await Promise.all([
    getLandingPage("blog"),
    getFooter(),
    getAllBlogTags(),
  ]);

  return {
    props: {
      tags: tagsData || null,
      data: landingPageData || null,
      footerData: footerData || null,
    },
  };
}

export default Blog;
