import React from "react";
import { getLandingPage, getAllHomePageSlugs, getFooter, getAllBlogTags } from '../lib/api';
import LandingPage from "../components/landingPage";
import Layout,{LayoutType} from "../components/layout";
import ScrollContainer from "../components/utils/scroll-container";

const HomePage = ({ data, footerData, tags }) => {
  // Render your home page using the fetched data

  console.log('tagsa',tags)
  return (
    <Layout>
      <ScrollContainer>
        <LandingPage data={data} footerData={footerData} tags={tags} />
      </ScrollContainer>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Fetch all home page slugs from the CMS
  const slugs = await getAllHomePageSlugs();

  return {
    paths:slugs.map(({ slug }) => `/${slug}`) ?? [],
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;

  const [data, footerData, tags] = await Promise.all([
    getLandingPage(slug),
    getFooter(),
    getAllBlogTags()
  ]);

  return {
    props: {
      slug: slug || null,
      preview,
      data: data || null,
      tags: tags || null,
      footerData: footerData || null,
    },
  };
}


export default HomePage;