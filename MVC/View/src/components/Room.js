// src/components/Room.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';


const Room = (height, width , depth) => {
  var wallWidth = width;
  var wallHeight = height;
  var floorDepth = depth;

  return (
    <Canvas style={{ height: '100%',width:'100%'}}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} />

      {/* Back Wall */}
      <mesh position={[0, wallHeight / 2, -floorDepth / 2]}>
        <Plane args={[wallWidth, wallHeight]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <Plane args={[wallWidth, floorDepth]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[wallWidth / 2, wallHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <Plane args={[floorDepth, wallHeight]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-wallWidth / 2, wallHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Plane args={[floorDepth, wallHeight]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};

export default Room;
