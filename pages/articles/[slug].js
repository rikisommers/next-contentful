import React from "react";
import { getAllCaseStudies, getPost, getFooter } from "../../lib/api";

import PostBody from "../../components/post/post-body";
import BlockFooter from "../../components/blocks/block-footer";
import PageNav from "../../components/navigation/page-nav";
import PagesPasswordPage from "../../components/security/password-page-pages";
import ScrollContainer from "../../components/utils/scroll-container";
import { useThemeContext } from "../../components/context/themeContext";
import TransitionPage from "../../components/transition/pageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClipContainer } from "../../components/motion/clippath-container";
import SEOMeta from "../../components/seo/seo-meta";

export default function Post({ post, footerData }) {
  
  const { currentTheme } = useThemeContext();


  const articlesNavList = post.csblocksCollection.items.filter(
    (item) => item.__typename === "BlockArticle"
  );

  return (
    <ScrollContainer>
      <SEOMeta
        title={post?.title}
        description={post?.excerpt || post?.intro}
        image={post?.heroImage?.url}
        article
        publishedTime={post?.sys?.firstPublishedAt}
        modifiedTime={post?.sys?.publishedAt}
        tags={post?.contentfulMetadata?.tags?.map((t) => t.name) || []}
      />

      {articlesNavList.length > 0 && (
        <div className="relative">
          <nav className="flex fixed right-0 z-50 flex-col justify-center self-start h-screen">
          </nav>
        </div>
      )}

      <SpeedInsights />
      <TransitionPage>
        {post && (
          <ClipContainer>
            
              {post.csblocksCollection && (
                <PostBody content={post.csblocksCollection} />
              )}
           
            
          </ClipContainer>
        )}

        {footerData && <BlockFooter data={footerData} />}
      </TransitionPage>
    </ScrollContainer>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const data = await getPost(slug, preview);
  if (!data || data.length === 0) {
    return {
      notFound: true, // This will trigger a 404 page
    };
  }
  const footerData = await getFooter();

  return {
    props: {
      slug,
      preview,
      post: data[0] ?? null,
      footerData: footerData || null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllCaseStudies(false);
  return {
    paths: allPosts?.slice(0, 10).map(({ slug }) => `/articles/${slug}`) ?? [],
    fallback: "blocking",
  };
}
