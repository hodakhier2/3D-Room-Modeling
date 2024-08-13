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


function insertUser(firstName, lastName, email,phone, password){
     
  return new Promise((resolve, reject) => 
  {
    const query = `INSERT INTO users (FirstName, LastName, Email, Phone, Password) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [firstName, lastName, email, phone, password], (err, results) => {
    if (err) {
      console.error("Error", err);
      reject(err);
    }
    else{
      console.log("Query results", results);
      resolve(results);
    }
})})}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE Email = ?`;
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
function getUserById(userId) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE UserId = ?`;
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function insertGoogletUser(firstName, lastName, email, phone) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO users (FirstName, LastName, Email, Phone) VALUES (?, ?, ?, ?)`;
    db.query(query, [firstName, lastName, email, phone], (err, results) => {
      if (err) {
        console.error("Error", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

 
module.exports = {getUser, insertUser, getUserByEmail, insertGoogletUser, getUserById};

  