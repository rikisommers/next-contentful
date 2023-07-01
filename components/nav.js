
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import { Router, useRouter } from "next/router";
import { useEffect,useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const path = router.asPath.split("?")[0];

  const clipPathInitial = `inset(0 100px round 0.6rem )`;
  const clipPathAnimate = `inset(-1rem )`;


  return (
  

    <motion.nav className="c-menu__wrapper"
     initial={{
      clipPath: clipPathInitial,
    }}
     animate={{ 
      clipPath: clipPathAnimate ,
    }}
     transition={{
      delay:0.6,
      duration: 0.6,
      easing:cubicBezier(0.35, 0.17, 0.3, 0.86)
    }}
    >
    <motion.ul className="c-menu with-indicator"
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{
      delay:0.6,
      duration: 1.2,
      easing:cubicBezier(0.35, 0.17, 0.3, 0.86)
    }}
    >
      <li className={router.pathname == "/" ? "is-active" : ""}>
        <Link href="/">Home</Link>
      </li>
      <li className={router.pathname == "/posts" ? "is-active" : ""}>
        <Link href="/posts">Work</Link>
      </li>

      <li className={router.pathname == "/bio" ? "is-active" : ""}>
        <Link href="/bio">About</Link>
      </li>
  
    </motion.ul>
    </motion.nav>

  );
}
