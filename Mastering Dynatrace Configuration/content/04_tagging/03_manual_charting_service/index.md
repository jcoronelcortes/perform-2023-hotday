## Custom chart Host CPU Usage for Service Response Time

To create a custom chart you need to use the Data explorer in Dynatrace.

#### In Dynatrace, using the left navigation menu find Data explorer under the Observe and Explore section

Create a custom chart for Response time using the manual tag you created in the previous section

- Navigate to Observe and explore - Data explorer

 ```bash
   Action: Look at the "Data explorer" page
   Action: Type "service response time" into the field to the right of the "A" metric.
   Action: Click listed metric
   Action: Filter by "Service Tag", find your manual tag key value and use it, pick "All tag values"
   Action: Click "Run query" to see the results.
   ```

- Add this chart to your existing dashboard

 ```bash
   Action: Click "Pin to dashboard"
   Action: Pick your dashboard from the list of dashboards
   Action: Change the Tile title to "Manually Filtered Response Time"
   Action: Click "Pin" to save.
   ```
![savetodashboard](../../assets/images/savetodashboard2.png)

- Open dashboard and view it

 ```bash
   Action: Click "Open dashboard"
   ```

