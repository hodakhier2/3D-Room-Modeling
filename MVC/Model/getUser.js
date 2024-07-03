const db = require('./db');

function getUser(email,password){
     
  return new Promise((resolve, reject) => 
  {
    const query = `SELECT * FROM users WHERE Email = ? AND Password = ?`;

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error", err);
      reject(err);
    }
    else{
      console.log("Query results", results);
      resolve(results);
    }
})})}
 
module.exports = {getUser};

  