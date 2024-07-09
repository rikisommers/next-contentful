import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import { getHome, getLandingPage } from "../lib/api";
import TransitionWipe from "../components/transition/transition-wipe";
import { useTheme } from 'next-themes';
import { getThemeByKey } from '../utils/theme';
import html2canvas from 'html2canvas';
import { gsap } from 'gsap';
import * as THREE from "three";
import { vertexShader } from "../shaders/water/vertex";
import { fragmentShader } from "../shaders/water/fragment";
import { TextTitle } from "../components/rich-text/text-title";
import { TextSubtitle } from "../components/rich-text/text-subtitle";
import ScrollContainer from "../components/utils/scroll-container";
import CustomCursor from "../components/utils/cursor";
import PostBody from "../components/post/post-body";
import BlockFooter from "../components/blocks/block-footer";
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
  const { theme } = useTheme();
  const currentTheme = getThemeByKey(theme);



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
    <div style={{background:currentTheme?.bodyBackgroundColor}}>
    <Layout >
      {/* <canvas 
        ref={canvasRef} 
        id="canvas"
      /> */}

      {/* <CustomCursor/> */}


        <ScrollContainer>   
      <div className={`relative transition ease-in-out w-screen h-screen`} 
          style={{background:currentTheme?.bodyBackgroundColor}} >
        <div className="z-10 home">
            <div className="grid items-end h-full grid-cols-12 px-32 py-32">
              <div className="flex flex-col col-span-12 gap-6 md:col-span-6 ">
                {/* <h1 className="text-7xl">{backgroundColor}</h1> */}

                {/* <TextAnimation  
                    content={home.title}
                    color={"text-slate-400"}
                  /> */}

                <TextTitle content={data.titlealt}>
                  {/* <TextScramble content={['Plan,Design & buid','wear many hats','like fart jokes']}/> */}
                </TextTitle>
                <TextSubtitle
                  content={data.contentalt}
                  color={currentTheme?.textColor}
                />

              </div>
            </div>

          <div className="flex self-end justify-between p-3">
            <div className="flex gap-3">
              <div className="flex gap-1 text-xs lg:col-span-2">
                <span className="uppercase text-slate-400">Location:</span>
                <a
                  href="https://www.google.com/maps/place/New+Brighton,+Christchurch/@-43.5093881,172.6992615,14z/data=!3m1!4b1!4m6!3m5!1s0x6d318891a20200c1:0x500ef8684799330!8m2!3d-43.5079076!4d172.7225969!16zL20vMDNfcHMz?entry=ttu"
                  className="text-slate-500"
                >
                  @-43.5093881,172.6992615
                </a>
              </div>

              <div className="flex gap-1 text-xs lg:col-span-2">
                <span className="uppercase text-slate-400">Last Updated:</span>
                <span className="text-slate-500">{dateString}</span>
              </div>
            </div>

            <div className="sound">
              {/* Assuming this is where your audio component goes */}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute flex items-center justify-end w-full h-full opacity-75"
          initial={{ clipPath: "inset(1.0rem 1.0rem 6.0rem round 0.5rem)" }}
          animate={{
            backgroundColor: currentTheme?.backgroundColor,
            clipPath: "inset( 1rem round 1rem )" }}
          exit={{ clipPath: "inset( 1.5rem 1.5rem 90vh 1.5rem round 1rem )" }}
          transition={{
            duration: 0.6,
            ease: [0.33, 1, 0.68, 1],
          }}
        />
      </div>

      {data.csblocksCollection.items && (
        // <PostContent content={data}/>
        <PostBody content={data.csblocksCollection} />
      )}


      <BlockFooter content={data}/>
      </ScrollContainer>     
      {/* <TransitionWipe /> */}
    </Layout>

    </div>
  );
};

export async function getStaticProps({ preview = false }) {
  const data = (await getLandingPage('home')) ?? [];

  return {
    props: {
      data,
    },
  };
}

export default Index;
