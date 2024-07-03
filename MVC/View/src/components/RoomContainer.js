// src/components/RoomContainer.js
import React, { useState } from 'react';
import Room from './Room';
import '../style/RoomContainer.css';

const RoomContainer = () => {
  const [height, setHeight] = useState(3);
  const [width, setWidth] = useState(6);
  const [depth, setDepth] = useState(5);

  return (
    <div className='mainRC'>
      <div className='containerRC'>
        <label>
          Height:
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
        </label>
        <label>
          Width:
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
        </label>
        <label>
          Depth:
          <input type="number" value={depth} onChange={(e) => setDepth(Number(e.target.value))} />
        </label>
      </div>
      <Room height={height} width={width} depth={depth} />
    </div>
  );
};

export default RoomContainer;
