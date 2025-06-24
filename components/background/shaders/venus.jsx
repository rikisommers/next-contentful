import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";


const Venus = () => {
  const meshRef = useRef();

  const { nodes } = useGLTF("https://cdn.maximeheckel.com/models/venus/scene.gltf");

  useEffect(() => {
    meshRef.current.rotation.y = -Math.PI;
    meshRef.current.rotation.z = -Math.PI / 3;
    meshRef.current.rotation.x = Math.PI / 2;
    meshRef.current.position.set(0, -2, 0);
    meshRef.current.scale.setScalar(0.002);
  }, []);

  return (
    <mesh ref={meshRef} geometry={nodes.Object_2.geometry}>
      <meshStandardMaterial color='#0097F7' />
    </mesh>
  );
};

export { Venus };
