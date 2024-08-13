import React, { Component } from 'react';
import Room from './Room';
import '../style/RoomContainer.css';

export default class RoomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: this.props.height || 3,
      width: this.props.width || 6,
      depth: this.props.depth || 5,
      wallColors: this.props.wallColors || { leftWall: '#ffffff', rightWall: '#ffffff', backWall: '#ffffff' },
      floorColor : this.props.floorColor || '../media/woodfloor.jpg'
    };
  }

  componentDidMount(){
    console.log("height: ",this.props.height);
    console.log("width: ",this.props.width);
    console.log("depth: ",this.props.depth);
    console.log("wallColors: ", this.state.wallColors);
  }

  setHeight = (e) => {
    const newHeight = Number(e.target.value);
    this.setState({ height: newHeight }, () => {
      this.props.updateRoomMeasures({ ...this.state });
    });
  }

  setWidth = (e) => {
    const newWidth = Number(e.target.value);
    this.setState({ width: newWidth }, () => {
      this.props.updateRoomMeasures({ ...this.state });
    });
  }

  setDepth = (e) => {
    const newDepth = Number(e.target.value);
    this.setState({ depth: newDepth }, () => {
      this.props.updateRoomMeasures({ ...this.state });
    });
  }

  render() {
    const { height, width, depth, wallColors, floorColor } = this.state;
    const { droppedModels, updateWallsColors, updateFloor, updateModelPosition, onDeleteModel } = this.props;

    return (
      <div className='mainRC'>
        <div className='containerRC'>
          <label>
            Height:
            <input type="number" value={height} onChange={this.setHeight} />
          </label>
          <label>
            Width:
            <input type="number" value={width} onChange={this.setWidth} />
          </label>
          <label>
            Depth:
            <input type="number" value={depth} onChange={this.setDepth} />
          </label>
        </div>
        <Room height={height} width={width} depth={depth} 
        droppedModels={droppedModels} 
        updateWallsColors={updateWallsColors}  
        updateFloor={updateFloor}
        updateModelPosition={updateModelPosition}
        wallColors={wallColors}
        floorColor = {floorColor}
        onDeleteModel={onDeleteModel}
         />
      </div>
    );
  }
}
