import {Component} from "react";
import '../style/Register.css';


export default class Register extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      inputs: [],
      error: null
    };
  }
  componentDidMount() {
    const formId = 2;

  console.log('Fetching form data...');

  fetch(`http://localhost:3001/forms/${formId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }})

    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok for inputs');
      }
      return response.json();
    })
    .then(data => {
      data.formContent = JSON.parse(data.formContent);
      this.setState({ page: data, inputs: data.inputs });
    })
    .catch(error => {
      this.setState({ error });
      console.error('There was a problem with the fetch operations:', error);
    });
}

render() { 
  const { page, inputs, error } = this.state;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!page || inputs.length === 0) {
    return <div>Loading...</div>;
  }
  const passwordInputs = inputs.filter(input => input.name === 'password1' || input.name === 'password2');
  const otherInputs = inputs.filter(input => input.name !== 'password1' && input.name !== 'password2');

  return(
    <div id="contentR">
      <p className="titleR">{page.formContent.header1}</p>
      <div id="containerR">
        <form id="formR">
          {otherInputs.map((item) =>(
          <input className={item.className} type={item.type} name={item.name}
          placeholder={item.placeholder}></input>))}
          <div id="pass">
            {passwordInputs.map((item) =>(
            <input className={item.className} type={item.type} name={item.name}
            placeholder={item.placeholder}></input>))}
          </div>
        </form>  

        <button id="registerR">{page.formContent.button1txt}</button>
        <p id="titleR">{page.formContent.secondWay2Register}</p>
        <button id="googleRegisterR">{page.formContent.button2txt}</button>
        </div>
    </div>
        );
    }
}
