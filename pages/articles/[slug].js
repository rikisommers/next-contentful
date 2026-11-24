import React from "react";
import { getAllCaseStudies, getPost, getFooter } from "../../lib/api";

import PostBody from "../../components/post/post-body";
import BlockFooter from "../../components/blocks/block-footer";
import PageNav from "../../components/navigation/page-nav";
import PasswordGate from "../../components/security/password-gate";
import ScrollContainer from "../../components/utils/scroll-container";
import { useThemeContext } from "../../components/context/themeContext";
import TransitionPage from "../../components/transition/pageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClipContainer } from "../../components/motion/clippath-container";
import SEOMeta from "../../components/seo/seo-meta";
import { isCaseStudyListed } from "../../lib/case-study-visibility";
import { getGlobalProps, REVALIDATE_SECONDS } from "../../lib/contentful/global";

/** Article blocks, with a screen-reader h1 when no hero block provides one. */
function ArticleContent({ title, blocks }) {
  const hasHero = (blocks?.items ?? []).some((i) => i.__typename === "BlockHero");
  return (
    <>
      {!hasHero && <h1 className="sr-only">{title}</h1>}
      {blocks && (
        <ClipContainer>
          <PostBody content={blocks} />
        </ClipContainer>
      )}
    </>
  );
}

export default function Post({ post, slug, footerData, listed = true }) {
  
  const { currentTheme } = useThemeContext();


  const articlesNavList = (post?.csblocksCollection?.items ?? []).filter(
    (item) => item.__typename === "BlockArticle"
  );

  return (
    <ScrollContainer>
      <SEOMeta
        title={post?.title}
        description={post?.subtitle}
        image={post?.img?.url}
        article
        publishedTime={post?.sys?.firstPublishedAt}
        modifiedTime={post?.sys?.publishedAt}
        skills={post?.tags ?? []}
        noindex={!listed || !!post?.protected}
      />

      {articlesNavList.length > 0 && (
        <div className="relative">
          <nav className="flex fixed right-0 z-50 flex-col justify-center self-start h-screen">
          </nav>
        </div>
      )}

      <SpeedInsights />
      <TransitionPage>
        <main id="main-content">
          {post?.protected ? (
            <PasswordGate slug={slug} title={post.title}>
              {(content) => <ArticleContent title={post.title} blocks={content.csblocksCollection} />}
            </PasswordGate>
          ) : (
            <ArticleContent title={post?.title} blocks={post?.csblocksCollection} />
          )}
        </main>

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
  const [footerData, globalProps] = await Promise.all([getFooter(), getGlobalProps()]);
  const entry = data[0] ?? null;
  // Protected content stays out of the static page; PasswordGate fetches it after login.
  const post = entry?.protected ? { ...entry, csblocksCollection: null } : entry;

  return {
    props: {
      slug,
      preview,
      post,
      // Unfinished or other-site case studies stay reachable but are not indexed.
      listed: isCaseStudyListed({
        blockCount: entry?.csblocksCollection?.items?.length ?? 0,
        tags: (entry?.contentfulMetadata?.tags ?? []).map((t) => t.id),
      }),
      footerData: footerData || null,
      ...globalProps,
    },
    revalidate: REVALIDATE_SECONDS,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllCaseStudies(false);
  return {
    paths: allPosts?.slice(0, 10).map(({ slug }) => `/articles/${slug}`) ?? [],
    fallback: "blocking",
  };
}
