import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import {
  getAllCaseStudies,
  getPost,
  getNextPost,
  getFooter,
} from "../../lib/api";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import PostIntro from "../../components/post/post-intro";
import PostHeader from "../../components/post/post-header";
import TransitionTilt from "../../components/transition/transition-tilt";
import TransitionWipe from "../../components/transition/transition-wipe";
import PostContent from "../../components/post/post-content";
import Link from "next/link";
import NextPost from "../../components/post/post-next";

import { RouteContext } from "../../components/routeContext";
import BlockFooter from "../../components/blocks/block-footer";
import PostTileCs from "../../components/post/post-tile-cs";
import { useScrollPosition } from "../../components/scrollPosContext";
import ScrollContainer from "../../components/utils/scroll-container";

export default function Post({ post, nextPost, footerData }) {
  const router = useRouter();
  console.log("post---------------------------", post);

  const { routeInfo } = useContext(RouteContext);
  const [destRoute, setDestRoute] = useState("");

  useEffect(() => {
    //  setSourceRoute(routeInfo.sourceRoute);
    setDestRoute(routeInfo.destRoute);
  }, [routeInfo]); // Include routeInfo in the dependency array if needed

  const shouldFadeIn = !destRoute.includes("/projects/");

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  //const shouldAnimate = router.paths.startsWith("/projects/");

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  const [posT, setPosT] = useState(0);

  // useEffect(() => {
  //   if (router.pathname.startsWith("/posts/")) {
  //     // Select the title wrapper
  //     const next = document.querySelector(".test");
  //     if (next) {
  //       setPosT(Math.round(next.getBoundingClientRect().y) - 90);
  //     }
  //   }
  // }, [router.pathname]);

  const handleLinkClick = () => {
    const next = document.querySelector(".test");
    //console.log("ddd", Math.round(next.getBoundingClientRect().y) - 90);
    setPosT(Math.round(next.getBoundingClientRect().y) - 90);
  };

  return (
    <Layout>
      <TransitionTilt active={true} className="z-100">
        {/* <ScrollContainer> */}


        {post.csblocksCollection && (
        <nav className="fixed bottom-0 z-50 flex justify-center w-full rounded-full translate-y-2/4 ">
          <ul className="flex bg-slate-100 ml-50">
          {post.csblocksCollection.items &&
            post.csblocksCollection.items.length > 0 &&
            post.csblocksCollection.items.map((item, index) => {
              return (
                <div key={index}>
                  {item.__typename === "BlockArticle" && (
                    <div className="flex p-4 text-red-400 bg-slate-500">
                      <a href={`#${item.title}`} key={index} className="text-xs">
                          {item.title}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
            </ul>
        </nav>
      )}
      
          {post && (
            <div className="flex flex-col px-8">
              <PostHeader content={post} />
              <PostContent content={post} />
            </div>
          )}

          {footerData && (
            <BlockFooter data={footerData} />
          )}
        {/* </ScrollContainer> */}
      </TransitionTilt>
      <TransitionWipe />
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const data = await getPost(slug, preview);
  const next = await getNextPost(slug, preview);
  const footerData = await getFooter();

  return {
    props: {
      slug,
      preview,
      post: data[0] ?? null,
      nextPost: next[0] ?? null,
      footerData: footerData || null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllCaseStudies(false);
  return {
    paths: allPosts?.map(({ slug }) => `/projects/${slug}`) ?? [],
    fallback: true,
  };
}
