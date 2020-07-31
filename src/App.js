import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "drei";

import "./App.css";

const SpinningMesh = ({ position, args }) => {
  const mesh = useRef();

  useFrame(() => (mesh.current.position.z -= 0.05));

  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
    </mesh>
  );
};

const App = () => {
  return (
    <>
      <group>
        <Canvas
          colorManagement
          shadowMap
          camera={{ position: [5, 5, 75], fov: 70 }}
        >
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[1, -3, 10]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[30, 30]} />
            <meshStandardMaterial attach="material" color={"red"} />
          </mesh>
          <mesh position={[1, 12, -5]} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[30, 30]} />
            <meshStandardMaterial attach="material" color={"red"} />
          </mesh>
          <mesh
            rotation={[Math.PI / 2, 0, 0]}
            position={[1, 27, 10]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[30, 30]} />
            <meshStandardMaterial attach="material" color={"red"} />
          </mesh>
          <mesh
            rotation={[0, Math.PI / 2, 0]}
            position={[-14, 12, 10]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[30, 30]} />
            <meshStandardMaterial attach="material" color={"red"} />
          </mesh>
          <mesh
            rotation={[0, -Math.PI / 2, 0]}
            position={[16, 12, 10]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[30, 30]} />
            <meshStandardMaterial attach="material" color={"red"} />
          </mesh>

          <SpinningMesh position={[0, 0, 50]} args={[6, 6, 6]} />
          <OrbitControls />
        </Canvas>
      </group>
    </>
  );
};

export default App;
