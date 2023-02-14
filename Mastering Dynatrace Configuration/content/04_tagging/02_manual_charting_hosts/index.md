## Custom chart for Host CPU Usage

To create a custom chart you need to use the Data explorer in Dynatrace.

#### In Dynatrace, using the left navigation menu find Data explorer under the Observe and Explore section

Create a custom chart for CPU usage using the manual tag you created in the previous section

- Navigate to Observe and explore - Data explorer

 ```bash
   Action: Look at the "Data explorer" page
   Action: Type "host cpu usage %" into the field to the right of the "A" metric.
   Action: Click listed metric
   Action: Filter by "Host Tag", find your manual "tag key" value and use it, pick "All tag values"
   Action: Click "Run query" to see the results.
   ```

- Add this chart to a dashboard

 ```bash
   Action: Click "Pin to dashboard"
   Action: Pick create a new dashboard
   Action: Change the Tile title to "Manually Filtered CPU Usage"
   Action: Click "Pin" to save.
   ```
![savetodashboard](../../assets/images/savetodashboard1.png)

- Open dashboard and rename it

 ```bash
   Action: Click "Open dashboard"
   Action: Click the "blue pencil" icon next to the title to change it to "My Dashboard".
   Action: Click the "Done" button on the top right of the screen to save changes.
   ```

![savetodashboard](../../assets/images/newdashboard.png)

