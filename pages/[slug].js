import React from "react";
import { getLandingPage, getAllHomePageSlugs, getFooter } from '../lib/api';
import LandingPage from "../components/landingPage";
import Layout,{LayoutType} from "../components/layout";
import ScrollContainer from "../components/utils/scroll-container";

const HomePage = ({ data, footerData }) => {
  // Render your home page using the fetched data

  console.log('slluggy data',data, footerData)
  return (
    <Layout pageWidth={LayoutType.FLUID}>
      <ScrollContainer>
        <LandingPage data={data} footerData={footerData}  />
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

// export async function getStaticProps({ params }) {
//   // Fetch the data for the specific home page based on the slug
//   const data = await getLandingPage(slug);

//   return {
//     props: {
//       data: data || null,
//     },
//   };
// }

export async function getStaticProps({ params, preview = false }) {
  const slug = params.landing;

  const [data, footerData] = await Promise.all([
    getLandingPage(slug),
    getFooter(),
  ]);

  return {
    props: {
      slug: slug || null,
      preview,
      data: data || null,
      footerData: footerData || null,
    },
  };
}


export default HomePage;