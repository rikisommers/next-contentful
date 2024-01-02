import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "../../components/layout";
import {
  getAllCaseStudies,
  getAllCaseStudies2,
  getAllCaseStudiesNext,
} from "../../lib/api";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ScrollableBox } from "../../components/utils/scrollable";

import PostHeader from "../../components/post/post-header";
import TransitionWipe from "../../components/transition/transition-wipe";
import TransitionTilt from "../../components/transition/transition-tilt";
import PostContent from "../../components/post/post-content";
import Link from "next/link";
import PostTile from "../../components/post/post-tile";
import FadeInWhenVisible from "../../components/utils/fade-in-visible";
import NextPost from "../../components/post/post-next";
import { RouteContext } from "../../components/routeContext";

export default function Post({ post, nextPost }) {
  const router = useRouter();

  const [scrollValue, setScrollValue] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const isOpen = true;

  const { routeInfo } = useContext(RouteContext);
  const [sourceRoute, setSourceRoute] = useState("");
  const [destRoute, setDestRoute] = useState("");

  useEffect(() => {
    setSourceRoute(routeInfo.sourceRoute);
    setDestRoute(routeInfo.destRoute);
  }, [routeInfo]); // Include routeInfo in the dependency array if needed

  const shouldFadeIn = !destRoute.includes("/projects/");

  const handleScrollChange = (value) => {
    setScrollValue(value);

    if (value <= 1000) {
      x.set(value);
      if (value <= 600) {
        setIsActive(false);
      }
      if (value > 600) {
        setIsActive(true);
      }
    }
  };

  const easing = cubicBezier(0.35, 0.17, 0.3, 0.86);
  const x = useMotionValue(0);

  const input = [0, 200];
  const cpyo = [8, 0.01];
  const cpxo = [1.5, 0.01];
  const ro = [1, 0];
  const yv = useTransform(x, input, cpyo, { easing });
  const xv = useTransform(x, input, cpxo, { easing });
  const rv = useTransform(x, input, ro, { easing });
  const clipPathValue = `inset(${yv.current}rem ${xv.current}rem 0px round ${rv.current}rem ${rv.current}rem 0px 0px)`;

  const wrapperVariants = {
    active: {
      y: 0,
      opacity: 1,
    },
    inactive: {
      opacity: 0,
      y: "100vh",
    },
    transition: { duration: 0.6, easing: easing },
  };

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <ScrollableBox onScrollChange={handleScrollChange}>
      {/* xxl:grid grid-cols-3 */}
        <div className="relative z-10 overflow-hidden bg-slate-50 rounded-xl ">
        {/* className="xxl:col-span-2" */}
          <motion.div
            className="pt-32 px-8 md:px-24 xl:px-xlx"
            exit={{
              opacity: 0,
            }}
            transition={{
              easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
              duration: 0.3,
              delay: 0,
            }}
          >
            
            <PostContent post={post}></PostContent>
            </motion.div>
            {nextPost && (
              // xxl:col-span-1 xxl:pt-header
              <div className=" p-6 ">
                <NextPost post={nextPost} />
              </div>
            )}
      
        </div>
      </ScrollableBox>

      {shouldFadeIn && <TransitionWipe />}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const slug = params.slug;
  const data = await getAllCaseStudies2(slug, preview);
  const next = await getAllCaseStudiesNext(slug, preview);

  return {
    props: {
      slug,
      preview,
      post: data[0] ?? null,
      nextPost: next[0] ?? null,
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
