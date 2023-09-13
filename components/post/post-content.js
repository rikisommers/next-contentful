import PostBody from "./post-body";
import PostHeader from "./post-header";
import PostDetails from "./post-details";

export default function PostContent({ post }) {
  return (
    <>
      <article className="px-24 pt-32">
        <PostHeader
          title={post.title}
          duration={post.duration}
          img={post.img}
        />
        <PostDetails
          subtitle={post.subtitle}
          intro={post.intro}
          tags={post.tags}
          role={post.role}
          client={post.client}
        ></PostDetails>
        {post.csblocksCollection && (
          <PostBody content={post.csblocksCollection} />
        )}
      </article>
    </>
  );
}
