import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import { Effect } from 'postprocessing';
import { Suspense, useEffect,useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from './ascii.glsl';
import { Venus } from '../venus';

class CustomASCIIEffectImpl extends Effect {
  constructor({ pixelSize = 1.0, asciiTexture, charCount, showBackground }) {
    const uniforms = new Map([
      ['pixelSize', new THREE.Uniform(pixelSize)],
      ['asciiTexture', new THREE.Uniform(asciiTexture)],
      ['charCount', new THREE.Uniform(new THREE.Vector2(charCount, charCount))],
      ['showBackground', new THREE.Uniform(showBackground)],
    ]);

    super('CustomASCIIEffect', fragmentShader, {
      uniforms,
    });

    this.uniforms = uniforms;
  }

  update(_renderer, _inputBuffer, _deltaTime) {
    this.uniforms.get('pixelSize').value = this.pixelSize;
    this.uniforms.get('asciiTexture').value = this.asciiTexture;
    if (this.charCount) {
      this.uniforms.get('charCount').value = new THREE.Vector2(
        this.charCount[0],
        this.charCount[1],
      );
    }
    this.uniforms.get('showBackground').value = this.showBackground;
  }
}

const CustomASCIIEffect = wrapEffect(CustomASCIIEffectImpl);

const ASCII_CHARS = './ノハメラマ木';

export const ASCIIEffect = () => {
  const effectRef = useRef();

  const { asciiChars, pixelSize, showBackground } = useControls({
    asciiChars: {
      value: ASCII_CHARS,
    },
    pixelSize: {
      value: 16.0,
      min: 8.0,
      max: 32.0,
      step: 2.0,
    },
    showBackground: {
      value: false,
    },
  });

  useFrame((state) => {
    const { camera } = state;

    if (effectRef.current) {
      effectRef.current.pixelSize = pixelSize;
      effectRef.current.showBackground = showBackground;
    }

    camera.lookAt(0, 0, 0);
  });

  const fontFamily = 'mono';

  useEffect(() => {
    const CHAR_SIZE = pixelSize;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = CHAR_SIZE * asciiChars.length;
    canvas.height = CHAR_SIZE;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = `${CHAR_SIZE}px ${fontFamily}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    asciiChars.split('').forEach((char, i) => {
      ctx.fillText(char, (i + 0.5) * CHAR_SIZE, CHAR_SIZE / 2);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;

    if (effectRef.current) {
      effectRef.current.asciiTexture = texture;
      effectRef.current.charCount = [asciiChars.length, 1];
      effectRef.current.charSize = CHAR_SIZE;
    }
  }, [pixelSize, asciiChars]);

  return (
    <EffectComposer>
      <CustomASCIIEffect ref={effectRef} pixelSize={pixelSize} />
    </EffectComposer>
  );
};

const ASCII = () => {
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
      <ASCIIEffect />
    </>
  );
};

const Ascii = () => {
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 1.5]}
      >
        <Suspense>
          <color attach='background' args={['#010101']} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 10, 0]} intensity={10.0} />
          <OrbitControls />
          <ASCII />
        </Suspense>
      </Canvas>
      <Leva collapsed />
    </>
  );
};

export default Ascii;