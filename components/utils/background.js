import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import Experience from "./experience";
export default function Background() {


  return (
      <Canvas
        clamp pixel ration
        dpr={ 1 }

        toneMapping 
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        orthographic
        camera={{
          fov: 100,
          zoom: 30,
          near: 0.1,
          far: 200,
          position: [0, 0, 0],
        }}
    >
      <ambientLight color={0x00ff00} intensity={0.5} />
      <directionalLight color={0x00ff00} intensity={1} position={[10, 10, 10]} />
      <Experience />
      
      </Canvas>

  );
}
