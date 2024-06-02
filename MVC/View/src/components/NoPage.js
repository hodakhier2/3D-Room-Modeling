import React from 'react';
import {Component} from "react";


export default class NoPage extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data}))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
    render(){
        const { data } = this.state;

        if (!data) {
            return <div>Loading...</div>; }
              
              return(<h1>{data.text}</h1>);
     }}