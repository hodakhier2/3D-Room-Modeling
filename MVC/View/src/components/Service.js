import React, { Component } from 'react';
import '../style/Service.css';
import RoomContainer from './RoomContainer';
import SketchfabModels from './SketchfabModels';
import { DndContext, closestCenter } from '@dnd-kit/core';
import DroppableComponent from './DroppableComponent';
import { AuthContext } from '../components/AuthContext';

class Service extends Component {
  static contextType = AuthContext;

  constructor(props) {
    const state = props.location && props.location.state ? props.location.state : {};

    super(props);
    this.state = {
      page: null,
      error: null,
      droppedModels: [],
      selection: '',
      roomMeasures: { width: 6, height: 3, depth: 5 },
      floorColor: '/static/media/woodfloor.c86a67c273ee57e134c8.jpg',
      wallColors: { leftWall: '#ffffff', rightWall: '#ffffff', backWall: '#ffffff' },
      isEditingTemplateName: false,
      templateName: '',
      roomConfigs: state.roomConfigs || {},
      myModels: state.myModels || [],
      posted : 0,
      saved : 0
    };
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.saveRoom = this.saveRoom.bind(this);
    //this.postRoom = this.postRoom.bind(this);
    this.updateRoomMeasures = this.updateRoomMeasures.bind(this);
    this.updateWallsColors = this.updateWallsColors.bind(this);
    this.updateFloor = this.updateFloor.bind(this);
    this.updateModelPosition = this.updateModelPosition.bind(this);
    this.toggleEditTemplateName = this.toggleEditTemplateName.bind(this);
    this.handleTemplateNameChange = this.handleTemplateNameChange.bind(this);
  }

  componentDidMount() {
    const { roomConfigs, myModels } = this.state;

  if (roomConfigs && Object.keys(roomConfigs).length > 0) {
    this.setState({
      roomMeasures: {
        width: roomConfigs.width,
        height: roomConfigs.height,
        depth: roomConfigs.depth
      },
      floorColor: roomConfigs.floor,
      wallColors: {
      leftWall: roomConfigs.leftWall,
      rightWall: roomConfigs.rightWall,
      backWall: roomConfigs.backWall
      },
      droppedModels: myModels.map((model) => ({
        id: model.itemId,
        position: {
          x: model.positionx,
          y: model.positiony,
          z: model.positionz
        },
        dropArea: 'threeD'  // Assuming all models are in the 3D room area
      })),
      templateName: roomConfigs.roomName,
    });
  }

    const pageId = 5;
    console.log('Fetching page data...');
    fetch(`http://localhost:3001/pages/${pageId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        data.pageContent = JSON.parse(data.pageContent);
        this.setState({ page: data });
      })
      .catch(error => {
        this.setState({ error });
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  handleDragEnd(event) {
    const { active, over } = event;
    console.log('Drag End Event:', event);
    if (over && over.id) {
      const modelUrl = active.data.current.modelUrl;
      console.log('Model URL:', modelUrl);
      if (modelUrl) {
        const dropPosition = {
          x: over.rect.left - active.rect.left || 0,
          y: over.rect.top - active.rect.top || 0,
          z: over.id === 'threeD' ? 0 : 0,
        };
        this.setState(prevState => ({
          droppedModels: [...prevState.droppedModels, { id: active.id, modelUrl, position: dropPosition, dropArea: over.id }],
        }));
      } else {
        console.error('Model URL is undefined:', active.data.current);
      }
    }
  }

  toggleEditTemplateName() {
    this.setState((prevState) => ({
      isEditingTemplateName: !prevState.isEditingTemplateName,
    }));
  }

  handleTemplateNameChange(event) {
    this.setState({ templateName: event.target.value });
  }

  handleOptionChange(event) {
    this.setState({ selection: event.target.value });
  }

  updateRoomMeasures(newMeasures) {
    this.setState({ roomMeasures: newMeasures }, () => {
      console.log('Height x Width x Depth : ', this.state.roomMeasures.height, this.state.roomMeasures.width, this.state.roomMeasures.depth);
    });
  }

  updateWallsColors(newColors) {
    this.setState({ wallColors: newColors }, () => {
      console.log('Right x Back x Left : ', this.state.wallColors.rightWall, this.state.wallColors.backWall, this.state.wallColors.leftWall);
    });
  }

  updateFloor(newFloor) {
    this.setState({ floorColor: newFloor }, () => {
      console.log('Floor : ', this.state.floorColor);
    });
  }

  updateModelPosition(index, newPosition) {
    this.setState(prevState => {
      const newDroppedModels = [...prevState.droppedModels];
      newDroppedModels[index] = {
        ...newDroppedModels[index],
        position: newPosition
      };
      return { droppedModels: newDroppedModels };

    }, () => {
      console.log('Updated Model Positions:', this.state.droppedModels);
    });
  }

  handleDeleteModel = (indexToRemove) => {
    this.setState(prevState => ({
      droppedModels: prevState.droppedModels.filter((_, index) => index !== indexToRemove)
    }), () => {
      console.log('Model deleted:', this.state.droppedModels);
    });
  }
  
  saveRoom() {
    const { roomMeasures, floorColor, wallColors, droppedModels, templateName } = this.state;
    const { userId } = this.context; // Get userId from context
    const roomData = {
      userId: userId,
      roomName: templateName || 'Template name',
      roomMeasures,
      floorColor,
      wallColors,
      droppedModels
    };

    console.log('room data service: ', roomData);
    if (roomData.userId !== null) {
      fetch('http://localhost:3001/saveRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Room configuration saved successfully:', data);
          this.setState({saved : 1});
          alert("Congrats! Your room was saved successfully");
        })
        .catch(error => {
          console.error('Error saving room configuration:', error);
          alert("Error saving room configuration");
        });
    } else {
      alert("Sorry, you need to be logged in :(");
    }
  }
/*
  postRoom()
  {
    if(this.state.saved === 1)
    {
      const posted = 1;
      fetch('http://localhost:3001/postRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(posted),
      })
        .then(response => response.json())
        .then(data => {
          alert("Congrats! Your room was shared to our comunity");
        })
        .catch(error => {
          console.error('Error posting room:', error);
          alert("Error posting room");
        });
      }
      else{
        alert("Sorry, you need to save it first");
      }
    }
*/
  render() {
    const { page, error, droppedModels, selection } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!page) {
      return <div>Loading...</div>;
    }

    console.log('the dropped models are:', droppedModels);
    return (
      <DndContext onDragEnd={this.handleDragEnd} collisionDetection={closestCenter}>
        <div id="contentS">
          <div id="leftS">
            <div id="ContainsSer">
              <div className='templateNameContainer'>
                {this.state.isEditingTemplateName ? (
                  <input
                    className='temname'
                    type="text"
                    value={this.state.templateName}
                    onChange={this.handleTemplateNameChange}
                    onBlur={this.toggleEditTemplateName}
                    autoFocus
                  />
                ) : (
                  <p className="temname" onClick={this.toggleEditTemplateName}>
                    {this.state.templateName || page.pageContent.TemplateName}
                  </p>
                )}
              </div>

              <button id="saving" onClick={this.saveRoom}>{page.pageContent.savingButton}</button>
              <button id="posting">{page.pageContent.publishButton}</button>
            </div>
            <DroppableComponent id="threeD" className="threeD">
                <RoomContainer
                  height = {this.state.roomMeasures.height}
                  width = {this.state.roomMeasures.width}
                  depth = {this.state.roomMeasures.depth}
                  wallColors = {this.state.wallColors}
                  floorColor = {this.state.floorColor}
                  droppedModels={droppedModels.filter(model => model.dropArea === 'threeD')}
                  updateRoomMeasures={this.updateRoomMeasures}
                  updateWallsColors={this.updateWallsColors}
                  updateFloor={this.updateFloor}
                  updateModelPosition={this.updateModelPosition} 
                  onDeleteModel={this.handleDeleteModel} />
            </DroppableComponent>
          </div>
          <div id="rightS">
            <select id="selection" value={selection} onChange={this.handleOptionChange}>
              {page.pageContent.options.map(item => (
                <option key={item.value} value={item.value}>{item.name}</option>
              ))}
            </select>
            <div className="containerS">
              <div className="pairS">
                <SketchfabModels selection={selection} />
              </div>
              <p className="itemPreviewTxt">{page.pageContent.itemPreviewTxt}</p>
              <DroppableComponent id="preview">
                <div className="preview" id="preview">
                  {droppedModels.filter(model => model.dropArea === 'preview').map((model, index) => (
                    <iframe
                      key={index}
                      title={index}
                      src={model.modelUrl}
                      style={{
                        position: 'relative',
                        height: '170px',
                        width: '200px',
                        border: 'none',
                        background: 'transparent',
                      }}
                      allow="autoplay; fullscreen; vr"
                      mozallowfullscreen="true"
                      webkitallowfullscreen="true"
                      className="preview"
                    />
                  ))}
                </div>
              </DroppableComponent>
            </div>
          </div>
        </div>
      </DndContext>
    );
  }
}

export default Service;
