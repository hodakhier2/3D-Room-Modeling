import {Component} from "react";
import '../style/Service.css';
import Room from "./Room";


export default class Service extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/Service")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data }))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
    render()
        {
            const { data } = this.state;
            const myOptions  = data.options;
            const itemsArray = data.itemPairs;
    
        if (!data) {
          return <div>Loading...</div>; }
            
            return( 
                <div id="contentS">
                    <div id="leftS">
                        <div id="ContainsSer">
                        <p class="temname">{data.TemplateName}</p>
                        
                        
                        <button id="saving">{data.savingButton}</button>
                        <button id="posting">{data.publishButton}</button>
                        </div>
                        
                        <div class="threeD">{Room(2,5,6)}</div>
                        <h6 class="measures">{data.measures}</h6>
                    </div>
        
                    <div id="rightS">
                        <select id="selection">
                        {myOptions.map((item) =>(
                        <option value={item.value}>{item.name}</option>))}
                        </select>
                    
                        <div class="containerS">
                            <div class="pairS">
                            {itemsArray.map((item) =>(
                            <p class="itm">{item.name}</p>))}
                            </div>
                        </div>
                    
                        <button class="uploadButton">{data.uploadButtonTxt}</button>
                        <hr class="secondLine"></hr>
                        <p class="itemPreviewTxt">{data.itemPreviewTxt}</p>
                        <div class="preview"></div>
                    </div>
                </div>
            );
        }
}
