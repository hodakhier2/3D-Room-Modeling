import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import Sofa from '../components/Sofa';

const DraggableSofa = ({ initialPosition, roomWidth, roomDepth, onDragStart, onDragEnd }) => {
  const sofaRef = useRef();
  const { gl } = useThree();
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const scaleFactor = 0.01; //dragging speed
  const rotationFactor = 0.01; //rotation speed

  const handlePointerDown = useCallback((event) => {
    event.stopPropagation();
    if (event.shiftKey) { // Shift key for rotation
      setIsRotating(true);
    } else {
      setIsDragging(true);
    }
    gl.domElement.style.cursor = 'grabbing';
    if (onDragStart) onDragStart();
  }, [gl.domElement, onDragStart]);

  const handlePointerUp = useCallback((event) => {
    event.stopPropagation();
    setIsDragging(false);
    setIsRotating(false);
    gl.domElement.style.cursor = 'grab';
    if (onDragEnd) onDragEnd();
  }, [gl.domElement, onDragEnd]);

  const handlePointerMove = useCallback((event) => {
    event.stopPropagation();

    if (isDragging) {
      const deltaX = event.movementX * scaleFactor;
      const deltaY = event.movementY * scaleFactor;

      let newX = position[0] + deltaX;
      let newZ = position[2] + deltaY;

      // Bounds checking to keep the chair within the room's floor area
      const halfRoomWidth = roomWidth / 2;
      const halfRoomDepth = roomDepth / 2;

      if (newX < -halfRoomWidth) newX = -halfRoomWidth;
      if (newX > halfRoomWidth) newX = halfRoomWidth;
      if (newZ < -halfRoomDepth) newZ = -halfRoomDepth;
      if (newZ > halfRoomDepth) newZ = halfRoomDepth;

      setPosition([newX, 0, newZ]);
    }

    if (isRotating) {
      const deltaRotation = event.movementX * rotationFactor;
      setRotation([rotation[0], rotation[1] + deltaRotation, rotation[2]]);
    }
  }, [isDragging, isRotating, position, rotation, roomWidth, roomDepth, scaleFactor, rotationFactor]);

  useEffect(() => {
    const domElement = gl.domElement;
    if (isDragging || isRotating) {
      domElement.addEventListener('pointermove', handlePointerMove);
      domElement.addEventListener('pointerup', handlePointerUp);
    } else {
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
    }

    return () => {
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, isRotating, gl.domElement, handlePointerMove, handlePointerUp]);

  useFrame(() => {
    if (sofaRef.current) {
      sofaRef.current.position.set(position[0], position[1], position[2]);
      sofaRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  });

  return (
    <group
      ref={sofaRef}
      position={position}
      rotation={rotation}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <Sofa scale={[0.015, 0.01, 0.01]} />
    </group>
  );
};

export default DraggableSofa;
