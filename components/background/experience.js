import {
    shaderMaterial,
  Center,
} from "@react-three/drei";

import { fragmentShader } from "../../shaders/fragmentShader";
import { vertexShader } from "../../shaders/vertexShader";

import * as THREE from 'three'
import { useRef } from 'react'
import {  useFrame, extend } from '@react-three/fiber'

const PortalMaterial = shaderMaterial(
    {
        time: 0
    },
    vertexShader,
    fragmentShader
)
extend({ PortalMaterial })

export default function Experience() {

    const portalMaterial = useRef()
    useFrame((state, delta) =>
    {
        portalMaterial.current.time += delta * .6
    })


  return (
    <>
      <color />

      <Center>
      <mesh position={[0, 0, 0]} scale={1}>
          <sphereGeometry args={[ 8, 32, 32]} />
          <portalMaterial

            ref={ portalMaterial }
            side={THREE.DoubleSide}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
          />
        </mesh>
      </Center>
    </>
  );
}
    