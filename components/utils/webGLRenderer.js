import { Canvas, useThree, extend } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frag } from "../../shaders/main";

// Extend THREE with the shader
extend({ fragmentShader });

const ShaderComponent = ({ texture }) => {
  const textureRef = useRef();
  const { gl } = useThree();

  useEffect(() => {
    textureRef.current = new THREE.TextureLoader().load(texture);
    return () => {
      textureRef.current.dispose();
    };
  }, [texture]);

  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={{
          uTexture: { value: textureRef.current },
          uTime: { value: 0 }, // Example time uniform
          uDistortion: { value: 0 }, // Example distortion uniform
        }}
        fragmentShader={frag}
      />
    </mesh>
  );
};

export default function WebGLRenderer ({ capturedImage }) {
  return (
    <Canvas id="canvas" className="fixed top-0 left-0 z-[9999] pointer-events-none w-full h-full opacity-5">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ShaderComponent texture={capturedImage} />
    </Canvas>
  );
};
