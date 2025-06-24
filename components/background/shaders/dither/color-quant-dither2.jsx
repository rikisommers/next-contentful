import { 
  OrbitControls,
  OrthographicCamera,
  useFBO,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { wrapEffect, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Effect } from "postprocessing";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import fragmentShader from "./color-quant-dither2.glsl";

class RetroEffectImpl extends Effect {
  constructor() {
    const uniforms = new Map([
      ["palette", new THREE.Uniform(null)],
    ]);

    super("RetroEffect", fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  set palette(value) {
    this.uniforms.get("palette").value = value;
  }

  get palette() {
    return this.uniforms.get("palette").value;
  }
}

const RetroEffect = wrapEffect(RetroEffectImpl);

const Retro = () => {
  const mesh = useRef();
  const effect = useRef();

  const palette = useTexture("https://cdn.maximeheckel.com/textures/palette.png");

  useFrame(() => {
    effect.current.palette = palette;
  })

  return (
    <>
      <mesh receiveShadow castShadow>
        <torusKnotGeometry args={[1, 0.25, 128, 100]} />
        <meshStandardMaterial color="cyan" />
      </mesh>
      <EffectComposer>
        <RetroEffect ref={effect} />
      </EffectComposer>
    </>
  );
};

const ColorQuantDither2 = () => {
  return (
    <Canvas shadows dpr={[1, 1]}>
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


export default ColorQuantDither2;