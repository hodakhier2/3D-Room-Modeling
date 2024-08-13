import { Component } from "react";
import '../style/Profile.css';
import profilePic from "../media/profile pic.jpg";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from '../components/AuthContext';


export class Profile extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                Email: "",
                FirstName: "",
                LastName: "",
                Password: "",
                Phone: "",
                Role : null,
                UserId :null,
            },
            userDesigns: [1,2,3],
            roomConfigs : {
                roomId : null,
                userId : null,
                roomName : "",
                height: null,
                width : null,
                depth : null,
                floor : "",
                rightWall : "",
                backWall : "",
                leftWall : "",
                posted : null,
                likes : null
            },
            myModels : [],
            error: null
        };
        this.fetchUserById = this.fetchUserById.bind(this);
        this.fetchUserRoomsById = this.fetchUserRoomsById.bind(this);
        this.fetchSelectedRoom = this.fetchSelectedRoom.bind(this);
    }

    componentDidMount(){
        const {userId} = this.context;
        console.log("user id sent:", userId);
        this.fetchUserById(userId);
        this.fetchUserRoomsById(userId);
    }

    fetchUserById(userId)
    {
        fetch('http://localhost:3001/getUserById', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
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
                this.setState({ userData : data[0]});
              console.log("Profile: user info:" , this.state.userData);
            } else {
              alert('Invalid username or password');
            }
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('User not found');
          });
    }

    fetchUserRoomsById(userId)
    {
        fetch('http://localhost:3001/getRoom', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); 
          })
          .then(data => {
            console.log(data); 
            this.setState({ userDesigns : data});
            console.log("Profile: user rooms:" , this.state.userDesigns);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('User not found');
          });
    }

    fetchSelectedRoom(roomId){
        console.log("selected room id: ", roomId);
        fetch('http://localhost:3001/getRoomConfigs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ roomId })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); 
          })
          .then(data => {
            console.log("Retrieved room configs: ", data);
        
            if (data.length > 0) {  // Check if data is not empty
                const roomData = {
                    roomId: data[0].roomId,
                    userId: data[0].userId,
                    roomName: data[0].roomName,
                    height: data[0].height,
                    width: data[0].width,
                    depth: data[0].depth,
                    floor: data[0].floor,
                    rightWall: data[0].rightWall,
                    backWall: data[0].backWall,
                    leftWall: data[0].leftWall,
                    posted: data[0].posted,
                    likes: data[0].likes
                };
        
                const Models = data.map(config => ({
                    itemId: config.itemId,
                    positionx: config.positionx,
                    positiony: config.positiony,
                    positionz: config.positionz
                }));
        
                 // Log roomData and Models before navigation
            console.log("Navigating with roomData: ", roomData);
            console.log("Navigating with Models: ", Models);

            this.setState({ 
                roomConfigs: roomData,
                myModels: Models
            }, () => {  // Callback after setState
                this.props.navigate('/Service', {
                    state: {
                        roomConfigs: roomData,
                        myModels: Models,
                    },
                });
            });

            } else {
                console.error("No room data found.");
            }})

            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('User not found');
          });
    }
    

    render() {
        const { userData, userDesigns, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div id="profileContent">
                <div className="up">
                    <div id="profileHeader">
                        <img id="profilePic" src={profilePic} alt="Profile"/>
                        <div id="profileInfo">
                            <p>{userData.FirstName} {userData.LastName}</p>
                        </div>
                    </div>
                    <div className="rightP">
                        <div id="contactInfo">
                            <h3>Full name</h3>
                            <p>{userData.FirstName} {userData.LastName}</p>
                            <h3>Phone number</h3>
                            <p>{userData.Phone}</p>
                            <h3>Email</h3>
                            <p>{userData.Email}</p>
                        </div>
                        <button id="editButton">Edit</button>
                    </div>
                </div>
                
                <div id="designSection">
                    <h2 className="headerDesigns">Your designs</h2>
                    <div id="designGrid">
                        {userDesigns.map((design, index) => (
                            <div key={index} className="designBox">
                                <div className="designActions">
                                    <p className="roomName" onClick={() => this.fetchSelectedRoom(design.roomId)}>{design.roomName}</p>
                                    <span className="likeCount">❤ {design.likes}</span>
                                </div>  
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

// Wrap Profile with navigate
function ProfileWithNavigate(props) {
    const navigate = useNavigate();
    return <Profile {...props} navigate={navigate} />;
  }
  
export default ProfileWithNavigate;
