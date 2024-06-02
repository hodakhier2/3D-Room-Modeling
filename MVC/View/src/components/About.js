
import {Component} from "react";
import '../style/About.css';
import first from "../media/yellow chair.jpg";
import second from "../media/img2.jpg";
import third from "../media/img1.jpg";
import {Link } from "react-router-dom";

    
export default class About extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/About")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data}))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
    render(){
    const { data } = this.state;

    if (!data) {
      return <div>Loading...</div>; 
    }
        
        return( 
            <div id="contentA">
                <div id="titles">
                <p class="title1">{data.title1}</p>
                <p class="title2">{data.title2}</p>
                </div>
                <div class="pairA">
                    <p class="txt">{data.txt1}</p>
                    <img class="imgA" src={first}></img>
                </div>
                <div class="pairA">
                    <img id="imgAMid" src={second}></img>
                    <p id="txtMid">{data.txtMid}</p>
                 
                </div>
                <div class="pairA">
                    <p class="txt">{data.txt2}</p>
                    <img class="imgA" src={third}></img>
                </div>
                <Link to="/Service"><button id="startP">{data.buttonTxt}</button></Link>
            </div>
        );
    }}