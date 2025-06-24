import { OrbitControls, OrthographicCamera, Image } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { easing } from 'maath';
import { Effect } from 'postprocessing';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from './progress.glsl';

class CustomDepixelationEffectImpl extends Effect {
  constructor({ progress = 0.5 }) {
    const uniforms = new Map([
      ['progress', new THREE.Uniform(progress)],
    ]);

    super('CustomDepixelationEffect', fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  update(_renderer, _inputBuffer, _deltaTime) {
    this.uniforms.get('progress').value = this.progress;
  }
}

const CustomDepixelationEffect = wrapEffect(CustomDepixelationEffectImpl);

const DepixelationEffect = () => {
  const effectRef = useRef();
  const smoothProgressRef = useRef(0);

  const { progress } = useControls({
    progress: {
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.001,
    },
  });

  useFrame((state) => {
    const { camera } = state;

    easing.damp(smoothProgressRef, 'current', progress, 0.25);

    if (effectRef.current) {
      effectRef.current.progress = smoothProgressRef.current;
    }

    camera.lookAt(0, 0, 0);
  });

  return (
    <EffectComposer>
      <CustomDepixelationEffect ref={effectRef} progress={progress} />
    </EffectComposer>
  );
};

const FullScreenImage = () => {
  const meshRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    const { camera } = state;
    meshRef.current.rotation.setFromQuaternion(camera.quaternion);
  });

  return (
    <Image
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1.0]}
      url='https://cdn.maximeheckel.com/images/backgrounds/gril-with-pearl-earing.jpg'
    />
  );
};

const Depixelation = () => {
  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 10]}
        zoom={100}
        near={0.01}
        far={500}
      />
      <FullScreenImage />
      <DepixelationEffect />
    </>
  );
};

const Progress = () => {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]}
      >
        <Suspense>
          <color attach='background' args={['#74B7FF']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, -5]} intensity={10.0} />
          <OrbitControls />
          <Depixelation />
        </Suspense>
      </Canvas>
      <Leva collapsed />
    </>
  );
};

export default Progress;