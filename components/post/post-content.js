import PostBody from "./post-body";
import PostHeader from "./post-header";
import PostDetails from "./post-details";

export default function PostContent({ post }) {
  return (
    <>

    { post && 
      <article className="pt-32 px-8 md:px-24">
        <PostHeader
          title={post.title && post.title}
          subtitle={post.subtitle && post.subtitle}
          duration={post.duration && post.duration}
          client={post.client}
          img={post.img && post.img}
        />
        <PostDetails
          subtitle={post.subtitle && post.subtitle}
          intro={post.intro && post.intro}
          tags={post.tags && post.tags}
          role={post.role && post.role}
          client={post.client && post.client}
          duration={post.duration && post.duration}

        ></PostDetails>
        {post.csblocksCollection && (
          <PostBody content={post.csblocksCollection} />
        )}
      </article>

      }

    </>
  );
}
