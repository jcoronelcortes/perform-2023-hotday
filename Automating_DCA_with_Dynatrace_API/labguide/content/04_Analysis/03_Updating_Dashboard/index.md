## Updating Dashboard

Though the Swagger UI page is always useful, in order to scale, it is more useful to write some code to handle calling the API and parsing the payloads for you. We have set up some code that calls the webcoach package to make its recommendations about the various improvements we could make to the website and formats them in a dashboard tile. 

1. Go into app/index.js and look at the code. We use the webcoach package to call the coach on our Easy Travel website. The webcoach package returns the advice list and we parse it. We then update the dashboard template and write it back to a file. We could add another method to upload the new template to Dynatrace directly, but we want you to see the changes that the code made.

2. Edit the .env file. Replace add your tenant to the line with "DYNATRACE\_TENANT\_URL". And your API token to the line with DYNATRACE\_API\_TOKEN.

3. Run the code:

```
npm i
```

to install all the files to run the code.

Then run 

```
node index.js
```

to run the analysis.

4. Check out the new template in the dashboard.json file.

5. Look at the update you made in the tenant Dashboard Page. The story is coming together! 