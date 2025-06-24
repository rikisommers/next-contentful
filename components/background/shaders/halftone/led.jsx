import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { Effect } from 'postprocessing';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from './led.glsl';
import { Venus } from '../venus';

class CustomLEDEffectImpl extends Effect {
  constructor({ pixelSize = 1.0, maskStagger = 0.5 }) {
    const uniforms = new Map([
      ['pixelSize', new THREE.Uniform(pixelSize)],
      ['maskStagger', new THREE.Uniform(maskStagger)],
    ]);

    super('CustomLEDEffect', fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  update(_renderer, _inputBuffer, _deltaTime) {
    this.uniforms.get('pixelSize').value = this.pixelSize;
    this.uniforms.get('maskStagger').value = this.maskStagger;
  }
}

const CustomLEDEffect = wrapEffect(CustomLEDEffectImpl);

export const LEDEffect = () => {
  const effectRef = useRef();

  const { pixelSize, maskStagger } = useControls({
    pixelSize: {
      value: 8.0,
      min: 8.0,
      max: 32.0,
      step: 2.0,
    },
    maskStagger: {
      value: 0.5,
      min: 0.0,
      max: 1.0,
      step: 0.01,
    },
  });

  useFrame((state) => {
    const { camera } = state;

    if (effectRef.current) {
      effectRef.current.pixelSize = pixelSize;
      effectRef.current.maskStagger = maskStagger;
    }

    camera.lookAt(0, 0, 0);
  });

  return (
    <EffectComposer>
      <CustomLEDEffect ref={effectRef} pixelSize={pixelSize} maskStagger={maskStagger} />
    </EffectComposer>
  );
};

const LED = () => {
  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[-0, 0, -5]}
        zoom={100}
        near={0.01}
        far={500}
      />
      <Venus />
      <LEDEffect />
    </>
  );
};

const Led = () => {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]}
      >
        <Suspense>
          <color attach='background' args={['#010101']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, -5]} intensity={10.0} />
          <OrbitControls />
          <LED />
        </Suspense>
      </Canvas>
      <Leva collapsed />
    </>
  );
};

export default Led;