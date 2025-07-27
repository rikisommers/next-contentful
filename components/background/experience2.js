import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { vertexShader } from './shaders/water/vertex';
import { fragmentShader } from './shaders/water/fragment';
import { useThemeContext } from '../context/themeContext';

const WaterMaterial = shaderMaterial(
  {
    uBigWavesElevation: 0.12,
    uBigWavesFrequency: new THREE.Vector2(2.15, 1.5),
    uTime: 0,
    uBigWavesSpeed: 0.75,
    uDepthColor: new THREE.Color("#6600ff"),
    uSurfaceColor: new THREE.Color("#ffa200"),
    uColorOffset: 0.074,
    uColorMultiplier: 6.45,
    uSmallWavesElevation: 0.32,
    uSmallWavesFrequency: 0.29,
    uSmallWavesSpeed: 0.20,
    uSmallIterations: 0.8,
  },
  vertexShader,
  fragmentShader
);

extend({ WaterMaterial });

function Water() {
  const waterMaterial = useRef();
  const { currentTheme } = useThemeContext();
  const {
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
    uBigWavesElevation: { value: 0.07, min: 0, max: 1, step: 0.001 },
    uBigWavesFrequencyX: { value: 0.44, min: 0, max: 10, step: 0.001 },
    uBigWavesFrequencyY: { value: 0.4, min: 0, max: 10, step: 0.001 },
    uBigWavesSpeed: { value: 0.20, min: 0, max: 4, step: 0.001 },
    uColorOffset: { value: 0.07, min: 0, max: 1, step: 0.001 },
    uColorMultiplier: { value: 2.98, min: 0, max: 10, step: 0.001 },
    uSmallWavesElevation: { value: 0.31, min: 0, max: 5, step: 0.001 },
    uSmallWavesFrequency: { value: 1.74, min: 0, max: 30, step: 0.001 },
    uSmallWavesSpeed: { value: 0.1, min: 0, max: 4, step: 0.001 },
    uSmallIterations: { value: 1.2, min: 0, max: 5, step: 0.1 },
  });

  useFrame((state, delta) => {
    const depthColor = currentTheme?.data?.accentPri || "#6600ff";
    const surfaceColor = currentTheme?.data?.accentSec || "#ffa200";

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
    <mesh rotation-x={-Math.PI / 2} 
          rotation-y={0} 
          rotation-z={0}>
      <planeGeometry args={[5, 3, 100, 100]} />
      <waterMaterial ref={waterMaterial} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Experience2() {
  return (
    <>
      {/* <OrbitControls enableDamping /> */}
      <Water />
    </>
  );
}