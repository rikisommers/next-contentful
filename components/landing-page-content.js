import PostBody from "../components/post/post-body";

const LandingPageContent = ({ data }) => {

  return (
    <>
   

      {data.csblocksCollection && data.csblocksCollection.items && (
        <PostBody content={data.csblocksCollection} />
      )}
      
    </>
  );
};

export default LandingPageContent;
