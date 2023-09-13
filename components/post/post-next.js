import CoverImage from "../image/cover-image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function NextPost({ post }) {
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
    <motion.div
      className="overflow-hidden fixed h-vhh bottom-0 left-0 z-0 m-6"
      initial={{
        height: "64vh",
        borderRadius: "0.75rem",
      }}
      exit={{
        height: "100vh",
        zIndex: 0,
        margin: 0,
        borderRadius: "0rem",
      }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 0.6,
      }}
    >
      <Link href={`/projects/${post.slug}`} shallow={false}>
        {/* <motion.div
          initial="blur"
          whileHover="hover"
          animate="blur"
          className=""
          // initial="initial" whileHover="hover" animate="initial"
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
        </motion.div> */}
        {post.img != null && (
          <motion.div className=" bottom-0 left-0 z-0 w-full h-full bg-black">
            <div className="opacity-50">
              <CoverImage
                title={post.title}
                url={post.img.url}
                layout={post.layout}
              />
            </div>
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}
