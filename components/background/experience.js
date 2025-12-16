import {
    shaderMaterial,
  Center,
} from "@react-three/drei";
import { fragmentShader } from "../../shaders/fragmentShader";
import { vertexShader } from "../../shaders/vertexShader";
import { useThemeContext } from '../context/themeContext';

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
    const { currentTheme } = useThemeContext();

    // Get geometry values from theme with fallbacks to defaults
    const sphereRadius = currentTheme?.data?.canvasExpSphereRadius ?? 8;
    const sphereWidthSegments = currentTheme?.data?.canvasExpSphereWidthSegments ?? 32;
    const sphereHeightSegments = currentTheme?.data?.canvasExpSphereHeightSegments ?? 32;

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
          <sphereGeometry args={[sphereRadius, sphereWidthSegments, sphereHeightSegments]} />
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
    