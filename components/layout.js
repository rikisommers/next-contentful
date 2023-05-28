import Alert from "../components/alert";
import Footer from "../components/footer";
import Meta from "../components/meta";
import { Lenis as ReactLenis, useLenis } from "@studio-freight/react-lenis";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Transition from "./transition";
import { Router, useRouter } from "next/router";

export default function Layout({ children, infinite }) {
  return (
    <ReactLenis
      root
      options={{
        smooth: true,
        infinite: infinite && infinite,
      }}
    >
      <Meta />
      <main>{children}</main>
    </ReactLenis>
  );
}
