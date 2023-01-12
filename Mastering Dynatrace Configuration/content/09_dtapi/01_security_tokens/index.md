## Dynatrace API - Security Tokens

To get started with the API you first need to create a security token in Dynatrace.

#### In Dynatrace, using the left navigation menu find Access tokens under the Manage section

Add a new token, with the **Access problem and event feed, metrics, and topology** scope. Once you can see the token you must save it to a text file for future use as we will not be able to retrieve it once you exit the final screen.

### Access tokens  - Manage


![smartscapeapitoken](../../assets/images/smartscapeapitoken.png)

 ```bash
   Action: Click "Generate new token"
   Action: Type "Smartscape API" into the "Token name" field
   Action: Type "Access problem" into the "Select scopes from the table below" field
   Action: Check the blue box to assign the scope
   Action: Click "Generate token" to save
   ```

![savetoken](../../assets/images/savetoken.png)

 ```bash
   Action: Click "Copy" to save the token to the clipboard
   Action: Save it somewhere so it can be accessed later (It will not be visible after this page)
   ```
