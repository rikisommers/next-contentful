import { motion } from "framer-motion";

export default function FadeInWhenVisible({ children, enabled = true }) {


    return (
      <motion.div
        className="w-full h-full"
        initial={ enabled ? "hidden": "visible"}
        whileInView="visible"
        viewport={{ once: true, threshold:0.2}}
        transition={{ duration: 0.3, delay:0.2 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
      >
        {children}
      </motion.div>
    );
  }