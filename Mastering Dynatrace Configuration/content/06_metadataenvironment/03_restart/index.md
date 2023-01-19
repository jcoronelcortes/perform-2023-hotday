## View the additional metadata in Dynatrace

- After the updates are applied from the previous step, we need to check to see if we see the updated Environment metadata in Dynatrace

 ```bash
   Action: Look at the "Technologies and processes" page
   Action: Filter by "Tag", pick "pricing" and "All"
   Action: Click on the "easyTradePricingService.dll pricingservice-"
   Action: Check the Environment custom metadata section inside Properties and tags
   ```

The contents should look similiar to the following:

![pricingservice](../../assets/images/pricingenv.png)
