let browserMon = require('./jsonFiles/synthetic/browserMon.json');
let httpMon = require('./jsonFiles/synthetic/httpMon.json');
let httpMonFail = require('./jsonFiles/synthetic/httpMonFail.json');
let mgmtZoneRule = require('./jsonFiles/mgmtZone/mgmtZone.json')
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();


const headers = {
  Authorization: `Api-Token ${process.env.TOKEN}`,
  'Content-Type': 'application/json'
};


const postMonitor = async (script) => {
  const response = await fetch(
    `${process.env.TENANT}/api/v1/synthetic/monitors`,
    {
      method: 'post',
      body: JSON.stringify(script),
      headers: headers
    }
  );

  const data = await response.json();
  console.log(`Synthetic monitor ${data.entityId} created successfully`);
};

const postMgmtZone = async (mzRule) => {
  const response = await fetch(
    `${process.env.TENANT}/api/config/v1/managementZones`,
    {
      method: 'post',
      body: JSON.stringify(mzRule),
      headers: headers
    }
  );

const data = await response.json();
console.log(`Management Zone created successfully. ID is: ${data.id}`);
};

for (let index = 1; index <= 5; index++) {
  //browser monitor creation
  browserMon.name = `HOT script Browser ${uuidv4()}`;
  postMonitor(browserMon);
  //mgmt zone creation 
  mgmtZoneRule.name = `HOT management zone rule ${uuidv4()}`;
  postMgmtZone(mgmtZoneRule);
}

for (let index = 1; index <= 5; index++) {
  httpMon.name = `HOT script HTTP ${uuidv4()}`;
  httpMonFail.name = `HOT script HTTP Fail ${uuidv4()}`;
  postMonitor(httpMon);
  postMonitor(httpMonFail);
}

