import {Component} from "react";
import './Footer.css';
import data from "./headerFooter.json";


export default class Footer extends Component 
{
    render()
        {
            return( 
            <p id="footerText">{data["footer"]["text"]}</p>
            );
        }
}
