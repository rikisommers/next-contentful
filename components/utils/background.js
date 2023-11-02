import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import Experience from "./experience";
export default function Background() {
  // const myTime = useRef(0);

  // const material = useRef()
  // useFrame((state, delta) =>
  // {
  // material.current.time += delta
  // })

  return (
    <div className="absolute w-full h-full top-0 left-0 z-0">
      <Canvas
        //clamp pixel ration
        //dpr={ 1 }
        //dpr={ [ 1, 2 ] }

        // toneMapping >> add flat
        // outputColorSpace >> add   linear

        //below is default you dont need to include tone mapping or outputColorSpace
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        orthographic
        camera={{
          fov: 45,
          zoom: 100,
          near: 0.1,
          far: 200,
          position: [0, 0, 0],
        }}
      >
      <Experience/>
      </Canvas>
    </div>
  );
}
