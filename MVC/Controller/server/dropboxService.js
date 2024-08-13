const fetch = require('node-fetch');

const accessToken = 'sl.B5cr_vTgkz880QqisWJKs-gnGRg-5jQHDBjwtqMIJFDVL5titICD0WVJdgOHunGmfDr8PNhD3g926joTaLFfYouVD589lj-wWUAa-nRwtlhLlkdPbkNiyxdvNdr9oxP8AE0r9Rdyp6bPEpcXGjem';

async function getFileByPath(filePath) {
  const url = 'https://content.dropboxapi.com/2/files/download';
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Dropbox-API-Arg': JSON.stringify({ path: filePath }),
  };

  console.log('Making request to Dropbox API with headers:', headers);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
    });

    console.log('Received response with status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const fileData = await response.buffer();
    console.log('File data fetched successfully');
    return fileData;
  } catch (error) {
    console.error('Error fetching file from Dropbox:', error);
    throw error;
  }
}

module.exports = { getFileByPath };
