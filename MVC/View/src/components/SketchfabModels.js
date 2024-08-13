// View/src/components/SketchfabModels.js
import React, { Component } from 'react';
import DraggableModel from './DraggableModel';


// Function to categorize items
const categorizeItems = (items) => {
  const categories = {
    chairs: [],
    sofas: [],
    beds: [],
    tables: [],
    other : []
  };

  const keywords = {
    chairs: ['chair', 'armchair', 'stool', 'seat', 'pouffe' ],
    sofas: ['sofa', 'corner'],
    beds: ['bed', 'bunk', 'mattress'],
    tables: ['table','desk','dining'],
    other: ['bookcase']
  };

  items.forEach(item => {
    const itemName = item.name.toLowerCase();
    
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => itemName.includes(word))) {
        if (categories[category].length < 5) {
          categories[category].push(item);
        }
       break;
      }
     
    }
  });

  return categories;
};


class SketchfabModels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSpecificModels();
  }
 

  async fetchSpecificModels() {
    const modelsToFetch = [
      { collectionId: 'd7792d72d05341f2a55f976fa4caf47d', modelId: '5a04deabddda40d48f32f71ba5653390' }, //yellow chair
      { collectionId: 'd7792d72d05341f2a55f976fa4caf47d', modelId: 'b52a7fe872c3486b97b107a2e3ead026' }, //blue sofa
      { collectionId: '97bffa4e999e4d1faf11ddfb0826e535', modelId: 'eac9c98de25c429a9f5df719ac2fb261' }, //bookcase
      { collectionId: '3a4853fe99984b27ad65f99898dd4a07', modelId: 'a6deba91a7f9435082369e33f8db0dd6' }, //table
      { collectionId: 'ec996ef50c204d5eb361be74d233c84a', modelId: 'e681df331fd148f1b9b12ca8a6d32bcb' }, // bed
      //{ collectionId: 'a64197e6b35e4181b1ba15693f4af54d', modelId: 'bd087ed6ca314a9d9e39c0fa04239c14' }, // window
    ];

    try {
      const response = await fetch('http://localhost:3001/sketchfab/specific-models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelsToFetch }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const specificModels = await response.json();
      this.setState({ models: specificModels });
    } catch (error) {
      this.setState({ error });
      console.error('Error fetching specific models:', error);
    }
  }

  render() {
    const { models, error } = this.state;
    console.log('sketch view models render', models);
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    const catgories = categorizeItems(models);
    return (
      <div>
        {this.props.selection === 'chairs' && catgories.chairs.map(model => (
          <DraggableModel key={model.uid} model={model} />
        ))}
        {this.props.selection === 'tables' && catgories.tables.map(model => (
          <DraggableModel key={model.uid} model={model} />
        ))}
        {this.props.selection === 'beds' && catgories.beds.map(model => (
          <DraggableModel key={model.uid} model={model} />
        ))}
        {this.props.selection === 'sofas' && catgories.sofas.map(model => (
          <DraggableModel key={model.uid} model={model} />
        ))}
         {this.props.selection === 'other' && catgories.other.map(model => (
          <DraggableModel key={model.uid} model={model} />
        ))}
      </div>
    );
    }
}

export default SketchfabModels;
