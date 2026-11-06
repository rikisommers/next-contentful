import React from "react";
import { getLandingPage, getAllHomePageSlugs, getFooter, getAllBlogTags } from '../lib/api';
import LandingPage from "../components/landingPage";
import Layout, { LayoutType } from "../components/layout";
import ScrollContainer from "../components/utils/scroll-container";
import SEOMeta from "../components/seo/seo-meta";
import { getGlobalProps, REVALIDATE_SECONDS } from "../lib/contentful/global";

const HomePage = ({ data, footerData, tags, slug }) => {
  return (
    <Layout>
      <SEOMeta
        home={slug === "home"}
        canonical={slug === "home" ? "/" : undefined}
        title={data?.title || slug}
        description={data?.description}
        image={data?.heroImage?.url}
      />
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
    paths: (slugs ?? []).map(({ slug }) => `/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;

  const [data, footerData, tags, globalProps] = await Promise.all([
    getLandingPage(slug),
    getFooter(),
    getAllBlogTags(),
    getGlobalProps(),
  ]);

  if (!data) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: {
      slug: slug || null,
      preview,
      data: data || null,
      tags: tags || null,
      footerData: footerData || null,
      ...globalProps,
    },
    revalidate: REVALIDATE_SECONDS,
  };
}


export default HomePage;