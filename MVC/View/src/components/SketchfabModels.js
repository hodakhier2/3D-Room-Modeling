import React, { Component } from 'react';

export default class SketchfabModels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCollectionModels();
  }

  fetchCollectionModels = async () => {
    const collectionId = '4918a173a36f46d4827550ae82b85214'; 
    try {
      const response = await fetch('http://localhost:3001/sketchfab/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collectionId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ models: data.results });
    } catch (error) {
      this.setState({ error });
      console.error('Error fetching collection models:', error);
    }
  };

  render() {
    const { models, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
        <div>
          {models.map(model => (
            <div key={model.uid}>
              <iframe
                title={model.name}
                src={`https://sketchfab.com/models/${model.uid}/embed`}
                allow="autoplay; fullscreen; vr"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
              ></iframe>
            </div>
          ))}
        </div>
    );
  }
}
