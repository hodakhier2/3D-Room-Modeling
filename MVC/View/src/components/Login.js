import {Component} from "react";
import '../style/Login.css';
import {Link } from "react-router-dom";


export default class Login extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      inputs: [],
      error: null,
      email: '',
      password: '',
      message: '',
      loggedIn: 0
    };

  }

  componentDidMount() {
    const formId = 1;
    console.log('Fetching form data...');

    fetch(`http://localhost:3001/forms/${formId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

handleInputChange = (event) => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
}

handleSubmit = (event) => {
  event.preventDefault();

  const { email, password } = this.state;
  console.log('Login attempt:', { email, password }); // Debug log
  fetch('http://localhost:3001/userInput/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      console.log(data); 
      if (data && data.length > 0) {
        alert('Login successful');
      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      alert('User not found');
    });
}


render() { 
  const { page, inputs, error} = this.state;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!page || inputs.length === 0) {
    return <div>Loading...</div>;
  }

  return(
    <div id="contentL">
      <p className="titleL">{page.formContent.text1}</p>
      <div id="containerL">
        <form id="formL" onSubmit={this.handleSubmit}>
          {inputs.map((item) =>(
          <input className={item.className} type={item.type} name={item.name}
          placeholder={item.placeholder} onChange={this.handleInputChange}></input>))}
          <button type="submit" id="loginL">{page.formContent.button1txt}</button>
          <p id="titleL">{page.formContent.secondWay2Login}</p>
          <button id="googleLogin">{page.formContent.button2txt}</button>
          <Link to="/Register" className="registerLink"><a className="registerLink">{page.formContent.registerTxt}</a></Link>
        </form>
        </div>
    </div>
        );
    }
}
