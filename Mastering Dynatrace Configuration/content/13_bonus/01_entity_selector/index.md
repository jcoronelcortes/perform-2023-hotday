## Bonus Exercise - Entity Selector

We can add more automation to our existing automatic tagging "pricing" rule using the entity selector

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

- Add an additional automated tagging rule to the easytrade pricing service

 ```bash
   Action: Locate the "pricing" rule and expand the details
   Action: Click "Add a new rule"
   ```

![pricingaddes](../../assets/images/pricingaddes.png)

 ```bash
   Action: In the "Rule type" field pick "Entity SelectorServices"
   Action: In the "Entity selector" type "type(SERVICE),toRelationships.calls(type(SERVICE),tag(pricing))"
   Action: Click "Preview" to view the matched entities
   Action: Click "Save changes" on the lower left of your screen to save the new rule
   ```

![pricingaddedes](../../assets/images/pricingaddedes.png)

- Use the automated tagging rule to filter host entities

 ```bash
   Action: Look at the "Database" page
   Action: Filter by "Tag", pick "pricing", "All"
   ```

**FYI** - It may take a few minutes for your automated tagging rules to propogate, wait a few minutes and try again.

