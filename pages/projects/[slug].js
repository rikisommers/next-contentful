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

import PostHeader from "../../components/post/post-header";

import PostContent from "../../components/post/post-content";
import { RouteContext } from "../../components/routeContext";
import BlockFooter from "../../components/blocks/block-footer";
import TransitionPage from "../../components/transition/pageTransition";
import PageNav from "../../components/base/page-nav";

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



   
    {/* <div className="grid col-span-1">ddd</div>
    <div className="grid col-span-1">dddd</div> */}
{/* {post.csblocksCollection && (
          <PageNav content={post.csblocksCollection.items}></PageNav>
              // <nav className="sticky right-0 z-50 flex flex-col self-start justify-center rounded-full top">
              //   <ul className="flex flex-col bg-slate-100 ml-50">
              //   {post.csblocksCollection.items &&
              //     post.csblocksCollection.items.length > 0 &&
              //     post.csblocksCollection.items.map((item, index) => {
              //       return (
              //         <div key={index}>
              //           {item.__typename === "BlockArticle" && (
              //             <div className="flex p-4 text-red-400 bg-slate-500">
              //               <a href={`#${item.title}`} key={index} className="text-xs">
              //                   {item.title}
              //               </a>
              //             </div>
              //           )}
              //         </div>
              //       );
              //     })}
              //     </ul>
              // </nav>
            )} */}
          {post && (

            <div className="grid w-full grid-cols-12 gap-4 p-8 grid-rows-auto">
                <div className="col-span-12">
                <PostHeader content={post} />
                
                </div>
  
                <div className="row-start-2 page__content">
                  <PostContent content={post} />
                </div>
                <div className="col-start-11 row-start-2">
                <PageNav content={post.csblocksCollection.items}></PageNav>

                </div>
            </div>

        
              
             
          )}


            

          {footerData && (
            <BlockFooter data={footerData} />
          )}
        {/* </ScrollContainer> */}
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
