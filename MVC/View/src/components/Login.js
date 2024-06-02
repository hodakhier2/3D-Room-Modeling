import {Component} from "react";
import '../style/Login.css';
import {Link } from "react-router-dom";



export default class Login extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/Login")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data}))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
    render(){
        const { data } = this.state;
        const inputsArr = data.filelds;

    if (!data) {
      return <div>Loading...</div>; }
        
        return(
            <div id="contentL">
                <p className="titleL">{data.text1}</p>
                <div id="containerL">
                <form id="formL">
                    {inputsArr.map((item) =>(
                    <input className={item.className} type={item.type} name={item.name}
                     placeholder={item.placeholder}></input>))}
                    <button id="loginL">{data.button1txt}</button>
                    <p id="titleL">{data.secondWay2Login}</p>
                    <button id="googleLogin">{data.button2txt}</button>
                    <Link to="/Register" className="registerLink"><a className="registerLink">{data.registerTxt}</a></Link>
                </form>
                
                </div>
            </div>
        );
    }
}
