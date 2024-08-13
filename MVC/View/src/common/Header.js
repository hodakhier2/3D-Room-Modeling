import React, { Component } from 'react';
import './Header.css';
import logo from "../media/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from '../components/AuthContext';

class Header extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      headerArr: [],
      prevLogged : "false",
    };
  }

  componentDidMount() {
    const { isLogged } = this.context;
    this.fetchHeaderData(isLogged);
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { isLogged } = this.context;

    if (isLogged !== prevState.prevLogged) {
      this.setState({ prevLogged: isLogged });
      this.fetchHeaderData(isLogged);
    }
  }

  fetchHeaderData(isLoggedIn) {
    if (isLoggedIn != null) {
      fetch('http://localhost:3001/getHeaderFooter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isLoggedIn })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Raw JSON content:", data.content);
          const parsedContent = JSON.parse(data.content);
          this.setState({
            headerArr: parsedContent.header,
          });
        })
        .catch(error => console.error('Error fetching header/footer data:', error));
    }
  }

  render() {
    const { isLogged } = this.context;
    const { prevLogged } = this.state;
    console.log("Context current logged status:" , isLogged);
    console.log("Prev current logged status:" , prevLogged);

    let firstArray = [];
    let secondArray = [];
    
    const {headerArr} = this.state;
    console.log("header now: ",headerArr);

    if (isLogged === "true") {
      firstArray = headerArr.slice(-1); // last element
      secondArray = headerArr.slice(0, -1); // all but the last element
    } else {
      firstArray = headerArr.slice(-2); // last two elements
      secondArray = headerArr.slice(0, -2); // all but the last two elements
    }


    return (
      <div id="menu">
        <ul>
          <Link to="/Home"><li className="imge"><img id="logo" alt="logo" src={logo}></img></li></Link>
          {
            secondArray.map((item) => (
              <li key={item.pageId}>
                <Link to={item.url}>{item.name}</Link>
              </li>))
          }
          {
            firstArray.map((item) => (
              <li key={item.pageId} id="connected">
                <Link to={item.url}>{item.name}</Link>
              </li>))
          }
        </ul>
      </div>
    );
  }
}

export default Header;
