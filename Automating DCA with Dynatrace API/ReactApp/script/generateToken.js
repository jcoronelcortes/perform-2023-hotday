
const fs = require('fs');
const os = require('os');
const path = './.env';
const token = ''          /*<--- enter token here */;
const tenant = ''         /*<--- enter tenant here */;
let tokenJson = require('./jsonFiles/token/tokenGeneration.json')

const generateToken = async () => {
  if (fs.existsSync(path)) {
    console.log(
      '.env file already exists, please delete the file before you run this again.'
    );
  } else {
    try {
        const response = await fetch(`${tenant}/api/v1/tokens`, {
          method: 'post',
          body: JSON.stringify(tokenJson),
          headers: {
            Authorization: `Api-Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          fs.appendFile(
            './TOKEN.log',
            `${new Date().toISOString()} - Token generated via API. The token id is: ${
              data.token
            }` + os.EOL, 
            (err) => (err ? console.log(err) : '')
          );
          fs.appendFile(
            `${path}`,
            `TOKEN=${data.token}` + os.EOL, 
            (err) => (err ? console.log(err) : '')
          );
          console.log(`TOKEN: ${data.token} has been generated`);
          console.log('.env file has been generated.')
          console.log('Token has been logged in TOKEN.log.')
          fs.appendFile(
            `${path}`,
            `TENANT=${tenant}` + os.EOL, 
            (err) => (err ? console.log(err) : '')
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
  }

generateToken();
