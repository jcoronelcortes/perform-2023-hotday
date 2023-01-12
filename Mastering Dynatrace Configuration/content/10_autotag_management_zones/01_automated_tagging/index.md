## Automatic Tagging - Setup

In preperation for the next this module we need to create a new automatic tagging rule. Let's go back to the settings in Dynatrace.

#### In Dynatrace, using the left navigation menu find Settings under Manage section

- Manage  - Settings

 ```bash
   Action: Look at the "Settings" page
   ```

- Automatically applied tags

 ```bash
   Action: Click on the "Tags" section within the light gray settings menu
   Action: Click on "Automatically applied tags"
   ```

Add an automated tagging rule to the easyTrade Broker service

 ```bash
   Action: Click "Create tag"
   Action: Type "broker" into the "Tag" field and leave the "Description" field blank
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
   Action: Type "broker" into the "Value" field and and toggle off "Case sensitive"
   Action: Click "Preview" to view the matched entities
   Action: Click "Save changes" on the lower left of your screen to save the new rule
   ```

Use the automated tagging rule to filter database entities

 ```bash
   Action: Look at the "Services" page
   Action: Filter by "Tag", pick "broker" and use it
   ```

**FYI** - It may take a few minutes for your automated tagging rules to propogate, wait a few minutes and try again.

