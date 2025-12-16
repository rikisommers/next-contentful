import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { perlinBlobVertexShader } from './shaders/perlinBlob/vertex';
import { perlinBlobFragmentShader } from './shaders/perlinBlob/fragment';
import { useThemeContext } from '../context/themeContext';

const PerlinBlobMaterial = shaderMaterial(
  {
    uTime: 0,
    uPointscale: 0.2,
    uDecay: 0.3,
    uSize: 0.3,
    uDisplace: 0.3,
    uComplex: 0.0,
    uWaves: 0.10,
    uEqcolor: 0.0,
    uRcolor: 0.0,
    uGcolor: 0.0,
    uBcolor: 0.0,
    uFragment: true,
    uRedhell: true,
    uCoreColor: new THREE.Color("#1a1a2e"),
    uEnergyColor: new THREE.Color("#0f4c75"),
    uColorIntensity: 0.3,
  },
  perlinBlobVertexShader,
  perlinBlobFragmentShader
);

extend({ PerlinBlobMaterial });

function PerlinBlob() {
  const blobMaterial = useRef();
  const pointsMaterial = useRef();
  const { currentTheme } = useThemeContext();

  // Get geometry values from theme with fallbacks to defaults
  const sphereRadius = currentTheme?.data?.canvasPerlinBlobRadius ?? 2;
  const sphereWidthSegments = currentTheme?.data?.canvasPerlinBlobWidthSegments ?? 6;
  const sphereHeightSegments = currentTheme?.data?.canvasPerlinBlobHeightSegments ?? 6;

  const {
    speed,
    size,
    waves,
    complex,
    displace,
    eqcolor,
    rcolor,
    gcolor,
    bcolor,
    redhell,
    points,
    decay,
    colorIntensity,
  } = useControls({
    speed: { value: 0.4, min: 0.1, max: 1.0, step: 0.1 },
    size: { value: 0.7, min: 0.0, max: 3.0, step: 0.1 },
    waves: { value: 3.7, min: 0.0, max: 20.0, step: 0.1 },
    complex: { value: 0.50, min: 0.1, max: 1.0, step: 0.01 },
    displace: { value: 1.00, min: 0.1, max: 2.5, step: 0.01 },
    decay: { value: 1.20, min: 0.0, max: 2.0, step: 0.01 },
    eqcolor: { value: 10.0, min: 0.0, max: 30.0, step: 0.1 },
    rcolor: { value: 1.5, min: 0.0, max: 2.5, step: 0.1 },
    gcolor: { value: 1.5, min: 0.0, max: 2.5, step: 0.1 },
    bcolor: { value: 1.5, min: 0.0, max: 2.5, step: 0.1 },
    colorIntensity: { value: 0.3, min: 0.0, max: 1.0, step: 0.01 },
    redhell: { value: true },
    points: { value: false },
  });

  const startTime = useRef(Date.now());

  useFrame((state, delta) => {
    const currentTime = (speed / 1000) * (Date.now() - startTime.current);
    const coreColor = currentTheme?.data?.gradStart || "#EF7801";
    const energyColor = currentTheme?.data?.gradStop || "#f4f4f5";

    // Update blob material
    if (blobMaterial.current) {
      blobMaterial.current.uTime = currentTime;
      blobMaterial.current.uPointscale = 1.0;
      blobMaterial.current.uDecay = decay;
      blobMaterial.current.uSize = size;
      blobMaterial.current.uDisplace = displace;
      blobMaterial.current.uComplex = complex;
      blobMaterial.current.uWaves = waves;
      blobMaterial.current.uFragment = true;
      blobMaterial.current.uRedhell = redhell;
      blobMaterial.current.uEqcolor = eqcolor;
      blobMaterial.current.uRcolor = rcolor;
      blobMaterial.current.uGcolor = gcolor;
      blobMaterial.current.uBcolor = bcolor;
      blobMaterial.current.uCoreColor.set(coreColor);
      blobMaterial.current.uEnergyColor.set(energyColor);
      blobMaterial.current.uColorIntensity = colorIntensity;
    }

    // Update points material
    if (pointsMaterial.current) {
      pointsMaterial.current.uTime = currentTime;
      pointsMaterial.current.uPointscale = 1.0;
      pointsMaterial.current.uDecay = decay;
      pointsMaterial.current.uSize = size;
      pointsMaterial.current.uDisplace = displace;
      pointsMaterial.current.uComplex = complex;
      pointsMaterial.current.uWaves = waves;
      pointsMaterial.current.uFragment = true;
      pointsMaterial.current.uRedhell = redhell;
      pointsMaterial.current.uEqcolor = eqcolor;
      pointsMaterial.current.uRcolor = rcolor;
      pointsMaterial.current.uGcolor = gcolor;
      pointsMaterial.current.uBcolor = bcolor;
      pointsMaterial.current.uCoreColor.set(coreColor);
      pointsMaterial.current.uEnergyColor.set(energyColor);
      pointsMaterial.current.uColorIntensity = colorIntensity;
    }
  });

  return (
    <group>
      {/* Main blob mesh - always visible */}
      <mesh visible={true}>
        <icosahedronGeometry args={[sphereRadius, sphereWidthSegments]} />
        <perlinBlobMaterial ref={blobMaterial} side={THREE.DoubleSide} />
      </mesh>

      {/* Points mesh - shows when points is enabled */}
      <points visible={points}>
        <icosahedronGeometry args={[sphereRadius * 1.15, 2]} />
        <perlinBlobMaterial ref={pointsMaterial} />
      </points>
    </group>
  );
}

export default function CanvasBgPerlinBlob() {
  return <PerlinBlob />;
}