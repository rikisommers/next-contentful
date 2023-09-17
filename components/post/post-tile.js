import { motion } from "framer-motion";
import ContentfulImage from "../image/contentful-image";
import Link from "next/link";

import { AppContext } from "../appContext";
export default function PostTile({ post }) {

  const animateContentOnHover = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
      },
    },
  };  

  return (
    <Link href={`/projects/${post.slug}`} shallow={false}>

    <div className="tile relative w-full h-full overflow-hidden cursor-as--post">


      
      <motion.div
        initial="initial"
        whileHover="hover"
        key={post?.title}
        variants={animateContentOnHover}
        className="absolute z-20 w-full h-full bg-zinc-900/30"
      >
        <div className="absolute w-full flex justify-between items-center top-0 left-0 px-8 pt-5 ">
          <span>{post?.client}</span>
          <span>DATE</span>
        </div>
        <h2 className="absolute w-full bottom-0 left-0 px-8 pb-5">
          {post?.title}
        </h2>

      </motion.div>
      {post.img && (
          <ContentfulImage
            className="img-cover"
            alt={`Cover Image for ${post.title}`}
            src={post.img.url}
          />
      )}
    </div>
    </Link>
  );
}
