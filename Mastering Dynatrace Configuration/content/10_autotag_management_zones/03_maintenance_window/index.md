## Automatic Tagging - Maintenance Window

We will now create a new maintenance window using the tagging we just created in the previous steps. Let's go back to the settings in Dynatrace.

#### In Dynatrace, using the left navigation menu find Settings under Manage section

- Navigate to Manage  - Settings

 ```bash
   Action: Look at the "Settings" page
   ```

- Maintenance windows, Monitoring, alerting and availability

 ```bash
   Action: Click on the "Maintenance windows" section within the light gray settings menu
   Action: Click on "Monitoring, alerting and availability"
   ```

Tags can also be utilized for maintenance windows – these are typically planned periods of system downtime during which your DevOps team can perform any maintenance and system upgrades out of peak traffic hours​

- Add an maintenance window that occur every Friday, 04:00-04:30 to detect problems and not alert​ using existing tagging rule applied to the easytrade pricing service 

 ```bash
   Action: Click "Add maintenance window"
   Action: Type "pricing" into the "Name" field and leave the "Description" field blank
   Action: Pick "Planned" from the "Maintenance type" dropdown list
   Action: Pick "Detect problems but don't alert" from the "Problem detection and alerting" dropdown list
   Action: Pick "Weekly" from the "Recurrence" dropdown list
   Action: Pick "Friday" from the "Day of week" dropdown list
   Action: Type "04:00" into the "Time window Start time" field
   Action: Type "04:30" into the "Time window End time" field
   Action: Leave the "Timezone" and "Recurrence range Start date" as is
   Action: Change the "Recurrence range End date" to the last day of the month
   Action: Click "Add filter"
   Action: Click "+ Add tag"
   Action: Type "pricing" into the "Key" field click "Add"
   Action: Click "Save changes" on the lower left of your screen to save the new rule
   ```

![mwpricing](../../assets/images/mwpricing.png)

