import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { GridHelper } from 'three';
import { useThree } from '@react-three/fiber';
import DraggableComponent from './DraggableComponent';
import Chair from './Chair';
import Sofa from './Sofa';
import Floor from './Floor';
import Bookcase from './Bookcase';
import woodF from '../media/woodfloor.jpg';
import darkF from '../media/darkfloor.jpg';
import Table from './Table';
import Bed from './Bed';
import Window from './Window';

const ColorPalette = ({ onSelectColor }) => {
  const colors = ['#C2F4DB', '#C2DBF4', '#F4DBC2', '#F4C2C2', '#FFFFFF'];
  return (
    <div style={{ position: 'absolute', bottom: '10px', left: '10px', height: 'fit-content', display: 'grid' }}>
      {colors.map(color => (
        <button
          key={color}
          style={{ cursor: 'pointer', backgroundColor: color, width: '50px', height: '50px' }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};

const CustomGrid = ({ size, divisions, position, rotation, visible }) => {
  const gridRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    if (visible) {
      const grid = new GridHelper(size, divisions);
      grid.position.set(...position);
      grid.rotation.set(...rotation);
      scene.add(grid);
      gridRef.current = grid;

      return () => {
        scene.remove(grid);
      };
    }
  }, [size, divisions, position, rotation, scene, visible]);

  return null;
};

const Room = ({ height, width, depth, droppedModels, updateWallsColors, updateFloor, updateModelPosition, wallColors: propWallColors, floorColor, onDeleteModel }) => {
  const initialPosition = [0, 0, 0];
  const controlsRef = useRef();

  const [wallColors, setWallColors] = useState({
    leftWall: propWallColors?.leftWall || 'ffffff',
    rightWall: propWallColors?.rightWall || 'ffffff',
    backWall: propWallColors?.backWall || 'ffffff'
  });

  const [selectedWall, setSelectedWall] = useState(null);
  const [floorTexture, setFloorTexture] = useState(
      floorColor || woodF
    );

  // Update wallColors state if propWallColors changes
  useEffect(() => {
    setWallColors({
      leftWall: propWallColors?.leftWall || 'ffffff',
      rightWall: propWallColors?.rightWall || 'ffffff',
      backWall: propWallColors?.backWall || 'ffffff'
    });
  }, [propWallColors]);

  const handleWallClick = (wallName) => {
    setSelectedWall(wallName); // Set the selected wall for painting
  };

  const onSelectColor = (color) => {
    if (selectedWall) {
      const newWallColors = {
        ...wallColors,
        [selectedWall]: color  // Updates the state of the selected wall's color
      };
      setWallColors(newWallColors);
      updateWallsColors(newWallColors); // Update wall colors in Service
      setSelectedWall(null); // Reset the selected wall after color selection
    }
  };

  const handleFloorClick = () => {
    const newFloorTexture = floorTexture === woodF ? darkF : woodF;
    setFloorTexture(newFloorTexture); // Toggle between floor textures
    updateFloor(newFloorTexture); // Update floor texture in Service
  };

  const handleDragStart = () => {
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  };

  const handleDragEnd = () => {
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  };

  return (
    <div style={{ width: '100%', height: '30rem', margin: '2rem' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <Environment preset="apartment" />
        <pointLight position={[10, 10, 10]} />

        {/* Back Wall */}
        <mesh position={[0, height / 2, -depth / 2]} onClick={() => handleWallClick('backWall')}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color={wallColors.backWall} />
        </mesh>
        <CustomGrid size={width} divisions={15} position={[0, height / 2, -depth / 2]} rotation={[Math.PI / 2, 0, 0]} visible={!wallColors.backWall || selectedWall !== 'backWall'} />

        {/* Floor */}
        <Floor width={width} depth={depth} textureUrl={floorTexture} onClick={handleFloorClick} />
        <CustomGrid size={width} divisions={15} position={[0, 0, 0]} rotation={[0, 0, 0]} visible={true} />

        {/* Right Wall */}
        <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} onClick={() => handleWallClick('rightWall')}>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial color={wallColors.rightWall} />
        </mesh>
        <CustomGrid size={depth} divisions={15} position={[width / 2, height / 2, 0]} rotation={[0, 0, Math.PI / 2]} visible={!wallColors.rightWall || selectedWall !== 'rightWall'} />

        {/* Left Wall */}
        <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} onClick={() => handleWallClick('leftWall')}>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial color={wallColors.leftWall} />
        </mesh>
        <CustomGrid size={depth} divisions={15} position={[-width / 2, height / 2, 0]} rotation={[0, 0, -Math.PI / 2]} visible={!wallColors.leftWall || selectedWall !== 'leftWall'} />

        <Suspense fallback={null}>
          {droppedModels.map((model, index) => {
            let Component;
            let scale;
            switch (model.id) {
              case '5a04deabddda40d48f32f71ba5653390':
                Component = Chair;
                scale = [0.018, 0.018, 0.018];
                break;
              case 'b52a7fe872c3486b97b107a2e3ead026':
                Component = Sofa;
                scale = [0.015, 0.01, 0.01];
                break;
              case 'eac9c98de25c429a9f5df719ac2fb261':
                Component = Bookcase;
                scale = [1.5, 1.5, 1.5];
                break;
              case 'a6deba91a7f9435082369e33f8db0dd6':
                Component = Table;
                scale = [0.002, 0.002, 0.002];
                break;
              case 'e681df331fd148f1b9b12ca8a6d32bcb':
                Component = Bed;
                break;
              case 'bd087ed6ca314a9d9e39c0fa04239c14':
                Component = Window;
                scale = [0.2,0.2, 0.2];
                break;
                
              default:
                return null;
            }

            return (
              <DraggableComponent
                key={index}
                Component={Component}
                initialPosition={initialPosition}
                roomWidth={width}
                roomDepth={depth}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onPositionChange={(position) => updateModelPosition(index, position)}
                scale={scale}
                onDelete={() => onDeleteModel(index)} 
              />

            );
          })}
        </Suspense>

        <OrbitControls ref={controlsRef} />
      </Canvas>
      {selectedWall && <ColorPalette onSelectColor={onSelectColor} />}
    </div>
  );
};

export default Room;
