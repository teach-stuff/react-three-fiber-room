import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';

import './App.css';
import { PerspectiveCamera } from 'three';

const SpinningMesh = ({ position, args }) => {
  const mesh = useRef();

  useFrame(() => (mesh.current.position.z -= 0.05));

  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
    </mesh>
  );
};

const Camera = () => {
  const vectorLeftRef = useRef();
  const cameraLeftRef = useRef();
  const vectorRightRef = useRef();
  const cameraRightRef = useRef();

  const camera = useRef();

  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(camera.current), []);
  // Update it every frame
  useFrame(() => {
    cameraLeftRef.current.updateMatrixWorld();
    cameraRightRef.current.updateMatrixWorld();
    camera.current.updateMatrixWorld();
    camera.current.updateProjectionMatrix();
  });

  return (
    <>
      <vector4
        ref={vectorLeftRef}
        x={0}
        y={0}
        z={window.innerWidth / 2}
        w={window.innerHeight}
      />
      <perspectiveCamera
        ref={cameraLeftRef}
        {...{
          position: [5, 5, 75],
          fov: 70,
          viewport: vectorLeftRef.current,
        }}
      />

      <vector4
        ref={vectorRightRef}
        x={window.innerWidth / 2}
        y={0}
        z={window.innerWidth / 2}
        w={window.innerHeight}
      />
      <perspectiveCamera
        ref={cameraRightRef}
        {...{
          position: [15, 5, 75],
          fov: 70,
          viewport: vectorRightRef.current,
        }}
      />

      <arrayCamera
        ref={camera}
        position={{ z: 3 }}
        cameras={[cameraLeftRef.current, cameraRightRef.current]}
      />
    </>
  );
};

const App = () => {
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        // camera={{ position: [5, 5, 75], fov: 70 }}
      >
        <Camera />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[1, -3, 10]}
          receiveShadow
        >
          <planeBufferGeometry attach="geometry" args={[30, 30]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
        <mesh position={[1, 12, -5]} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[30, 30]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          position={[1, 27, 10]}
          receiveShadow
        >
          <planeBufferGeometry attach="geometry" args={[30, 30]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
        <mesh
          rotation={[0, Math.PI / 2, 0]}
          position={[-14, 12, 10]}
          receiveShadow
        >
          <planeBufferGeometry attach="geometry" args={[30, 30]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
        <mesh
          rotation={[0, -Math.PI / 2, 0]}
          position={[16, 12, 10]}
          receiveShadow
        >
          <planeBufferGeometry attach="geometry" args={[30, 30]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>

        <SpinningMesh position={[0, 0, 50]} args={[6, 6, 6]} />
      </Canvas>
    </>
  );
};

export default App;
