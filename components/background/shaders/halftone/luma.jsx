import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { Effect } from 'postprocessing';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from './luma.glsl';
import { Venus } from '../venus';

class CustomPatternsEffectImpl extends Effect {
  constructor({ pixelSize = 1.0, pattern = 0 }) {
    const uniforms = new Map([
      ['pixelSize', new THREE.Uniform(pixelSize)],
      ['pattern', new THREE.Uniform(pattern)],
    ]);

    super('CustomPatternsEffect', fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  update(_renderer, _inputBuffer, _deltaTime) {
    this.uniforms.get('pixelSize').value = this.pixelSize;
    this.uniforms.get('pattern').value = this.pattern;
  }
}

const CustomPatternsEffect = wrapEffect(CustomPatternsEffectImpl);

export const PatternsEffect = () => {
  const effectRef = useRef();

  const patterns = ['stripes', 'weave'];

  const { pixelSize, pattern } = useControls({
    pixelSize: {
      value: 8.0,
      min: 8.0,
      max: 32.0,
      step: 2.0,
    },
    pattern: {
      value: 'stripes',
      options: patterns,
    },
  });

  const patternIndex = patterns.indexOf(pattern);

  useFrame((state) => {
    const { camera } = state;

    if (effectRef.current) {
      effectRef.current.pixelSize = pixelSize;
    }

    camera.lookAt(0, 0, 0);
  });

  return (
    <EffectComposer>
      <CustomPatternsEffect ref={effectRef} pixelSize={pixelSize} pattern={patternIndex} />
    </EffectComposer>
  );
};

const Patterns = () => {
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
      <PatternsEffect />
    </>
  );
};

const Luma = () => {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]}
      >
        <Suspense>
          <color attach='background' args={['#010101']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, -5]} intensity={20.0} />
          <OrbitControls />
          <Patterns />
        </Suspense>
      </Canvas>
      <Leva collapsed />
    </>
  );
};

export default Luma;