import { 
    OrbitControls,
    OrthographicCamera,
    useFBO,
  } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { wrapEffect, EffectComposer } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import { Suspense, useRef, useState } from "react";
import fragmentShader from "./fragment-noise-dither.glsl";

class RetroEffectImpl extends Effect {
  constructor() {
    super(
      "RetroEffect", 
      fragmentShader,
      {
        uniforms: new Map([]),
      }
    );
  }
}
  
const RetroEffect = wrapEffect(RetroEffectImpl);


const Retro = () => {
  const mesh = useRef();

  return (
    <>
      <mesh receiveShadow castShadow>
        <torusKnotGeometry args={[1, 0.25, 128, 100]} />
        <meshStandardMaterial color="cyan" />
      </mesh>
      <EffectComposer>
        <RetroEffect />
      </EffectComposer>
    </>
  );
};


const NoiseDither = () => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback="Loading">
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 10, 5]} intensity={10.5} />
        <color attach="background" args={["#000000"]} />
        <Retro />
        <OrbitControls />
        <OrthographicCamera
          makeDefault
          position={[5, 5, 5]}
          zoom={120}
          near={0.01}
          far={500}
        />
      </Suspense>
    </Canvas>
  );
};


export default NoiseDither;