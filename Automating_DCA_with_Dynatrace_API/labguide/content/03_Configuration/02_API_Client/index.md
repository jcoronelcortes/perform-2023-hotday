## Using the API Client to Edit a Configuration

1. For reference open <a href="https://www.npmjs.com/package/@dt-esa/dynatrace-api-client" target="_blank">ESA Api Client</a>

2. Have your token and tenant URL handy if you get into trouble.

3. Open your chosen text editor (prefereably vscode, because that is what we use for demonstration purposes)

4. Navigate to the project directory and open the app.js file

5. Let's add an API Client call to get our Management Zone Settings from the tenant.

     * The necessary code is commented in amendManagementZones.js, but let's take a moment to write this ourselves and understand what the API Client is doing

     ![getMzsFunction](../../assets/images/getManagmentZonesFunction.png)

6. Write a console.log() to take a look at the data we're getting back.

7. Open a terminal at the project directory and execute the following commands:

   ```bash
   npm start
   ```

8. Go to `http://localhost:3001/amendManagementZones?suffix=<yourInitials>` in your browser! You should now be able to verify the payloads in VS Code.