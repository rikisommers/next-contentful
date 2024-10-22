import Layout from "../components/layout";
import { getHomePage, getFooter} from "../lib/api";
import ScrollContainer from "../components/utils/scroll-container";
import BlockFooter from "../components/blocks/block-footer";
import BlockHero from "../components/blocks/block-hero";
import TransitionPage from "../components/transition/pageTransition";

const Index = ({ data, footerData }) => {



  const date = new Date(data.sys.publishedAt);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateString = date.toLocaleDateString("en-US", options);
// console.log('footerData',footerData)
// console.log('data',data)

  return (
       <Layout>
        <TransitionPage>
           <ScrollContainer>
            <div className="relative z-10">
            <BlockHero 
              content={data.content}
              titlealt={data.titlealt}
              contentalt={data.contentalt}
              date={dateString}
              image={data.image}
            />
</div>
    
          
              {/* <BlockHero/> */}

            <BlockFooter data={footerData} />

            </ScrollContainer>
        </TransitionPage>
      </Layout>
  );
};

export async function getStaticProps() {
  const [landingPageData, footerData] = await Promise.all([
    getHomePage("home"), // Fetch the landing page content
    getFooter(), // Fetch the footer content
  ]);

  return {
    props: {
      data: landingPageData || null, // Use null as fallback if data is undefined
      footerData: footerData || null, // Use null as fallback if footerData is undefined
    },
  };
}
export default Index;

