import Layout, {LayoutType} from "../../components/layout";
import { getAllCaseStudies, getPost, getFooter } from "../../lib/api";

import PostHeader from "../../components/post/post-header";
import PostHeaderMonks from "../../components/post/post-header-monks";
import PostContent from "../../components/post/post-content";
import BlockFooter from "../../components/blocks/block-footer";
import PageNav from "../../components/base/page-nav";
import PagesPasswordPage from "../../components/security/password-page-pages";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PostDetails from "../../components/post/post-details";
import ScrollContainer from "../../components/utils/scroll-container";
import { useThemeContext } from "../../components/context/themeContext";
import PostHeaderRiki from "../../components/post/post-header-riki";


export default function Post({ post, footerData }) {
  console.log("PPPP:", post);

  const { currentTheme } = useThemeContext();


  // const router = useRouter();

  // useEffect(() => {
  //   if (post.protected) {
  //     // Redirect to the login page with the current slug as a redirect query parameter
  //     router.push(`/login`);
  //   }
  // }, [post.protected, router]);

  return (
    <ScrollContainer>
      <PagesPasswordPage locked={post.protected}>
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
        <PageNav content={post.csblocksCollection.items}></PageNav>
        )}

        <Layout pageWidth={LayoutType.LARGE}>
          {post && (
            <>

            {currentTheme.heroType === 'monks' &&
              <PostHeaderMonks
                title={post.title}
                subtitle={post.subtitle}
                img={post.img}
              />
            }
            {currentTheme.heroType === 'pentagram' &&
              <PostHeader
                title={post.title}
                subtitle={post.subtitle}
                img={post.img}
              />
            }
            {currentTheme.heroType === 'riki' &&
              <PostHeaderRiki
                title={post.contentalt}
                subtitle={post.titlealt}
                img={post.img}
              />
            }
              <PostDetails
                post={post}
                description={post.description}
                intro={post.intro}
                duration={post.duration}
                client={post.client}
                role={post.role}
              />
              <PostContent content={post} />
            </>
          )}
          {footerData && <BlockFooter data={footerData} />}
        </Layout>
        {/* </ScrollContainer> */}
      </PagesPasswordPage>
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
