## Creating Dashboards through the API 
Let's get started by creating our dashboard with the Dashboard API endpoints!

1. Navigate to the Analytics section in the module code, and find the template.json file in the assets folder. This is a template we will be using to create a Dashboard. You can see the metadata we define overarching information including the Title. Under it, we define each Tile.

2. In the Configuration API swagger page, scroll down to "Dashboards" and click the POST "/Dashboard" "Creates a dashboard" tile. 

3. Click "Try it Out" and paste the Dashboard Payload into the request body field. 

4. Click Execute. Make sure you get a 201 back! Copy the returned ID of the dashboard in the '.env' file of the Dashboard-Post code next to DASHBOARD_ID.

5. Naviage back to your Tenant and find your new Dashboard via the Dashboard page! 