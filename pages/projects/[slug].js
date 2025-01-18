import React from "react";
import { getAllCaseStudies, getPost, getFooter } from "../../lib/api";

import PostHeaderMonks from "../../components/post/post-header-monks";
import PostContent from "../../components/post/post-content";
import BlockFooter from "../../components/blocks/block-footer";
import PageNav from "../../components/base/page-nav";
import PagesPasswordPage from "../../components/security/password-page-pages";

import PostDetails from "../../components/post/post-details";
import ScrollContainer from "../../components/utils/scroll-container";
import { useThemeContext } from "../../components/context/themeContext";
import PostHeaderRiki from "../../components/post/post-header-riki";
import TransitionPage from "../../components/transition/pageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClipContainer } from "../../components/motion/clippath-container";
export default function Post({ post, footerData }) {

  const { currentTheme } = useThemeContext();




  return (
    <ScrollContainer>

        {post && (
        <PageNav content={post.csblocksCollection.items}></PageNav>
        )}
        <SpeedInsights />
        <TransitionPage>

          {post && (
            <ClipContainer>

            {currentTheme.data.heroType === 'monks' &&
              <PostHeaderMonks
                title={post.title}
                subtitle={post.titlealt}
                tags={post.tags}
                img={post.img}
              />
            }

            {currentTheme.data.heroType === 'riki' &&
                        <div className="max-w-screen-xl mx-auto">

              <PostHeaderRiki
                title={post.title}
                subtitle={post.titlealt}
                img={post.img}
              />
              </div>
            }
            <div className="max-w-screen-xl mx-auto">
              <PostDetails
                post={post}
                intro={post.intro}
                duration={post.duration}
                client={post.client}
                role={post.role}
              />
              <PostContent content={post} />
              </div>
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
    paths: allPosts?.slice(0, 20).map(({ slug }) => `/projects/${slug}`) ?? [],
    fallback: "blocking",
  };
}
