import {Component} from "react";
import '../style/Home.css';
import image from "../media/img 4.jpg";
import {Link } from "react-router-dom";


export default class Home extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          page: null,
          error: null
        };
      }
      componentDidMount() {
        const pageId = 1;
        console.log('Fetching page data...');

        fetch(`http://localhost:3001/pages/${pageId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
        console.log('Page data received:', data);
          // Parse the pageContent field
          data.pageContent = JSON.parse(data.pageContent);
          this.setState({ page: data });
      })
      .catch(error => {
          this.setState({ error });
          console.error('There was a problem with the fetch operation:', error);
      });
}
    render() { 
      const { page, error } = this.state;

      if (error) {
          return <div>Error: {error.message}</div>;
      }

      if (!page) {
          return <div>Loading...</div>;
      }

        return(
            <div id="contentH">
                <div id="leftH">
                    <p id="txt1">{page.pageContent.txt1}</p>
                    <p id="txt2">{page.pageContent.txt2}</p>
                    <Link to="/Service"><button id="HomeB">{page.pageContent.buttonTxt}</button></Link>
                </div>
                <div id="rightH">
                    <img src={image}></img>
                </div>
            </div>
        );}
}

