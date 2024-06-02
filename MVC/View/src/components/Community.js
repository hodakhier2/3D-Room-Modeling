import {Component} from "react";
import '../style/Community.css';
import likeIcon from "../media/heart.png";
import shareIcon from "../media/share.png";


export default class Community extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          data: ""
        };
      }
      componentDidMount() {
        fetch("http://localhost:3001/data/Community")
          .then((res) => res.json())
          .then((data) => this.setState({ data: data}))
          .catch((err) => {
            console.log("Error occurred", err);
          });
      }
    render()
        {
            const { data } = this.state;

            if (!data) {
                return <div>Loading...</div>; // Display loading indicator while fetching data
                }
            return(
            <>
                <div id="CommunityContent">
                <div id="head"><p id="communityHeaderTxt">Inspiration Hub: Show Your Style</p></div>
                </div>

                <div id="communityContainer">
                    
                    <div className="postC">
                        <a className="posterName">@AAA</a>
                        <div id="thePost"></div>
                        <div id="likesAndShares">
                        <div id="likes"><img id="heart" src={likeIcon} alt="like"></img></div>
                        <p id="likesNum">50</p>
                        <div id="shares"><img id="arrow" src={shareIcon} alt="share"></img></div>
                        </div>
                    </div>

                    <div className="postC">
                        <a className="posterName">@AAA</a>
                        <div id="thePost"></div>
                        <div id="likesAndShares">
                        <div id="likes"><img id="heart" src={likeIcon} alt="like"></img></div>
                        <p id="likesNum">50</p>
                        <div id="shares"><img id="arrow" src={shareIcon} alt="share"></img></div>
                        </div>
                    </div>

                    <div className="postC">
                        <a className="posterName">@AAA</a>
                        <div id="thePost"></div>
                        <div id="likesAndShares">
                        <div id="likes"><img id="heart" src={likeIcon} alt="like"></img></div>
                        <p id="likesNum">50</p>
                        <div id="shares"><img id="arrow" src={shareIcon} alt="share"></img></div>
                        </div>
                    </div>

                </div>
            </>
            );
        }
}