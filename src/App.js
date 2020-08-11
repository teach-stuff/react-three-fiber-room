import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import useAnimationFrame from 'use-animation-frame';

import './App.css';
import { Vector3 } from 'three';

var crossVectors = function (a, b) {
  var result = { Vector3 };

  result.x = a.y * b.z - a.z * b.y;
  result.y = a.z * b.x - a.x * b.z;
  result.z = a.x * b.y - a.y * b.x;

  return result;
};
var subtractVectors = function (a, b) {
  var result = { Vector3 };
  result.x = a.x - b.x;
  result.y = a.y - b.y;
  result.z = a.z - b.z;

  return result;
};
function normalize(point) {
  var norm = Math.sqrt(
    point.x * point.x + point.y * point.y + point.z * point.z,
  );
  if (norm != 0) {
    point.x = point.x / norm;
    point.y = point.y / norm;
    point.z = point.z / norm;
  }
  //console.log(point);

  return point;
}

function lookAt(eye, target, up) {
  var _x = { Vector3 };
  var _y = { Vector3 };
  var _z = { Vector3 };

  _z = subtractVectors(eye, target);

  _x = crossVectors(up, _z);
  _y = crossVectors(_z, _x);

  _z = normalize(_z);
  _x = normalize(_x);
  _y = normalize(_y);

  // todo pass array directly
  return [
    _x.x,

    _y.x,
    _z.x,
    eye.x,
    _x.y,
    _y.y,
    _z.y,
    eye.y,
    _x.z,
    _y.z,
    _z.z,
    eye.z,
    0,
    0,
    0,
    1,
  ];
}

const SpinningMesh = ({ position, args }) => {
  const mesh = useRef();

  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
    </mesh>
  );
};

const Camera = ({ cubePosition }) => {
  const vectorLeftRef = useRef();
  const cameraLeftRef = useRef();
  const vectorRightRef = useRef();
  const cameraRightRef = useRef();

  const camera = useRef();

  const pos = cubePosition[2];

  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(camera.current), []);
  // Update it every frame

  useFrame(() => {
    // cameraLeftRef.current.updateMatrixWorld();
    // cameraRightRef.current.updateMatrixWorld();
    // camera.current.updateMatrixWorld();
    // camera.current.updateProjectionMatrix();
    //console.log(pos);

    var lookAtMatrix = lookAt(
      new Vector3(50, 50, 75),
      new Vector3(0, 10, pos),
      new Vector3(0, 1, 0),
    );

    //var pos = 70;

    console.log(lookAtMatrix[1]);
    cameraLeftRef.current.matrixAutoUpdate = false;

    cameraLeftRef.current.matrix.set(
      lookAtMatrix[0],
      lookAtMatrix[1],
      lookAtMatrix[2],
      lookAtMatrix[3],
      lookAtMatrix[4],
      lookAtMatrix[5],
      lookAtMatrix[6],
      lookAtMatrix[7],
      lookAtMatrix[8],
      lookAtMatrix[9],
      lookAtMatrix[10],
      lookAtMatrix[11],
      lookAtMatrix[12],
      lookAtMatrix[13],
      lookAtMatrix[14],
      lookAtMatrix[15],
    );

    cameraLeftRef.current.updateMatrixWorld(true);
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
        //position={[0, 10, 75]}
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

const CameraAndCube = () => {
  const [position, setPosition] = useState([0, 0, 50]);
  const requestRef = useRef();

  useAnimationFrame(
    (e) => {
      setPosition([position[0], position[1], position[2] - 0.05]);
    },
    [position],
  );

  return (
    <>
      <Camera cubePosition={position} />
      <SpinningMesh position={position} args={[6, 6, 6]} />
    </>
  );
};

const App = () => {
  return (
    <>
      <Canvas colorManagement shadowMap>
        <CameraAndCube />

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

        <meshStandardMaterial attach="material" color={'blue'} />
      </Canvas>
    </>
  );
};

export default App;
