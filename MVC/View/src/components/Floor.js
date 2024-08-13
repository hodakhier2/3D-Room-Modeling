// Floor.js
import React from 'react';
import { useTexture } from '@react-three/drei';

const Floor = ({ width, depth, textureUrl, onClick }) => {
  const texture = useTexture(textureUrl);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={onClick}>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Floor;
