// View/src/components/DroppableComponent.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const DroppableComponent = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
};

export default DroppableComponent;
