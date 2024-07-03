
import {Component} from "react";
import '../style/About.css';
import first from "../media/yellow chair.jpg";
import second from "../media/img2.jpg";
import third from "../media/img1.jpg";
import {Link } from "react-router-dom";

    
export default class About extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      error: null
    };
  }
  componentDidMount() {
    const pageId = 2;
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
      // Parse the pageContent field
      data.pageContent = JSON.parse(data.pageContent);
      this.setState({ page: data });
  })
  .catch(error => {
      this.setState({ error });
      console.error('There was a problem with the fetch operation:', error);
  });
}
    render(){
      const { page, error } = this.state;

      if (error) {
          return <div>Error: {error.message}</div>;
      }

      if (!page) {
          return <div>Loading...</div>;
      }
        return( 
            <div id="contentA">
                <div id="titles">
                <p class="title1">{page.pageContent.title1}</p>
                <p class="title2">{page.pageContent.title2}</p>
                </div>
                <div class="pairA">
                    <p class="txt">{page.pageContent.txt1}</p>
                    <img class="imgA" src={first}></img>
                </div>
                <div class="pairA">
                    <img id="imgAMid" src={second}></img>
                    <p id="txtMid">{page.pageContent.txtMid}</p>
                 
                </div>
                <div class="pairA">
                    <p class="txt">{page.pageContent.txt2}</p>
                    <img class="imgA" src={third}></img>
                </div>
                <Link to="/Service"><button id="startP">{page.pageContent.buttonTxt}</button></Link>
            </div>
        );
    }}