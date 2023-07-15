import CoverImage from "../image/cover-image";
import TextAnimation from "../utils/text-animation";
import { motion } from "framer-motion";
export default function PostHeader({ title, img, subtitle , tags, client , role }) {
  return (
    <motion.div className="mb-36"
    initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
    }}
    transition={{
      ease: [0.33, 1, 0.68, 1],
      duration: 1.6,
      delay: 0.6,
    }}
    >
      <motion.div className="o-content-grid pt-32 pb-16">
        <div className="title">
          {/* <TextAnimation content={title}></TextAnimation> */}
          <h1 className="text-6xl">{title}</h1>
          <p className="">{client && client}</p>
          <p className="">{role && role}</p>

          {/* <p className="">{tags && tags}</p> */}

        </div>
        <motion.p
          className="content text-sm	text-left">
          {subtitle}
        </motion.p>

      </motion.div>

      {img && (
        <motion.div className="h-vhh rounded-xl overflow-hidden">
          <CoverImage title={img.title} url={img.url} layout="landscape" />
        </motion.div>
      )}
    </motion.div>
  );
}
