import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useThree } from '@react-three/fiber';

const DraggableComponent = ({ Component, initialPosition, roomWidth, roomDepth, onDragStart, onDragEnd, scale, onPositionChange, onDelete }) => {
  const itemRef = useRef();
  const { gl } = useThree();
  const [position, setPosition] = useState({ x: initialPosition[0], y: initialPosition[1], z: initialPosition[2] });
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isSelected, setIsSelected] = useState(false);

  const scaleFactor = 0.01; // dragging speed
  const rotationFactor = 0.01; // rotation speed

  const handlePointerDown = useCallback((event) => {
    event.stopPropagation();
    if (event.shiftKey) { // Shift key for rotation
      setIsRotating(true);
    } else {
      setIsDragging(true);
      setIsSelected(true); // Mark this model as selected
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
    if (onPositionChange) onPositionChange(position); // Notify parent component of position change
  }, [gl.domElement, onDragEnd, onPositionChange, position]);

  const handlePointerMove = useCallback((event) => {
    event.stopPropagation();

    if (isDragging) {
      const deltaX = event.movementX * scaleFactor;
      const deltaY = event.movementY * scaleFactor;

      let newX = position.x + deltaX;
      let newZ = position.z + deltaY;

      // Bounds checking to keep the item within the room's floor area
      const halfRoomWidth = roomWidth / 2;
      const halfRoomDepth = roomDepth / 2;

      if (newX < -halfRoomWidth) newX = -halfRoomWidth;
      if (newX > halfRoomWidth) newX = halfRoomWidth;
      if (newZ < -halfRoomDepth) newZ = -halfRoomDepth;
      if (newZ > halfRoomDepth) newZ = halfRoomDepth;

      setPosition({ x: newX, y: 0, z: newZ });
    }

    if (isRotating) {
      const deltaRotation = event.movementX * rotationFactor;
      setRotation({ x: rotation.x, y: rotation.y + deltaRotation, z: rotation.z });
    }
  }, [isDragging, isRotating, position, rotation, roomWidth, roomDepth, scaleFactor, rotationFactor]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isSelected && event.key === 'Delete') {
        if (onDelete) onDelete();
      }
    };

    const domElement = gl.domElement;
    if (isDragging || isRotating) {
      domElement.addEventListener('pointermove', handlePointerMove);
      domElement.addEventListener('pointerup', handlePointerUp);
    } else {
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDragging, isRotating, gl.domElement, handlePointerMove, handlePointerUp, isSelected, onDelete]);

  return (
    <group
      ref={itemRef}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <Component scale={scale} />
    </group>
  );
};

export default DraggableComponent;
