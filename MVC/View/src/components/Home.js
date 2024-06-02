import {Component} from "react";
import '../style/Home.css';
import image from "../media/img 4.jpg";
import {Link } from "react-router-dom";


export default class Home extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/Home")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data }))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
    render() { 
        const { data } = this.state;
        //const homeData = data["Home"];

    if (!data) {
      return <div>Loading...</div>; }
        return(
            <div id="contentH">
                <div id="leftH">
                    <p id="txt1">{data.txt1}</p>
                    <p id="txt2">{data.txt2}</p>
                    <Link to="/Service"><button id="HomeB">{data.buttonTxt}</button></Link>
                </div>
                <div id="rightH">
                    <img src={image}></img>
                </div>
            </div>
        );}
}

