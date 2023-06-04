
import Link from "next/link";
import { motion } from "framer-motion";
import { Router, useRouter } from "next/router";
import { useEffect,useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const path = router.asPath.split("?")[0];


  return (
    <nav className="c-menu__wrapper">
    <ul className="c-menu with-indicator">
      <li className={router.pathname == "/" ? "is-active" : ""}>
        <Link href="/">Home</Link>
      </li>
      <li className={router.pathname == "/posts" ? "is-active" : ""}>
        <Link href="/posts">Work</Link>
      </li>
      <li className={router.pathname == "/bio" ? "is-active" : ""}>
        <Link href="/bio">About</Link>
      </li>
      <li className={router.pathname == "/test" ? "is-active" : ""}>
        <Link href="/test">Test</Link>
      </li>
    </ul>
    </nav>
  );
}
