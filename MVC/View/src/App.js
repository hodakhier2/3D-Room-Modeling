import './App.css';
//import React from 'react';
import './index.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './common/Header.js';
import Footer from './common/Footer.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Service from './components/Service.js';
import About from './components/About.js';
import Community from './components/Community.js';
import Register from './components/Register.js';
import ContactUs from './components/ContactUs.js';
import NoPage from './components/NoPage.js';



function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <Header></Header>
   
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Service" element={<Service />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<NoPage />} />
        </Routes>

    <Footer></Footer>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
