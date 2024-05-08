import PostBody from "./post-body";
// import PostHeader from "./post-header";
// import PostDetails from "./post-details";

export default function PostContent({ content }) {
  return (
    <>

    { content && 
      <article>
 
        {content.csblocksCollection && (
          <PostBody content={content.csblocksCollection} />
        )}
      </article>

      }

    </>
  );
}
