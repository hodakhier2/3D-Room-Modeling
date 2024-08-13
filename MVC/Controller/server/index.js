const express = require("express");
const cors = require('cors');
const getForm = require('../../Model/getForms');
const getPage = require('../../Model/getPages');
const getUser = require('../../Model/getUser');
const { fetchCollectionModels } = require('../../Model/fetchSketchfabCollection');
const getRoom = require('../../Model/getRoom');


const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());


//Route to get header and footer
app.post('/getHeaderFooter', async (req, res) => {
  const { isLoggedIn } = req.body;

  try {
     let logged = 0;
     if(isLoggedIn === "true")
     {
      logged = 1;
     }
      const headerFooter = await getPage.getHeaderFooter(logged);
      if(headerFooter) {
        res.send(headerFooter);
        console.log("HeaderFooter recieved from Model");
      }
      else{
        console.log("Data Not Found");
        res.status(404).send({error: 'Data Not Found' });
      }
    }
    catch (error){
      console.log("Failed to fetch HeaderFooter");
      res.status(500).send({ error: 'Failed to fetch HeaderFooter' });
    }
  });
  
// Route to fetch a single page by ID
app.post('/pages/:id', async(req, res) => {
  const pageId = req.params.id;
  try{
    const pagedata = await getPage.getPage(pageId);
    if(pagedata) {
      res.send(pagedata[0]);
      console.log("Data recieved from Model");
    }
    else{
      console.log("Page Not Found");
      res.status(404).send({error: 'Page Not Found' });
    }
  }
  catch (error){
    console.log("Failed to fetch page");
    res.status(500).send({ error: 'Failed to fetch page' });
  }
});

app.post('/forms/:id', async(req, res) => {
  const formId = req.params.id;
  try{
    const formdata = await getForm.getForm(formId);
    if(formdata) {
      res.send(formdata);
      console.log("Data recieved from Model");
    }
    else{
      console.log("Form Not Found");
      res.status(404).send({error: 'Form Not Found' });
    }
  }
  catch (error){
    console.log("Failed to fetch form");
    res.status(500).send({ error: 'Failed to fetch form' });
  }
});

// Route to fetch user data / Login
app.post('/userInput/Login', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userData = await getUser.getUser(email, password);
    console.log(userData);
    if (userData.length > 0) {
      res.json(userData); 
      console.log("User data received");
    } else {
      console.log("User Not Found");
      res.status(404).json({ error: 'User Not Found' });
    }
  } catch (error) {
    console.log("Failed to fetch data");
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

//Route to fetch user data by id
app.post('/getUserById', async(req, res) => {
  const userId = req.body.userId;
  try {
    const userData = await getUser.getUserById(userId);
    console.log(userData);
    if (userData.length > 0) {
      res.json(userData); 
      console.log("User data received");
    } else {
      console.log("User Not Found");
      res.status(404).json({ error: 'User Not Found' });
    }
  } catch (error) {
    console.log("Failed to fetch data");
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to insert user data / Register
app.post('/userInput/Register', async(req, res) => {
  const {firstName, lastName, email,phone, password} = req.body;
  try {
    const result = await getUser.insertUser(firstName, lastName, email,phone, password);
    if (result.affectedRows > 0) {
      res.json(result.affectedRows); 
      console.log("User added");
    } 
    } 
    catch (error) 
    {
      console.log("User insertion failed");
      res.status(500).json({ error: 'User insertion failed' });
    }
});


// Route to fetch specific models from multiple collections
app.post('/sketchfab/specific-models', async (req, res) => {
  const { modelsToFetch } = req.body;
  
  if (!modelsToFetch || !Array.isArray(modelsToFetch)) {
    return res.status(400).send({ error: 'Invalid request data' });
  }

  try {
    const specificModels = await Promise.all(modelsToFetch.map(async ({ collectionId, modelId }) => {
      const collectionData = await fetchCollectionModels(collectionId);
      const model = collectionData.results.find(m => m.uid === modelId);
      if (model) {
        return {
          uid: model.uid,
          name: model.name,
          thumbnail_url: model.thumbnails.images[0]?.url,
          embedUrl: model.embedUrl,
        };
      }
      return null;
    }));

    res.json(specificModels.filter(model => model !== null));
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch specific models' });
  }
});

// Insert google logged in user
app.post('/userInput/googleLogin', async (req, res) => {
  let { firstName, lastName, email, phone } = req.body;
  console.log('from Controller:',firstName, lastName, email, phone);
  if(phone === null)
  {
    phone = 1111111111;
  }
  try {
    const existingUser = await getUser.getUserByEmail(email);
    if (existingUser.length > 0) {
      console.log("User already exists:", existingUser);
      res.json(existingUser[0]);
    } else {
      const result = await getUser.insertGoogletUser(firstName, lastName, email, phone);
      if (result.affectedRows > 0) {
        console.log("User added:", result);
        res.json({ message: 'User added', user: { firstName, lastName, email,phone } });
      } else {
        res.status(500).json({ error: 'Failed to add user' });
      }
    }
  } catch (error) {
    console.error("Failed to handle Google login", error);
    res.status(500).json({ error: 'Failed to handle Google login' });
  }
});


// Route to save room configuration
app.post('/saveRoom', async (req, res) => {
  const { userId, roomName, roomMeasures, floorColor, wallColors, droppedModels } = req.body;
  try {
    const result = await getRoom.saveRoomConfiguration(userId, roomName, roomMeasures, floorColor, wallColors, droppedModels);
    res.json({ message: 'Room configuration saved successfully', result });
  } catch (error) {
    console.log("Room configuration saving failed");
    res.status(500).json({ error: 'Room configuration saving failed', details: error });
  }
});


// Route to fetch room info by user id
app.post('/getRoom', async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await getRoom.getRoomByUserId(userId);
    res.json(result);
    console.log('Room info fetched successfully', result);
  } catch (error) {
    console.log("Room info saving failed");
    res.status(500).json({ error: 'Room info saving failed', details: error });
  }
});

// Route to post room 
app.post('/postRoom', async (req, res) => {
  const { roomId} = req.body;
  try {
    const result = await getRoom.updatePostedByRoomId(roomId);
    res.json(result);
    console.log('posted flag is 1 now', result);
  } catch (error) {
    console.log("Error updating posted");
    res.status(500).json({ error: 'Error updating posted', details: error });
  }
});

// Route to fetch room configuration by user id
app.post('/getRoomConfigs', async (req, res) => {
  const { roomId } = req.body;
  try {
    const result = await getRoom.getRoomByRoomId(roomId);
    res.send(result);
    console.log('Room configurations fetched successfully', result);
  } catch (error) {
    console.log("Room configuration fetching failed");
    res.status(500).json({ error: 'Room configuration fetching failed', details: error });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
