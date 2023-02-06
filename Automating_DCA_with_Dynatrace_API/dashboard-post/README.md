Getting Started Guide for Devs
==============================

To get started with the code provided:

1.  Install the webcoach, request, and fs packages:
    
    ```
    npm install webcoach
    npm install request
    npm install fs
    ```
    
2.  Access values in the `.env` file:
    
    ```
    import * as dotenv from 'dotenv';
    dotenv.config();
    ```
    
3.  Read the provided JSON file and parse it:
    
    ```
    // read the JSON file
    var dashboard = fs.readFileSync('./assets/template.json', 'utf-8');
    
    // parse JSON string to JSON object
    var dashboardJSON = JSON.parse(dashboard);
    ```
    
4.  Call the `getAdvice` function to make an API call for advice and store it in `result`:
    
    ```
    const result = await api.run(url);
    const adviceList = result.advice.bestpractice.adviceList;
    ```
    
5.  Update the markdown with the `updateMarkdown` function to add advice to it:
    
    ```
    await updateMarkdown(advice);
    ```
    
6.  Post the advice to the Events API with the `postEvent` function:
    
    ```
    await postEvent(advice);
    ```
    
7.  Post the dashboard with the `postDashboard` function:
    
    ```
    postDashboard(dashboardJSON);
    ```
    

And you're done! Now you should have your dashboard with all the advice!