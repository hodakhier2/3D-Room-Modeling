import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggableModel = ({ model }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: model.uid,
    data: { modelUrl: model.embedUrl },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000, 
    position: 'absolute', 
  } : { position: 'relative' }; 

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width: '200px', height: '170px', backgroundColor: 'transparent' }}
      {...listeners}
      {...attributes}
    >
      {model.thumbnail_url ? (
        <img src={model.thumbnail_url} alt={model.name} style={{ width: '100%', height: '100%' }} />
      ) : (
        <div>Thumbnail not available</div>
      )}
    </div>
  );
};

export default DraggableModel;
