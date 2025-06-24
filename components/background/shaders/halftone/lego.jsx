import { OrthographicCamera, Image } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { Effect } from 'postprocessing';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from './lego.glsl';

class CustomLegoEffectImpl extends Effect {
  constructor({ pixelSize = 1.0, lightPosition = new THREE.Vector2(0.8, 0.8) }) {
    const uniforms = new Map([
      ['pixelSize', new THREE.Uniform(pixelSize)],
      ['lightPosition', new THREE.Uniform(lightPosition)],
    ]);

    super('CustomLegoEffect', fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  update(_renderer, _inputBuffer, _deltaTime) {
    this.uniforms.get('pixelSize').value = this.pixelSize;
    this.uniforms.get('lightPosition').value = this.lightPosition;
  }
}

const CustomLegoEffect = wrapEffect(CustomLegoEffectImpl);

const LegoEffect = () => {
  const effectRef = useRef();

  const { pixelSize, lightPosition } = useControls({
    pixelSize: {
      value: 24.0,
      min: 8.0,
      max: 32.0,
      step: 2.0,
    },
    lightPosition: {
      value: new THREE.Vector2(0.8, 0.8),
      min: -1.0,
      max: 1.0,
    },
  });

  useFrame((state) => {
    const { camera } = state;

    if (effectRef.current) {
      effectRef.current.pixelSize = pixelSize;
      effectRef.current.lightPosition = lightPosition;
    }

    camera.lookAt(0, 0, 0);
  });

  return (
    <EffectComposer>
      <CustomLegoEffect ref={effectRef} pixelSize={pixelSize} lightPosition={lightPosition} />
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

const LegoModel = () => {
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
      <LegoEffect />
    </>
  );
};

const Lego = () => {
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
          <LegoModel />
        </Suspense>
      </Canvas>
      <Leva collapsed />
    </>
  );
};

export default Lego;