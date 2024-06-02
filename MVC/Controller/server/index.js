// server/index.js
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const getRightPath = require(rightPath());


const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/data/:pageName', (req, res) => {
  const pageName = req.params.pageName;
  const filePath = getRightPath(pageName);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.status(500).json({ error: 'Failed to read data' });
        return;
      }
      var jsonData = JSON.parse(data);
      var relevantData = jsonData[pageName];
      res.json(relevantData);
    });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function rightPath() {
  return './rightPath';
}

