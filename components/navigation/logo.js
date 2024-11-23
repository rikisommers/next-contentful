import React, { useRef } from "react";
import { motion, cubicBezier } from "framer-motion";
import { useThemeContext } from "../themeContext";
import { useRouter } from "next/navigation";


export default function Logo() {
    const { currentTheme } = useThemeContext();
    const router = useRouter();


  return (

    <>
    

         
    <motion.div
    style={{
      backgroundColor: currentTheme.logoFill ? "var(--accent)" : "transparent" ,
      color:
        router.asPath === "/"
          ? "var(--text-color)"
          : "var(--heading-color)",
    }}
    className={`pointer-events-auto cursor-pointer relative z-50 flex items-center rounded-xl`}
  >
    <div
      className={`w-[32px] h-[32px] flex items-center justify-center`}
    >

        <img
          src="/shapes/star.svg"
          viewBox="0 0 32 32"
          className="h-full"
        ></img>

    </div>

    <motion.span
      className="self-center p-3 font-medium"
      style={{ color: "var(--text-color)" }}
      layoutId="title"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
        delay: 0,
        easing: cubicBezier(0.35, 0.17, 0.3, 0.86),
      }}
    >
      Riki Sommers
    </motion.span>
  </motion.div>
        {/* <motion.div
            style={{
              backgroundColor: "var(--accent)",
              color:
                router.asPath === "/"
                  ? "var(--text-color)"
                  : "var(--heading-color)",
            }}
            whileHover={{
              style: {
                backgroundColor: "var(--heading-color)",
              },
            }}
            className={` pointer-events-auto z-50 flex items-center rounded-xl px-4`}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "var(--accent-pri)" }}
            ></div>
            <span
              className="self-center p-3 font-mono text-sm cursor-pointer page-title"
              style={{ color: "var(--text-color)" }}
              onClick={() => setIsModalOpen(true)}
            >
              'Available for work'
            </span>
          </motion.div> */}
          
  </>
  )
}