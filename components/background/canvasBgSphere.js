import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { sphereVertexShader } from './shaders/sphere/vertex';
import { sphereFragmentShader } from './shaders/sphere/fragment';
import { useThemeContext } from '../context/themeContext';

const SphereMaterial = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 0.3,
    uNoiseDensity: 1.2,
    uNoiseStrength: 0.6,
    uFrequency: 1.5,
    uAmplitude: 0.3,
    uCoreColor: new THREE.Color("#1a1a2e"),
    uEnergyColor: new THREE.Color("#0f4c75"),
    uColorOffset: 0.1,
    uColorMultiplier: 2.5,
    uEnergyPulse: 2.0,
  },
  sphereVertexShader,
  sphereFragmentShader
);

extend({ SphereMaterial });

function SphereBlob() {
  const sphereMaterial = useRef();
  const { currentTheme } = useThemeContext();

  // Get geometry values from theme with fallbacks to defaults
  const sphereRadius = currentTheme?.data?.canvasSphereRadius ?? 10;
  const sphereWidthSegments = currentTheme?.data?.canvasSphereWidthSegments ?? 32;
  const sphereHeightSegments = currentTheme?.data?.canvasSphereHeightSegments ?? 32;
  const {
    uSpeed,
    uNoiseDensity,
    uNoiseStrength,
    uFrequency,
    uAmplitude,
    uColorOffset,
    uColorMultiplier,
    uEnergyPulse,
  } = useControls({
    uSpeed: { value: 0.3, min: 0, max: 2, step: 0.1 },
    uNoiseDensity: { value: 1.2, min: 0.1, max: 3.0, step: 0.1 },
    uNoiseStrength: { value: 0.6, min: 0, max: 2.0, step: 0.1 },
    uFrequency: { value: 1.5, min: 0.1, max: 5, step: 0.1 },
    uAmplitude: { value: 0.3, min: 0, max: 1, step: 0.01 },
    uColorOffset: { value: 0.1, min: 0, max: 1, step: 0.01 },
    uColorMultiplier: { value: 2.5, min: 0.1, max: 10, step: 0.1 },
    uEnergyPulse: { value: 2.0, min: 0.1, max: 10, step: 0.1 },
  });

  useFrame((state, delta) => {
    const coreColor = currentTheme?.data?.gradStart || "#1a1a2e";
    const energyColor = currentTheme?.data?.gradStop || "#0f4c75";

    sphereMaterial.current.uTime += delta;
    sphereMaterial.current.uCoreColor.set(coreColor);
    sphereMaterial.current.uEnergyColor.set(energyColor);
    sphereMaterial.current.uSpeed = uSpeed;
    sphereMaterial.current.uNoiseDensity = uNoiseDensity;
    sphereMaterial.current.uNoiseStrength = uNoiseStrength;
    sphereMaterial.current.uFrequency = uFrequency;
    sphereMaterial.current.uAmplitude = uAmplitude;
    sphereMaterial.current.uColorOffset = uColorOffset;
    sphereMaterial.current.uColorMultiplier = uColorMultiplier;
    sphereMaterial.current.uEnergyPulse = uEnergyPulse;
  });

  return (
    <mesh rotation-x={-Math.PI/4} 
          rotation-y={0} 
          rotation-z={0}>
      <sphereGeometry args={[sphereRadius, sphereWidthSegments, sphereHeightSegments]} />
      <sphereMaterial ref={sphereMaterial} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function CanvasBgSphere() {
  return <SphereBlob />;
}