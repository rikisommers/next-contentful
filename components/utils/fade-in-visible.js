import { motion } from "framer-motion";

export default function FadeInWhenVisible({ children }) {

    return (
      <motion.div
        className="w-full h-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, threshold:0.3}}
        transition={{ duration: 0.3, delay:0.6 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
      >
        {children}
      </motion.div>
    );
  }