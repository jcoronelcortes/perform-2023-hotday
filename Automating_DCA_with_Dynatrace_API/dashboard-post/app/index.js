import api from 'webcoach';
import request from 'request';
import fs from 'fs';

// Access values in .env file
import * as dotenv from 'dotenv' 
dotenv.config()
const DYNATRACE_TENANT_URL = process.env.DYNATRACE_TENANT_URL;
const DYNATRACE_API_TOKEN = process.env.DYNATRACE_API_TOKEN;
const DASHBOARD_ID = process.env.DASHBOARD_ID

const url = 'https://easytravel-angular-demo1.internal.dynatracelabs.com';

// read the JSON file
var dashboard = fs.readFileSync('./assets/template.json', 'utf-8');

// parse JSON string to JSON object
var dashboardJSON = JSON.parse(dashboard);

async function getAdvice(url){
    const result = await api.run(url);
    const adviceList = result.advice.bestpractice.adviceList;
    for (const key in adviceList) {
        const advice = adviceList[key];
        await updateMarkdown(advice);
        await postEvent(advice);
    }
}

//POST to Events API v2 where each piece of advice is an event
async function postEvent(advice) {
  
  const DYNATRACE_API_ENDPOINT = DYNATRACE_TENANT_URL + '/api/v2/events/ingest';
  
  var options = {
    'method': 'POST',
    'url': DYNATRACE_API_ENDPOINT,
    'headers': {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json; charset=utf-8',
      'Authorization': DYNATRACE_API_TOKEN
    },
    body: `{
      "eventType": "CUSTOM_INFO",
      "title": "🚧${advice.title}❗",
      "entitySelector": "type(application)",
      "properties": {
        "advice": "🚫 ${advice.advice}",
        "description": "${advice.description}",
        "id": "${advice.id}"
      }
    }`
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("Dynatrace Environment API v2 (Events): " + JSON.stringify(response.body));
  });
  
}

async function updateMarkdown(advice) {
  let markdown = dashboardJSON.tiles[1].markdown;

  if (!advice.advice) {
    markdown = `
    - 🚧 ${advice.description}
    `;
  } else {
    markdown = `
    - 🚫 ${advice.advice}
      - ❗ ${advice.description}
      `;
  }
  console.log(markdown);

  // set the updated markdown to the object
  dashboardJSON.tiles[1].markdown += markdown;

}

function updateDashboard(dashboardJSON) {

  const DYNATRACE_API_ENDPOINT = DYNATRACE_TENANT_URL + '/api/config/v1/dashboards/' + DASHBOARD_ID;

  dashboardJSON.id = DASHBOARD_ID
  // convert the modified object back to a JSON string
  const newMarkdown = JSON.stringify(dashboardJSON);

  // Write the JSON string to the file
  fs.writeFileSync('./assets/dashboard.json', newMarkdown);

  const options = {
    'method': 'PUT',
    'url': DYNATRACE_API_ENDPOINT,
    'headers': {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json; charset=utf-8',
      'Authorization': DYNATRACE_API_TOKEN
    },
    json: dashboardJSON
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("Dynatrace Config API (Dashboards): " + JSON.stringify(response.statusCode) + " " + (response.body));
  });
}

// MAIN FUNCTION: Execute getAdvice function
await getAdvice(url);
updateDashboard(dashboardJSON);