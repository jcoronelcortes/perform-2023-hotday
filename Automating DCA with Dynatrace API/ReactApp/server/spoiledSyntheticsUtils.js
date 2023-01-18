// import dynatrace api client
// https://github.com/dynatrace-esa/dynatrace-api-client
const { DynatraceTenantAPI } = require("@dt-esa/dynatrace-api-client");
// GET availability metrics and average them for each monitor
function getSynthAvailability(tenant, token, entity, active, timeframe) {
  const dtAPI = new DynatraceTenantAPI(
    {
      url: tenant,
      token: token,
    },
    false
  );
  console.log("getting availability metrics for " + entity.entityId);
  return new Promise((resolve, reject) => {
    let availMean = [];
    if (entity.type == "BROWSER") {
      // call /metrics endpoint
      dtAPI.v2.metrics
        .query({
          metricSelector:
            "builtin:synthetic.browser.availability.location.total:splitBy()",
          resolution: "1M",
          from: "now-" + timeframe + "d",
          entitySelector: 'entityId("' + entity.entityId + '")',
        })
        // reduce results to averages
        .then((timeseries) => {
          let reduceable = timeseries.result[0].data.length > 0;
          if (reduceable) {
            let valueLength = timeseries.result[0].data[0].values.length;
            availMean = {
              entity: entity,
              avail:
                timeseries.result[0].data[0].values.reduce((a, b) => a + b, 0) /
                valueLength,
            };
          } else if (!reduceable && active == "noFilter") {
            availMean = {
              entity: entity,
              avail: 0,
            };
          } else {
            availMean = {
              entity: entity,
              avail: null,
            };
          }

          resolve(availMean);
        });

      // for HTTP monitors, all else is same
    } else if (entity.type == "HTTP") {
      dtAPI.v2.metrics
        .query({
          metricSelector:
            "builtin:synthetic.http.availability.location.total:splitBy()",
          resolution: "1M",
          from: "now-90d",
          entitySelector: 'entityId("' + entity.entityId + '")',
        })
        .then((timeseries) => {
          let reduceable = timeseries.result[0].data.length > 0;
          if (reduceable) {
            let valueLength = timeseries.result[0].data[0].values.length;
            availMean = {
              entity: entity,
              avail:
                timeseries.result[0].data[0].values.reduce((a, b) => a + b, 0) /
                valueLength,
            };
          } else {
            availMean = {
              entity: entity,
              avail: 0,
            };
          }
          resolve(availMean);
        });
    }
    // TO-DO: resolve availMean asynchronously
  });
}
module.exports = {
  //Disable Monitor
  getMonitor: function (tenant, token, entityId) {
    const dtAPI = new DynatraceTenantAPI(
      {
        url: tenant,
        token: token,
      },
      false
    );
    return newPromise((resolve, reject) => {
      dtAPI.v1.synthetic.getMonitor(entityId).then((data) => {
        resolve(data);
      });
    });
  },
  getMonitorBody: function (tenant, token, entityId) {
    const dtAPI = new DynatraceTenantAPI(
      {
        url: tenant,
        token: token,
      },
      false
    );
    return new Promise((resolve, reject) => {
      dtAPI.v1.synthetic.getMonitor(entityId).then((data) => {
        resolve(data);
      });
    });
  },
  postDisabledMonitorBody: function (tenant, token, data) {
    console.log("disabling", data.entityId);
    const dtAPI = new DynatraceTenantAPI(
      {
        url: tenant,
        token: token,
      },
      false
    );
    data.enabled = false;
    return new Promise((resolve, reject) => {
      console.log("disabling", data.entityId);
      dtAPI.v1.synthetic.replaceMonitor(data.entityId, data).then(() => {
        resolve({
          entityId: data.entityId,
          result: "disabled",
        });
      });
    });
  },

  deleteMonitor: function (tenant, token, entityId) {
    const dtAPI = new DynatraceTenantAPI(
      {
        url: tenant,
        token: token,
      },
      false
    );
    return new Promise((resolve, reject) => {
      console.log("deleting", entityId);
      dtAPI.v1.synthetic.deleteMonitor(entityId).then(() => {
        resolve({
          entityId: entityId,
          result: "deleted",
        });
      });
    });
  },

  //GET monitor list
  getListByType: function (tenant, token, activeOnly) {
    const dtAPI = new DynatraceTenantAPI(
      {
        url: tenant,
        token: token,
      },
      false
    );
    console.log("getting list of monitors");
    return new Promise((resolve, reject) => {
      dtAPI.v1.synthetic.getMonitorsCollection().then((data) => {
        let entityListByType = [];
        for (entity of data.monitors) {
          entityListByType.push({
            entityName: entity.name,
            entityId: entity.entityId,
            type: entity.type,
            enabled: entity.enabled,
          });
        }
        // passback list of entityIds and their types
        if (activeOnly) {
          resolve(entityListByType.filter((item) => item.enabled == true));
        } else {
          resolve(entityListByType);
        }
      });
    });
  },
  // build promise iterable
  buildIterable: function (tenant, token, list, active, timeframe) {
    return new Promise((resolve, reject) => {
      console.log("building promise array");
      if (active == "isActive") {
        list = list.filter((entity) => entity.enabled == true);
      }
      let availabilityCalls = [];
      list.forEach((entity) => {
        availabilityCalls.push(
          getSynthAvailability(tenant, token, entity, active, timeframe)
        );
      });
      resolve(availabilityCalls);
    });
  },
};
