import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

const CreationOfAdam = () => {
  const meshRef = useRef();

  const { scene } = useGLTF('https://cdn.maximeheckel.com/models/creation-of-adam.glb');

  useEffect(() => {
    meshRef.current.position.set(2.25, -2, 0);
    meshRef.current.rotation.y = -Math.PI / 2;
    meshRef.current.scale.setScalar(4);
  }, []);

  return (
    <group ref={meshRef}>
      <primitive object={scene} />
    </group>
  );
};

export { CreationOfAdam };
