const db = require('./db');

function getPage(pageId){
  return new Promise((resolve, reject) => 
  {
    const query = `SELECT * FROM pages WHERE pageId = ?`;

  db.query(query, [pageId], (err, results) => {
    if (err) {
      console.error("Error", err);
      reject(err);
    }
    else{
      console.log("Success",results);
      resolve(results);
    }
    });})}

 
module.exports = {getPage};

  