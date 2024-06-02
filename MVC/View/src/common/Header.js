import {Component} from "react";
import './Header.css';
import data from "./headerFooter.json";
import logo from "../media/two.png";
import {Link } from "react-router-dom";
import React from 'react';



export default class Header extends Component 
{
    render() { 
        let headerArr = data['header'];
        let connected = data['header2'];
        
        if(data["isLoggedIn"]===1){
            connected = data['header1'];
        }
        
        return(
        <div id="menu"><ul >
            <Link to="/Home"><li class="imge"><img id="logo" alt="logo" src={logo}></img></li></Link>
            {
            headerArr.map((item) =>(
                <li>
                <Link to= {item.url}>{item.name}</Link>
                </li>))
            }
            {
            connected.map((item) =>(
                <li id="connected">
                <Link to= {item.url}>{item.name}</Link>
                </li>))

            }
              </ul></div>);
    }
}
         
