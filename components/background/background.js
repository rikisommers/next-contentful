import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience";
import Experience2 from "./experience2";
export default function Background() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Suspense fallback={<div className="w-full h-full bg-black"></div>}>
        <Canvas
          className="w-full h-full"
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          camera={{
              fov: 20,
              near: 0.1,
              far: 100,
              position: [0.2, -5, 3],
          }}
        >
          {/* <ambientLight color={0x00ff00} intensity={0.5} />
          <directionalLight color={0x00ff00} intensity={1} position={[10, 10, 10]} /> */}
          <Experience2 />
        </Canvas>
      </Suspense>
    </div>
  );
}