import {Component} from "react";
import '../style/Register.css';



export default class Register extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
         this.pageName = "Register";
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/Register")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data }))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
      

    render(){
        const { data } = this.state;
        const inputsRegister = data.filelds;
        const passwordInputs = data.password;

    if (!data) {
      return <div>Loading...</div>; }
        
        return(
            <div id="contentR">
                <p className="titleR">{data.header1}</p>
                <div id="containerR">
                    <form id="formR">
                    {inputsRegister.map((item) =>(
                    <input className={item.className} type={item.type} name={item.name}
                     placeholder={item.placeholder}></input>))}
                    <div id="pass">
                    {passwordInputs.map((item) =>(
                    <input className={item.className} type={item.type} name={item.name}
                     placeholder={item.placeholder}></input>))}
                    </div>
                    </form>  

                    <button id="registerR">{data.button1txt}</button>
                    <p id="titleR">{data.secondWay2Register}</p>
                    <button id="googleRegisterR">{data.button2txt}</button>
                </div>
            </div>
        );
    }
}
