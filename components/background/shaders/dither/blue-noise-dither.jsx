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
  
  import fragmentShader from "./blue-noise-dither.glsl";
  
  class RetroEffectImpl extends Effect {
    constructor({ bias = 0.85 }) {
      const uniforms = new Map([
        ["noise", new THREE.Uniform(null)],
        ["bias", new THREE.Uniform(0.85)],
      ]);
  
      super("RetroEffect", fragmentShader, {
        uniforms,
      });
  
      this.uniforms = uniforms;
    }
  
    get noise() {
      return this.uniforms.get("noise").value;
    }
  
    set noise(value) {
      this.uniforms.get("noise").value = value;
    }
  
    set bias(value) {
      this.uniforms.get("bias").value = value;
    }
  
    get bias() {
      return this.uniforms.get("bias").value;
    }
  }
  
  const RetroEffect = wrapEffect(RetroEffectImpl);
  
  const Retro = () => {
    const mesh = useRef();
    const effect = useRef();
  
    const texture = useTexture("https://cdn.maximeheckel.com/noises/bn.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  
     const { bias } = useControls({
      bias: {
        value: 0.85,
        min: 0.0,
        max: 1.0,
      },
    });
  
    useFrame(() => {
      effect.current.noise = texture;
      effect.current.bias = bias;
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
  
  const BlueNoiseDither = () => {
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
  
  
  export default BlueNoiseDither;