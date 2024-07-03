import {Component} from "react";
import '../style/Service.css';
import RoomContainer from "./RoomContainer";
import SketchfabModels from "./SketchfabModels";


export default class Service extends Component 
{
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      error: null
    };
  }
  componentDidMount() {
    const pageId = 5;

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
render() { 
  const { page, error } = this.state;

  if (error) {
      return <div>Error: {error.message}</div>;
  }

  if (!page) {
      return <div>Loading...</div>;
  }

    return( 
        <div id="contentS">
            <div id="leftS">
                <div id="ContainsSer">
                    <p class="temname">{page.pageContent.TemplateName}</p>
                    <button id="saving">{page.pageContent.savingButton}</button>
                    <button id="posting">{page.pageContent.publishButton}</button>
                </div>     
            <div class="threeD"><RoomContainer></RoomContainer></div>
        </div>
        
        <div id="rightS">
            <select id="selection">
            {page.pageContent.options.map((item) =>(
            <option value={item.value}>{item.name}</option>))}
            </select>
                    
            <div class="containerS">
                <div class="pairS">
                    <div className="itm"><SketchfabModels></SketchfabModels></div>
                </div>
            </div>
        </div>
        </div>
            );
        }
}
///<button class="uploadButton">{page.pageContent.uploadButtonTxt}</button>
/*  <hr class="secondLine"></hr>
                        <p class="itemPreviewTxt">{page.pageContent.itemPreviewTxt}</p>
                        <div class="preview"></div>*/