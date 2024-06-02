import {Component} from "react";
import '../style/ContactUs.css';

export default class ContactUs extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/ContactUs")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data }))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
    render(){
        const { data } = this.state;

    if (!data) {
      return <div>Loading...</div>; }
      
        
        //const contactUsData = data.ContactUs;
        const contactUsInputs = data.inputs;
        return(
            <div id="contentCU">
                <p className="titleCU">{data.titleCU}</p>
                <div id="containerCU">
                <form id="formCU">
                {contactUsInputs.map((item) =>(
                    <input className={item.className} type={item.type} name={item.name}
                     placeholder={item.placeholder}></input>))}
                    <p id="text2CU">{data.text2CU}</p>     
                    <textarea id="descriptionCU" ></textarea>          
                </form>
                </div>
                <button id="sendButton">{data.sendText}</button>
            </div>
        );
    }
}
