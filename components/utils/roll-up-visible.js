import { motion } from "../../utils/motion";;

export default function RollUpWhenVisible({ children, enabled = true }) {


    let clipPathValue = `inset(0rem 0rem 0px round 0rem)`;
    const clipPathValueExit = `inset(300px 0px 0px round 1.5rem)`;
    

      
    return (
      <motion.div

        className="w-full h-full"
        initial={ enabled ? "hidden": "visible"}
        whileInView="visible"
        viewport={{ once: true, threshold:0.2}}
        transition={{ duration: 0.3, delay:0.2 }}
        variants={{
          visible: { 
            opacity: 1,
            clipPath: clipPathValue 
        },
          hidden: { 
            opacity: 0,
            clipPath: clipPathValueExit 
        }
        }}
      >
        {children}
      </motion.div>
    );
  }