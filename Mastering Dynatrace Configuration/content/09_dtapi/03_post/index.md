## Dynatrace API - Post an update

For this module we will continue to use the Environment API v1, make sure you are still authorized or follow these steps to re authorize your connection.

- Navigate to Access tokens  - Time to authenticate

 ```bash
   Action: Click "Authorize"
   Action: Paste your newly saved token value into the "Value" field
   Action: Click "Authorize"
   Action: Click "Close" to save
   ```

- API  - POST

![tspgdocs](../../assets/images/tspgdocs.png)

 ```bash
   Action: Click on "Toplogy & Smartscape - Process Group" to expand the API
   Action: Click on the "POST" api to expand it
   ```

- Again, for this scenario we will use the ID of the process group named "brokerservice" under the "easytrade" namespace. Remember how we found and used the **meIdentifier** from the previous section, we will use it again so make sure you have it available.

If you don't have it available, you can copy it from the URL in Dynatrace when you are viewing that process group.

 ```bash
   Action: Click "Try it out"
   Action: Paste your unique "PROCESS_GROUP-..." ID into the "meIdentifier" field
   Action: Paste the following into the Request body JSON body field 

{
  "tags": [
    "APITag"
 ]
}

   Action: Click "Execute"
   ```

- View the result under server response, it should show a code of 200 or 204, with JSON data in the Response body

```bash
   Action: Check the correct response code, 204 Success. The parameters of the process group have been updated.
   ```

- When looking at your Process Group in Dynatrace,  you should see your tag present via the API​

```bash
   Action: Check the newly added tag of brokerservice it should be updated within a minute or two.
   ```

![apitag](../../assets/images/apitag.png)
