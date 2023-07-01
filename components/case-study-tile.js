import Link from "next/link";
import { useRouter } from "next/router";
import CoverImage from "./cover-image";
import { motion, useScroll, useTransform, } from "framer-motion";
import Image from "next/image";
import ContentfulImage from "./contentful-image";

export default function CaseStudyTile({ post, index, onclick }) {
  //${index == 0 ? "h-vhr" : ""
 // console.log(post);
 const router = useRouter();
 const { scrollY } = useScroll();
 const y = useTransform(scrollY,[0,1],["0%","50%"])

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
    <div className="relative w-full h-full">

 

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
          <h2 className="absolute w-full text-center bottom-0 px-8 pb-5">
            {post?.title}
          </h2>
        </motion.div>
      {post.img != null && (
        <motion.div
        className="absolute"
          style={{y:-50}}
        
        >
            <ContentfulImage
            className="img-cover"
            alt={`Cover Image for ${post.title}`}
            src={post.img.url}
          />
          </motion.div>

        // <CoverImage

        //   title={post.title}
        //   url={post.img.url}
        //   layout={post.layout}
        // />

      )}
      
    </div>

  );
}
