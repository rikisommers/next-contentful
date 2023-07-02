import PostBody from "./post-body";
import PostHeader from "./post-header";

export default function PostContent({ post }) {
  return (
    <>
      <article className="px-24 pt-32">
        <PostHeader
          title={post.title}
          subtitle={post.subtitle}
          img={post.img}
        />
        {post.csblocksCollection && (
          <PostBody content={post.csblocksCollection} />
        )}
      </article>
    </>
  );
}
