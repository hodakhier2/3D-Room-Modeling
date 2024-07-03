const express = require("express");
const cors = require('cors');
const getForm = require('../../Model/getForms');
const getPage = require('../../Model/getPages');
const getUser = require('../../Model/getUser');
const { fetchCollectionModels } = require('../../Model/fetchSketchfabCollection');


const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());


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

// Route to fetch a form and its input fields by form ID
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


// Route to fetch Sketchfab collection by ID
app.post('/sketchfab/collection', async (req, res) => {
  const { collectionId } = req.body;
  if (!collectionId) {
    return res.status(400).send({ error: 'Collection ID is required' });
  }
  try {
    const data = await fetchCollectionModels(collectionId);
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch models from Sketchfab collection' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
