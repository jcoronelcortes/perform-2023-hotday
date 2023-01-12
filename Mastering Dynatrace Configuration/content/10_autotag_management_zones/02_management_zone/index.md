## Automatic Tagging - Management Zones

Inside Dynatrace, you can use management zones to logically separate your environment out. This can be useful for limiting access to certain elements of the estate but also to decrease complexity for users – No need to see the whole world if they only care for a portion!​

We will now create a new management zone using the tagging we just created in the last steps. Let's go back to the settings in Dynatrace.

#### In Dynatrace, using the left navigation menu find Settings under Manage section

- Manage  - Settings

 ```bash
   Action: Look at the "Settings" page
   ```

- Preferences, Management zones

 ```bash
   Action: Click on the "Preferences" section within the light gray settings menu
   Action: Click on "Management zones"
   ```

Add an management zone using existing tagging rule applied to the easyTrade Broker service

 ```bash
   Action: Click "Add new management zone"
   Action: Type "broker" into the "Management zone name" field and leave the "Description" field blank
   Action: Click "Add a new rule"
   Action: Pick "Monitored entity" from the "Rule type" dropdown list
   Action: In the "Rule applies to" field pick "Services"
   ```

 ```bash
   Action: Click "Add condition"
   ```

```bash
   Action: Pick "Service tags" from the "Property" dropdown list
   Action: Pick "tag key equals" from the "Operator" dropdown list
   Action: Pick "broker" from the "Tag" dropdown list
   Action: Toggle on "Apply to underlying hosts of matching services"
   Action: Toggle on "Apply to underlying process groups of matching services"
   Action: Click "Preview" to view the matched entities
   Action: Click "Save changes" on the lower left of your screen to save the new rule
   ```

In the future, anything tagged with **brokerservice** will fall immediately into the same management zone, which is very powerful for architecting your environment, and controlling who has access to which parts of the data sets​. We call this automation!

Use the automated tagging rule to filter services entities

 ```bash
   Action: Look at the "Services" page
   Action: Filter by "broker" management zone (filter icon at the top right of the page)
   ```

**FYI** - It may take a few minutes for your automated tagging rules to propogate, wait a few minutes and try again.

