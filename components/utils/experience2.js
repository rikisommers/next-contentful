import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { vertexShader } from './shaders/water/vertex';
import { fragmentShader } from './shaders/water/fragment';

const WaterMaterial = shaderMaterial(
  {
    uBigWavesElevation: 0.2,
    uBigWavesFrequency: new THREE.Vector2(4, 1.5),
    uTime: 0,
    uBigWavesSpeed: 0.75,
    uDepthColor: new THREE.Color("#6600ff"),
    uSurfaceColor: new THREE.Color("#ffa200"),
    uColorOffset: 0.074,
    uColorMultiplier: 3.372,
    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallIterations: 4,
  },
  vertexShader,
  fragmentShader
);

extend({ WaterMaterial });

function Water() {
  const waterMaterial = useRef();
  const {
    depthColor,
    surfaceColor,
    uBigWavesElevation,
    uBigWavesFrequencyX,
    uBigWavesFrequencyY,
    uBigWavesSpeed,
    uColorOffset,
    uColorMultiplier,
    uSmallWavesElevation,
    uSmallWavesFrequency,
    uSmallWavesSpeed,
    uSmallIterations,
  } = useControls({
    depthColor: "#6600ff",
    surfaceColor: "#ffa200",
    uBigWavesElevation: { value: 0.2, min: 0, max: 1, step: 0.001 },
    uBigWavesFrequencyX: { value: 4, min: 0, max: 10, step: 0.001 },
    uBigWavesFrequencyY: { value: 1.5, min: 0, max: 10, step: 0.001 },
    uBigWavesSpeed: { value: 0.75, min: 0, max: 4, step: 0.001 },
    uColorOffset: { value: 0.074, min: 0, max: 1, step: 0.001 },
    uColorMultiplier: { value: 3.372, min: 0, max: 10, step: 0.001 },
    uSmallWavesElevation: { value: 0.15, min: 0, max: 5, step: 0.001 },
    uSmallWavesFrequency: { value: 3, min: 0, max: 30, step: 0.001 },
    uSmallWavesSpeed: { value: 0.2, min: 0, max: 4, step: 0.001 },
    uSmallIterations: { value: 4, min: 0, max: 5, step: 1 },
  });

  useFrame((state, delta) => {
    waterMaterial.current.uTime += delta;
    waterMaterial.current.uDepthColor.set(depthColor);
    waterMaterial.current.uSurfaceColor.set(surfaceColor);
    waterMaterial.current.uBigWavesElevation = uBigWavesElevation;
    waterMaterial.current.uBigWavesFrequency.set(uBigWavesFrequencyX, uBigWavesFrequencyY);
    waterMaterial.current.uBigWavesSpeed = uBigWavesSpeed;
    waterMaterial.current.uColorOffset = uColorOffset;
    waterMaterial.current.uColorMultiplier = uColorMultiplier;
    waterMaterial.current.uSmallWavesElevation = uSmallWavesElevation;
    waterMaterial.current.uSmallWavesFrequency = uSmallWavesFrequency;
    waterMaterial.current.uSmallWavesSpeed = uSmallWavesSpeed;
    waterMaterial.current.uSmallIterations = uSmallIterations;
  });

  return (
    <mesh rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[2, 2, 512, 512]} />
      <waterMaterial ref={waterMaterial} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Experience2() {
  return (
    <>
      <OrbitControls enableDamping />
      <Water />
    </>
  );
}