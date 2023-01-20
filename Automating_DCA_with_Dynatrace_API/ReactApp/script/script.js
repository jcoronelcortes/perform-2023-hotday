let browserMon = require('./jsonFiles/synthetic/browserMon.json');
let httpMon = require('./jsonFiles/synthetic/httpMon.json');
let httpMonFail = require('./jsonFiles/synthetic/httpMonFail.json');
let mgmtZoneRule = require('./jsonFiles/mgmtZone/mgmtZone.json')
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


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
  if (response.status !== 200) {
    console.log(data.error)
  } else {
    console.log(`Synthetic monitor ${data.entityId} created successfully`); 
  }
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
if (response.status !== 201) {
  console.log('data:', data)
} else {
  console.log(`Management Zone created successfully. ID is: ${data.id}`);
}
};

for (let index = 1; index <= 4; index++) {
  //browser monitor creation
  browserMon.name = `HOT script Browser ${uuidv4()}`;
  postMonitor(browserMon);
  //mgmt zone creation 
  mgmtZoneRule.name = `HOT management zone rule ${uuidv4()}`;
  postMgmtZone(mgmtZoneRule);
}

for (let index = 1; index <= 3; index++) {
  httpMon.name = `HOT script HTTP ${uuidv4()}`;
  httpMonFail.name = `HOT script HTTP Fail ${uuidv4()}`;
  postMonitor(httpMon);
  postMonitor(httpMonFail);
}

