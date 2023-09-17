import PostBody from "./post-body";
import PostHeader from "./post-header";
import PostDetails from "./post-details";

export default function PostContent({ post }) {
  return (
    <>
    { post && 
      <article className="px-24 pt-32">
        <PostHeader
          title={post.title && post.title}
          duration={post.duration && post.duration}
          img={post.img && post.img}
        />
        <PostDetails
          subtitle={post.subtitle && post.subtitle}
          intro={post.intro && post.intro}
          tags={post.tags && post.tags}
          role={post.role && post.role}
          client={post.client && post.client}
        ></PostDetails>
        {post.csblocksCollection && (
          <PostBody content={post.csblocksCollection} />
        )}
      </article>
      }
    </>
  );
}
