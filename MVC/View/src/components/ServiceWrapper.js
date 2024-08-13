import React from 'react';
import Service from "./Service";
import { useLocation } from 'react-router-dom';


function ServiceWrapper(props) {
    const location = useLocation();
    console.log("ServiceWrapper: location.state:", location.state);
    return <Service {...props} location={location} />;
  }
  
  export default ServiceWrapper;
  