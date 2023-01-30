// express
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const dotenv = require('dotenv');
dotenv.config();

// import utils
const {
  getListByType,
  buildIterable,
  getMonitorBody,
  postDisabledMonitorBody,
  deleteMonitor,
} = require("./spoiledSyntheticsUtils.js");
const {
  getManagementZones,
  mZIterable,
} = require("./amendManagementZonesUtils.js");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
 
// --  AMEND MANAGEMENT ZONES -- //
// --  VVVVVVVVVVVVVVVVVVVVVV -- //
// To use, go to <host>:3000/amendManagementZones?suffix=<preferredSuffix>
app.get("/amendManagementZones", (req, res) => {
  //get query parameters
  const suffix = req.query.suffix;
  const tenant = process.env.TENANT;
  const token = process.env.TOKEN;

  getManagementZones(tenant, token).then((list) => {
    mZIterable(tenant, token, list, suffix).then((data) => {
      res.json(data);
    });
  });
});

// --  ^^^^^^^^^^^^^^^^^^^^^^ -- //
// --  AMEND MANAGEMENT ZONES -- //

// ---  POLLUTED TAGS ROUTES --- //
// ---  VVVVVVVVVVVVVVVVVVVV --- //

app.get("/getPollutedTags", (req, res) => {
  // get query parameters, cause why not, maybe we'll use them later
  let params = [];
  for (const [key, value] of Object.entries(req.query)) {
    params.push({ label: `${key}`, value: `${value}` });
  }
  const tenant = req.headers.tenant;
  const token = req.headers.token;
  console.log(tenant, token);

  // GET list of tags
  getListOfTags(tenant, token).then((listOfTags) => {
    console.log("list of tags in app", listOfTags);
    res.json(listOfTags);
  });
});

// ---  ^^^^^^^^^^^^^^^^^^^^ --- //
// ---  POLLUTED TAGS ROUTES --- //

// --- SPOILED SYNTHETICS ROUTES --- //
// --- VVVVVVVVVVVVVVVVVVVVVVVVV --- //

app.get("/getSpoiledMonitors", (req, res) => {
  // get query parameters, cause why not, maybe we'll use them later
  let params = [];
  for (const [key, value] of Object.entries(req.query)) {
    params.push({ label: `${key}`, value: `${value}` });
  }
  const tenant = req.headers.tenant;
  const token = req.headers.token;
  const active = req.headers.active;
  const timeframe = req.headers.timeframe;
  console.log(tenant, token, active, timeframe);

  // GET list of synthetics
  getListByType(tenant, token).then((entityListByType) => {
    // GET average avilaiblity metrics for 90 days
    buildIterable(tenant, token, entityListByType, active, timeframe).then(
      (iterable) => {
        Promise.all(iterable).then((availData) => {
          console.log("Returned monitors: " + availData.length + " found");
          res.json(availData.filter((avail) => avail.avail == 0));
        });
      }
    );
  });
});
app.get("/disableMonitor", (req, res) => {
  const tenant = req.headers.tenant;
  const token = req.headers.token;
  const entityId = req.headers.entityid;
  console.log("This is the header obj ", req.headers);
  // console.log(tenant, token, entityId);

  getMonitorBody(tenant, token, entityId).then((data) => {
    postDisabledMonitorBody(tenant, token, data).then((data) => {
      res.json(data);
    });
  });
});
app.get("/deleteMonitor", (req, res) => {
  const tenant = req.headers.tenant;
  const token = req.headers.token;
  const entityId = req.headers.entityid;
  console.log(tenant, token, entityId);
  deleteMonitor(tenant, token, entityId).then((data) => {
    res.json(data);
  });
});

// --- ^^^^^^^^^^^^^^^^^^^^^^^^^ --- //
// --- SPOILED SYNTHETICS ROUTES --- //

//START SERVER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
