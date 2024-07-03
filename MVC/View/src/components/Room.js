// src/components/Room.js
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GridHelper } from 'three';
import { useThree } from '@react-three/fiber';

const CustomGrid = ({ size, divisions, position, rotation }) => {
  const gridRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    const grid = new GridHelper(size, divisions);
    grid.position.set(...position);
    grid.rotation.set(...rotation);
    scene.add(grid);
    gridRef.current = grid;

    return () => {
      scene.remove(grid);
    };
  }, [size, divisions, position, rotation, scene]);

  return null;
};

const Room = ({ height, width, depth }) => {
  const wallWidth = width;
  const wallHeight = height;
  const floorDepth = depth;
  const divisions = 15;

  return (
    <Canvas style={{ height: '30rem', width: '100%', background:"#F6EFEF" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Back Wall */}
      <mesh position={[0, wallHeight / 2, -floorDepth / 2]}>
        <planeGeometry args={[wallWidth, wallHeight]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <CustomGrid size={wallWidth} divisions={divisions} position={[0, wallHeight / 2, -floorDepth / 2]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[wallWidth, floorDepth]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <CustomGrid size={wallWidth} divisions={divisions} position={[0, 0, 0]} rotation={[0, 0, 0]} />

      {/* Right Wall */}
      <mesh position={[wallWidth / 2, wallHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[floorDepth, wallHeight]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <CustomGrid size={floorDepth} divisions={divisions} position={[wallWidth / 2, wallHeight / 2, 0]} rotation={[0, 0, Math.PI / 2]} />

      {/* Left Wall */}
      <mesh position={[-wallWidth / 2, wallHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[floorDepth, wallHeight]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <CustomGrid size={floorDepth} divisions={divisions} position={[-wallWidth / 2, wallHeight / 2, 0]} rotation={[0, 0, -Math.PI / 2]} />

      <OrbitControls />
    </Canvas>
  );
};

export default Room;
