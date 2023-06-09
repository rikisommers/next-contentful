import CoverImage from "../image/cover-image";
import TextAnimation from "../utils/text-animation";
import { motion } from "framer-motion";
export default function PostHeader({ title, img, subtitle }) {
  return (
    <div className="mb-36">
      <div className="o-content-grid pt-32 pb-16">
        <div className="title">
          <TextAnimation content={title}></TextAnimation>
        </div>
        <motion.p
          className="content text-sm	text-left"
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
          {subtitle}
        </motion.p>
      </div>

      {img && (
        <div className="h-vhh rounded-xl overflow-hidden">
          <CoverImage title={img.title} url={img.url} layout="landscape" />
        </div>
      )}
    </div>
  );
}
