## Using the API Explorer to Edit a Configuration

1. For reference open <a href="https://www.dynatrace.com/support/help/shortlink/api-v2-settings" target="_blank">Settings API</a>

2. Navigate to the Dynatrace API Explorer - Environment V2 Definition

   ![env2](../../assets/images/environmentv2.png)

3. Authorize your session with the "Authorize" button. Paste your token in the value field and Submit

   ![authorize](../../assets/images/authorizeprompt.png)

4. Let's target a Settings Schema. For this example, we'll edit a Management Zone

     * Navigate to Settings > Preferences > Management Zones
     * Click on the Elipses Menu in the top right corner
     * Copy the Schema ID

     ![managementzonesnav](../../assets/images/managementzones.png)

     ![copyschemaid](../../assets/images/copyschemaid.png)

5. Now navigate back to your API Explorer and open the Settings - Objects > GET /settings/objects Endpoint

     * Paste the Schema Id in the SchemaIds field
     * Execute the query
     * Verify your response with all of the tenant's Management Zone settings!

     ![getobjects](../../assets/images/getobjects.png)

     * Copy one of your Management Zone configuration object Ids.

   ![copyid](../../assets/images/copyid.png)

6. Open the Settings - Objects > GET /settings/objects/{objectId} Endpoint

     * Paste your object Id in the id field
     * Execute the query

     * Verify your response contains a settings object

     ![getobject](../../assets/images/getobject.png)

     * Copy the "value" object from this response

     ![copyvalue](../../assets/images/copyvalue.png)

7. Edit your object using the Settings - Objects > PUT /settings/objects/{objectId} Endpoint

     * Paste your object Id in the ID field
     * Paste your value object in the prompt within an object "{ }"
     * Edit the name attribute to contain you initials
     * Execute the query
     * Verify the 200 response status

     ![putobject](../../assets/images/putobject.png)

     * Verify the change in the tenant UI

   ![verifymzs](../../assets/images/verifymzs.png)
