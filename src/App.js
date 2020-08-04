import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";

import "./App.css";

const crossVectors = function (a, b) {
  const ax = a.x,
    ay = a.y,
    az = a.z;
  const bx = b.x,
    by = b.y,
    bz = b.z;
  
  const result;

    result.x = ay * bz - az * by;
    result.y = az * bx - ax * bz;
    result.z = ax * by - ay * bx;

  return result;
};
const subtractVectors = function ( a, b ) {
  const result;
  result.x = a.x - b.x;
  result.y = a.y - b.y;
  result.z = a.z - b.z;

  return result;

}
function normalize(point) {
  var norm = Math.sqrt(point.x * point.x + point.y * point.y+ point.z * point.z);
  if (norm != 0) { 
    point.x =  point.x / norm;
    point.y =  point.y / norm;
    point.z =  point.z / norm;
  }
  return point;
}
const lookAt = ({ eye, target, up }) => {
  const n = new Vector3();
  const u = new Vector3();
  const v = new Vector3();

  n = subtractVectors(target,eye);
  u = up;
  v = crossVectors(n, u);
  u = crossVectors(u, n);

  n =normalize(n);
  v =normalize(v);
  u =normalize(u);




};

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
        position={[0, 10, 25]}
        up={[5, -5, 0]}
        viewport={vectorLeftRef.current}
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
          position: [0, 10, 75],
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
      <Canvas colorManagement shadowMap>
        <Camera />
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
        <meshStandardMaterial attach="material" color={"blue"} />
      </Canvas>
    </>
  );
};

export default App;
