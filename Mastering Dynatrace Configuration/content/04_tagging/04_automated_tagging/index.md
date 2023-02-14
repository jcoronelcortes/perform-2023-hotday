## Automatic Tags

To get starting with this automated tagging module you first need to find the settings in Dynatrace.

#### In Dynatrace, using the left navigation menu find Settings under Manage section

- Navigate to Manage  - Settings

 ```bash
   Action: Look at the "Settings" page
   ```

- Navigate to Automatically applied tags

 ```bash
   Action: Click on the "Tags" section within the light gray settings menu
   Action: Click on "Automatically applied tags"
   ```

- Add an automated tagging rule to the easytrade pricing service

 ```bash
   Action: Click "Create tag"
   Action: Type "pricing" into the "Tag" name field and leave the "Description" field blank
   Action: Click "Add a new rule"
   Action: In the "Rule applies to" field pick "Services"
   ```

 ```bash
   Action: Toggle on "Apply to underlying hosts of matching services"
   Action: Toggle on "Apply to underlying process groups of matching services"
   Action: Click "Add condition"
   ```

```bash
   Action: Pick "Service name" from the "Property" dropdown list
   Action: Pick "contains" from the "Operator" dropdown list
   Action: Type "pricing" into the "Value" field and and toggle off "Case sensitive"
   Action: Click "Preview" to view the matched entities
   Action: Click "Save changes" on the lower left of your screen to save the new rule
   ```

- Use the automated tagging rule to filter host entities

 ```bash
   Action: Look at the "Hosts" page
   Action: Filter by "Tag", pick "pricing" and use it
   ```
   
**FYI** - It may take a few minutes for your automated tagging rules to propogate, wait a few minutes and try again.

