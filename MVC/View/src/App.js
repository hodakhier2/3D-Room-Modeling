import './App.css';
import './index.css';
import React from "react";
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './common/Header.js';
import Footer from './common/Footer.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import ServiceWrapper from './components/ServiceWrapper.js';
import About from './components/About.js';
import Community from './components/Community.js';
import Register from './components/Register.js';
import ContactUs from './components/ContactUs.js';
import NoPage from './components/NoPage.js';
import {AuthProvider} from './components/AuthContext';



function App() {
  return (
    <div className='App'>
    <AuthProvider>
      <BrowserRouter>
    
    <Header></Header>
   
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Service" element={<ServiceWrapper />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<NoPage />} />
        </Routes>

    <Footer></Footer>
   
    </BrowserRouter>
     </AuthProvider>
    </div>
    
  );
}

export default App;
