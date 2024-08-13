import { Component } from "react";
import '../style/Login.css';
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../media/icons8-google-48.png";
import { auth, provider, signInWithPopup } from "../firebase";
import { AuthContext } from '../components/AuthContext';

class Login extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      page: null,
      inputs: [],
      error: null,
      email: '',
      password: '',
      isloggedIn: "false"
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
    const { login } = this.context;
    if(password && email)
    {
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
          console.log("Login view userid:" , data[0].UserId)
          login(data[0].UserId); // Save user ID in context
          this.props.navigate('/Service');
        } else {
          alert('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('User not found');
      });
    }
    else{
      alert('Email and password are mandatory');
    }
  }

  handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google login successful:", user);
        
       // Extract user information
      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1);

      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        phone: user.phoneNumber
        //photoURL: user.photoURL,
      };
         // Send user data to backend
      fetch('http://localhost:3001/userInput/googleLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log("google data test:",data);
        this.context.login(data.UserId); // Save user ID in context
        this.props.navigate('/Service');
    })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
    })
    .catch((error) => {
      console.error("Google login error:", error);
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

    return (
      <div id="contentL">
        <p className="titleL">{page.formContent.text1}</p>
        <div id="containerL">
          <form id="formL" onSubmit={this.handleSubmit}>
            {inputs.map((item) => (
              <input className={item.className} type={item.type} name={item.name}
                placeholder={item.placeholder} onChange={this.handleInputChange}></input>
            ))}
            <button type="submit" id="loginL">{page.formContent.button1txt}</button>
            <p id="titleL">{page.formContent.secondWay2Login}</p>
            <button type="button" id="googleLogin" onClick={this.handleGoogleLogin}>
              {page.formContent.button2txt} 
              <img className="googleIcon" src={googleIcon} alt="Logo"></img>
            </button>
            <Link to="/Register" className="registerLink">{page.formContent.registerTxt}</Link>
          </form>
        </div>
      </div>
    );
  }
}

function LoginWithNavigate(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginWithNavigate;
