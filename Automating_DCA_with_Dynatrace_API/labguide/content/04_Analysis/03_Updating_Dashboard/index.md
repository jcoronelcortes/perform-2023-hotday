## Updating Dashboard

Though the Swagger UI page is always useful, in order to scale, it is more useful to write some code to handle calling the API and parsing the payloads for you. We have set up some code that calls the webcoach package to make its recommendations about the various improvements we could make to the website and formats them in a dashboard tile. 

1. Go into app/index.js and look at the code. We use the webcoach package to call the coach on our Easy Travel website. The webcoach package returns the advice list and we parse it. We then update the dashboard template and write it back to a file. We could add another method to upload the new template to Dynatrace directly, but we want you to see the changes that the code made.

2. Run the code:

```
npm i
```

to install all the files to run the code.

Then run 

```
node index.js
```

to run the analysis.

3. Check out the new template in the dashboard.json file.

4. Go back to the Configuration Swagger page and paste the new template into the PUT /dashboards/{id} API endpoint. Use the ID you copied from when you created the Dashboard as the ID in the request URL. Make sure you get the 204 in response. 

3. Look at the update you made in the tenant Dashboard Page. The story is coming together! 