// import dynatrace api client
// https://github.com/dynatrace-esa/dynatrace-api-client 
const { DynatraceTenantAPI } = require("@dt-esa/dynatrace-api-client");
function amendMZs(tenant, token, object, suffix) {
  const dtAPI = new DynatraceTenantAPI(
    {
      url: tenant,
      token: token,
    },
    false
  );
  return new Promise((resolve, reject) => {
    object.value.name = object.value.name + "_" + suffix;
    dtAPI.v2.settings
      .putSettingsObjectByObjectId(object.objectId, { value: object.value })
      .catch((e) => {
        console.log("from amend", e);
      })
      .then((data) => {
        resolve(data);
      });
  });
}
module.exports = {
  //Get managementZones Settings
  getManagementZones: function (tenant, token) {
    // intialize API Client Connection here

    // const dtAPI = new DynatraceTenantAPI(
    //   {
    //     url: tenant,
    //     token: token,
    //   },
    //   false
    // );

    return new Promise((resolve, reject) => {
      //make a call to the Settings V2 API for the management zones schema
      // dtAPI.v2.settings
      //   .getSettingsObjects({
      //     schemaIds: "builtin:management-zones",
      //   })
      //   .then((list) => {
      //     resolve(list.items);
      //   });
    });
  },
  // build an iterable
  mZIterable: function (tenant, token, list, intials) {
    return new Promise((resolve, reject) => {
      let mzCalls = [];
      for (object of list) {
        mzCalls.push(amendMZs(tenant, token, object, intials));
      }
      resolve(mzCalls);
    }).catch((e) => {
      console.log("from iterable function", e);
    });
  },
};
