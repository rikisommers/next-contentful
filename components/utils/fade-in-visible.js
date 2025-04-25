import { motion } from "../../utils/motion";

export default function FadeInWhenVisible({ children, enabled = true }) {
  return (
    <motion.div
      className="relative w-full h-full"
      initial={enabled ? "hidden" : "visible"}
      whileInView="visible"
      viewport={{ once: true, threshold: 0.2 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 1 }
      }}
      style={{
        backgroundColor: 'var(--accent-sec)',
        position: 'relative',
        zIndex: 1
      }}
    >
      {children}
    </motion.div>
  );
}