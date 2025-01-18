import { motion, cubicBezier } from "../../utils/motion";;
export default function Audio() {

  return (
     <div className="goo">
      <motion.div
              initial={{
                scale: 0,
                width: 40,
                height: 40,
                x: 0,
              }}
              animate={{
                scale: 1,
                width: 60,
                x: 0,
              }}
              transition={{
                scale: {
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                x: {
                  delay: 0.6,
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                },
                width: {
                  delay: 0.6,
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
              className="btn absolute bottom-0 right-1 bg-teal-400"
            ></motion.div>
            <motion.div
              initial={{
                scale: 0,
                width: 40,
                height: 40,
                x: 0,
              }}
              animate={{
                scale: 1,
                width: 80,
                x: -80,
              }}
              transition={{
                scale: {
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                x: {
                  delay: 0.6,
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                },
                width: {
                  delay: 0.6,
                  duration: 0.9,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
              className="btn absolute bottom-0 right-1"
            ></motion.div>
            </div>

  );
}
