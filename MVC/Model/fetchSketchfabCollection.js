const https = require('https');

const SKETCHFAB_API_TOKEN = '83a4f05bda8f4b1c88305294142ca93e';

const fetchCollectionModels = (collectionId) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.sketchfab.com',
      path: `/v3/collections/${collectionId}/models`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${SKETCHFAB_API_TOKEN}`
      }
    };

    const req = https.request(options, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      // Process response once it is complete
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed to fetch models: ${res.statusCode}`));
        }
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.end();
  });
};

module.exports = { fetchCollectionModels };
