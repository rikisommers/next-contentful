import Layout from "../../components/layout";
import {
  getAllCaseStudies,
  getPost,
  getFooter,
} from "../../lib/api";

import PostHeader from "../../components/post/post-header";

import PostContent from "../../components/post/post-content";
import BlockFooter from "../../components/blocks/block-footer";
import PageNav from "../../components/base/page-nav";
import PagesPasswordPage from "../../components/security/password-page-pages";
export default function Post({ post, footerData }) {

  console.log('PPPP:',post)
  return (      
      <Layout>


      <PagesPasswordPage>
      <h1>sdsd{post?.protected}</h1>
  


   
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
        

          </PagesPasswordPage>

        {/* </ScrollContainer> */}
    </Layout>

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
    fallback: 'blocking',
  };
}