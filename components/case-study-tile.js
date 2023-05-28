import Link from "next/link";
import { useRouter } from "next/router";
import CoverImage from "./cover-image";
import { motion } from "framer-motion";
export default function CaseStudyTile({ post, index }) {
  //${index == 0 ? "h-vhr" : ""
 // console.log(post);
 const router = useRouter();


  const animateContentOnHover = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        ease: [0.33, 1, 0.68, 1],
        duration: 0.3,
      },
    },
    
  };

  return (
    <Link
      scroll={false}
      href={`/work?post=${post.slug}`}
      as={`/posts/${post.slug}`}
      className="c-tile rounded-xl relative"
      initial="blur"
      whileHover="hover"
      animate="blur"
    >
      <motion.div
      initial="initial" whileHover="hover" animate="initial"
      >


        <motion.div
        key={post?.title}
          variants={animateContentOnHover}
          className="absolute z-20 w-full h-full bg-zinc-900/30"
        >
          <div className="absolute w-full flex justify-between items-center top-0 left-0 px-8 pt-5 ">
            <span>{post?.client}</span>
            <span>DATE</span>
          </div>
          <h2 className="absolute w-full text-center bottom-0 px-8 pb-5">
            {post?.title}
          </h2>
        </motion.div>
      </motion.div>
      {post.img != null && (
        <CoverImage
          title={post.title}
          url={post.img.url}
          layout={post.layout}
        />
      )}
    </Link>
  );
}
