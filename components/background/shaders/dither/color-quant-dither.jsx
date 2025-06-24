import { 
    OrbitControls,
    OrthographicCamera,
    useFBO,
  } from "@react-three/drei";
  import { Canvas, useFrame } from "@react-three/fiber";
  import { wrapEffect, EffectComposer } from "@react-three/postprocessing";
  import { useControls } from "leva";
  import { Effect } from "postprocessing";
  import { Suspense, useRef, useState } from "react";
  import * as THREE from "three";
  import { v4 as uuidv4 } from "uuid";
  
  import fragmentShader from "./color-quant-dither.glsl";
  
  class RetroEffectImpl extends Effect {
    constructor({ colorNum = 8.0 }) {
      const uniforms = new Map([
        ["colorNum", new THREE.Uniform(8.0)],
      ]);
  
      super("RetroEffect", fragmentShader, {
        uniforms,
      });
  
      this.uniforms = uniforms;
    }
  
    set colorNum(value) {
      this.uniforms.get("colorNum").value = value;
    }
  
    get colorNum() {
      return this.uniforms.get("colorNum").value;
    }
  }
  
  const RetroEffect = wrapEffect(RetroEffectImpl);
  
  const Retro = () => {
    const mesh = useRef();
    const effect = useRef();
  
    const { colorNum } = useControls({
      colorNum: {
        value: "2.0",
        options: ["2.0", "4.0", "8.0"],
      },
    });
  
    useFrame(() => {
      effect.current.colorNum = parseInt(colorNum, 10);
    })
  
    return (
      <>
        <mesh receiveShadow castShadow>
          <torusKnotGeometry args={[1, 0.25, 128, 100]} />
          <meshStandardMaterial color="#58A4FE" />
        </mesh>
        <EffectComposer>
          <RetroEffect ref={effect} />
        </EffectComposer>
      </>
    );
  };
  
  const ColorQuantDither = () => {
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
  
  
  export default ColorQuantDither;