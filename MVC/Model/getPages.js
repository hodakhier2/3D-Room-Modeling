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


    function getHeaderFooter(loggedin)
    {
      return new Promise((resolve, reject) => 
        {
          const query = `SELECT content FROM headerfooter WHERE logged = ?`;
      
        db.query(query, [loggedin], (err, results) => {
          if (err) {
            console.error("Error", err);
            reject(err);
          }
          else{
            console.log("Header from model",results);
            resolve(results[0]);
          }
          });})

    }

 
module.exports = {getPage, getHeaderFooter};

  