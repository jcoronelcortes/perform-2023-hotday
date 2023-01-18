## Dynatrace API - Swagger interface

To get started testing the API you now need to know how to access it.

- https://YourEnvironmentID.live.dynatrace.com/rest-api-doc/index.jsp

In the URL above you will need to replace 

- YourEnvironmentID

with the correct value from your Dynatrace URL

#### In Dynatrace, you can also access the API from your profile icon in the top right area.

To start this module select the Environment API v1, it can be found in the profile menu or on the top right of the Dynatrace API Documentation.

- Navigate to Access tokens  - Time to authenticate

 ```bash
   Action: Click "Authorize"
   Action: Paste your newly saved token value into the "Value" field
   Action: Click "Authorize"
   Action: Click "Close" to save
   ```

- API  - GET

![tspgdocs](../../assets/images/tspgdocs.png)

 ```bash
   Action: Click on "Smartscape & Topology - Process Group" to expand the API
   Action: Click on the second "GET" api to expand it
   ```

The **meIdentifier** field is also known as the Dynatrace entity ID. This is a unique ID used within Dynatrace.

*An example is PROCESS_GROUP-65D65DF2C4E6E488*

- For this scenario we will use the ID of the process group named "brokerservice" under the "easyTrade" namespace
You can copy it from the URL in Dynatrace when you are viewing that process group.
 
 *An example URL is:*

    *https://.../#processgroupdetails;id=PROCESS_GROUP-6A43A47932317140;...*

 *In this example you would cut out PROCESS_GROUP-6A43A47932317140 from the URL and use only what you cut out in the next set of actions*

 ```bash
   Action: Click "Try it out"
   Action: Paste your unique "PROCESS_GROUP-..." ID into the "meIdentifier" field
   Action: Click "Execute"
   ```

View the result under server response, it should show a code of 200, with JSON data in the Response body


