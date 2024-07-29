import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { getHome, getLandingPage } from "../lib/api";
import TransitionWipe from "../components/transition/transition-wipe";
import TransitionTilt from "../components/transition/transition-tilt";
import html2canvas from "html2canvas";
import { gsap } from "gsap";
import * as THREE from "three";
import { vertexShader } from "../shaders/water/vertex";
import { fragmentShader } from "../shaders/water/fragment";
import ScrollContainer from "../components/utils/scroll-container";
import CustomCursor from "../components/utils/cursor";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
import BlockHero from "../components/blocks/block-hero";

import Lenis from "@studio-freight/lenis";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const vs = `
varying vec2 v_texcoord;

void main() {
  v_texcoord = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fs1 = `
precision mediump float;

uniform float time;
uniform sampler2D tex;

varying vec2 v_texcoord;

float upDown(float v) {
  return sin(v) * 0.5 + 0.5;
}

void main() {
  float t1 = time;
  float t2 = time * 0.37;

  float v = v_texcoord.y;

  float off1 = sin((v + 0.5) * mix(1.0, 6.0, upDown(t1))) * 0.2;
  float off2 = sin((v + 0.5) * mix(1.0, 3.0, upDown(t2))) * 0.2;
  float off = off1 + off2;

  vec2 uv = vec2(
     v_texcoord.x,
     1.0 - (v + off));

  gl_FragColor = texture2D(tex, uv);
}
`;

const Index = ({ data }) => {


  const [footerOffsetValue, setFooterOffsetValue] = useState(0);

  // const canvasRef = useRef(null);
  // const renderer = useRef(null);
  // const scene = useRef(null);
  // const camera = useRef(null);
  // const plane = useRef(null);
  // const uniforms = useRef(null);
  // const clock = useRef(new THREE.Clock());

  // useEffect(() => {
  //   // Initialize Three.js
  //   renderer.current = new THREE.WebGLRenderer({ canvas: canvasRef.current });
  //   renderer.current.setSize(window.innerWidth, window.innerHeight);
  //   scene.current = new THREE.Scene();
  //   camera.current = new THREE.Camera();
  //   scene.current.add(camera.current);

  //   // Create plane geometry and shader material
  //   const geometry = new THREE.PlaneGeometry(2, 2);
  //   uniforms.current = {
  //     time: { value: 0 },
  //     tex: { value: null },
  //   };
  //   const material = new THREE.ShaderMaterial({
  //     uniforms: uniforms.current,
  //     vertexShader: vs,
  //     fragmentShader: fs1,
  //   });

  //   plane.current = new THREE.Mesh(geometry, material);
  //   scene.current.add(plane.current);

  //   // Load texture from html2canvas
  //   const loadTexture = async () => {
  //     const captureCanvas = await html2canvas(document.body);
  //     const texture = new THREE.Texture(captureCanvas);
  //     texture.needsUpdate = true;
  //     uniforms.current.tex.value = texture;

  //     animate();
  //   };

  //   loadTexture();

  //   // Animation loop
  //   const animate = () => {
  //     requestAnimationFrame(animate);

  //     const elapsedTime = clock.current.getElapsedTime();
  //     uniforms.current.time.value = elapsedTime * 0.5;

  //     renderer.current.render(scene.current, camera.current);
  //   };

  //   window.addEventListener('resize', onWindowResize);
  //   return () => {
  //     window.removeEventListener('resize', onWindowResize);
  //   };
  // }, []);

  // const onWindowResize = () => {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   renderer.current.setSize(width, height);
  //   camera.current.aspect = width / height;
  //   camera.current.updateProjectionMatrix();
  // };

  const date = new Date(data.sys.publishedAt);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateString = date.toLocaleDateString("en-US", options);

  return (
    <div style={{ background:  'var(--background-color)', }}>
      <Layout>
        {/* <canvas 
        ref={canvasRef} 
        id="canvas"
      /> */}

        {/* <CustomCursor/> */}
        <TransitionTilt active={true} className="z-100">
          <ScrollContainer>
            <BlockHero
              content={data.content}
              titlealt={data.titlealt}
              contentalt={data.contentalt}
              date={dateString}
            />

            {data.csblocksCollection.items && (
              <PostBody content={data.csblocksCollection} />
            )}

            <BlockFooter content={data} />
          </ScrollContainer>
        </TransitionTilt>
        <TransitionWipe />
      </Layout>
    </div>
  );
};

export async function getStaticProps({ preview = false }) {
  const data = (await getLandingPage("home")) ?? [];

  return {
    props: {
      data,
    },
  };
}

export default Index;
