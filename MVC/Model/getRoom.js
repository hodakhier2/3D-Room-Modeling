const db = require('./db');

function saveRoomConfiguration(userId, roomName, roomMeasures, floorColor, wallColors, droppedModels) {
  return new Promise((resolve, reject) => {
    const roomQuery = `
      INSERT INTO room (userId, roomName, height, width, depth, floor, rightWall, backWall, leftWall, posted, likes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)
    `;
    const roomValues = [
      userId,
      roomName,
      roomMeasures.height,
      roomMeasures.width,
      roomMeasures.depth,
      floorColor,
      wallColors.rightWall,
      wallColors.backWall,
      wallColors.leftWall
    ];

    console.log('roomVlues from Model:', roomValues);

    db.query(roomQuery, roomValues, (err, result) => {
      if (err) {
        console.error("Error saving room", err);
        return reject(err);
      }

      const roomId = result.insertId;
      const furnitureQueries = droppedModels.map(model => {
        if (!model.position || model.position.x === undefined || model.position.y === undefined || model.position.z === undefined) {
          console.error("Model position is undefined", model);
          return Promise.reject(new Error("Model position is undefined"));
        }

        const furnitureQuery = `
          INSERT INTO furniture (roomId, itemId, positionx, positiony, positionz)
          VALUES (?, ?, ?, ?, ?)
        `;
        const furnitureValues = [roomId, model.id, model.position.x, model.position.y, model.position.z];

        return new Promise((resolve, reject) => {
          db.query(furnitureQuery, furnitureValues, (err, result) => {
            if (err) {
              console.error("Error saving furniture", err);
              return reject(err);
            }
            resolve(result);
          });
        });
      });

      Promise.all(furnitureQueries)
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  });
}


function getRoomByUserId(userId)
{
  return new Promise((resolve, reject) => 
    {
      const query = `SELECT * FROM room WHERE userId = ?`;
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error", err);
        reject(err);
      }
      else{
        console.log("Room recieved",results);
        resolve(results);
      }
      });})
}

function getRoomByRoomId(roomId)
{
  return new Promise((resolve, reject) => 
    {
      const query = `SELECT * FROM room INNER JOIN furniture ON room.roomId = furniture.roomId WHERE room.roomId = ?`;
  
    db.query(query, [roomId], (err, results) => {
      if (err) {
        console.error("Error", err);
        reject(err);
      }
      else{
        console.log("Room Configs recieved",results);
        resolve(results);
      }
      });})
}

function updatePostedByRoomId(roomId)
{
  return new Promise((resolve, reject) => 
    {
      const query = `UPDATE room SET posted = 1 WHERE roomId = ?`;
  
    db.query(query, [roomId], (err, results) => {
      if (err) {
        console.error("Error", err);
        reject(err);
      }
      else{
        console.log("posted flag updated",results);
        resolve(results);
      }
      });})
}

module.exports = { saveRoomConfiguration, getRoomByUserId, getRoomByRoomId, updatePostedByRoomId };
