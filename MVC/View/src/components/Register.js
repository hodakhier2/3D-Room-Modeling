import {Component} from "react";
import '../style/Register.css';
import {useNavigate } from "react-router-dom";


class Register extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      inputs: [],
      error: null,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password1: "",
      password2: ""
    };
  }
  componentDidMount() {
    const formId = 2;

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

  const { firstName, lastName, email,phone, password1, password2 } = this.state;
  if(phone.length === 10)
  {
    if(password1 && password2)
    {
      if(password1 === password2)
      {
        let password = password1;
        fetch('http://localhost:3001/userInput/Register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstName, lastName, email, phone, password})
        })
        .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
          }
          return response.json(); 
      })
      .then(data => {
        if (data > 0) {
          //alert('Great, registered !');
          this.props.navigate('/Service'); // Directing to service page
        }
      })
      .catch(error => {
        alert('User already existed, try logging in :)', error);
      });}

      else{
        alert("Passwords doesn't match");
      }
    }
    else{
      alert("Password fields are mandatory");
    }
  }
  else{
    alert("Phone number must be 10 digits");
  }
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
                    <form id="formR" onSubmit={this.handleSubmit}>
                    {otherInputs.map((item) =>(
                    <input className={item.className} type={item.type} name={item.name}
                     placeholder={item.placeholder} onChange={this.handleInputChange}></input>))}
                     <div id="pass">
                    {passwordInputs.map((item) =>(
                    <input className={item.className} type={item.type} name={item.name}
                     placeholder={item.placeholder} onChange={this.handleInputChange}></input>))}
                    </div>
                    <button type="submit" id="registerR" >{page.formContent.button1txt}</button>
                    </form>  

                    
                </div>
            </div>
        );
    }
}

function RegisterWithNavigate(props) {
  const navigate = useNavigate();
  return <Register {...props} navigate={navigate} />;
}

export default RegisterWithNavigate;

