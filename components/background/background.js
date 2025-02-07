// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import Experience from "./experience";

// export default function Background() {
//   return (
//     <Canvas
//       className="w-full h-full"
//       dpr={[1, 2]}
//       gl={{
//         antialias: true,
//         toneMapping: THREE.ACESFilmicToneMapping,
//         outputColorSpace: THREE.SRGBColorSpace,
//       }}
//       camera={{
//         fov: 75,
//         near: 0.1,
//         far: 2000,
//         position: [0, 1, 2],
//       }}
//     >
//       <ambientLight color={0x00ff00} intensity={0.5} />
//       <directionalLight color={0x00ff00} intensity={1} position={[10, 10, 10]} />
//       <Experience />
//     </Canvas>
//   );
// }