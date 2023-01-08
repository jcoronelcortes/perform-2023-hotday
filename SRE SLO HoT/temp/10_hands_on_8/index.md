## Hands on #8 - SLO dashboard

#### Having a great dashboard can help your organization understand the impact performance can have on the overal health of your application. Incorporating SLOs into those dashboards ties together what we learned with the dashboarding capabilities within Dynatrace.

1. In general, the steps to create a dashboard are relatively straightforward. 
   -  Create a dashboard
   - Put multiple tiles side-by-side. In our case, we want to put SLO tiles side-by-side for the sale SLO but with different time configurations.
   - Put headers / markup above.
2. First, let's create a new dashboard. Navigate to the Dashboard page and select 'Create Dashboard'. Give the dashboard a name and submit.

![](../../assets/images/ex8im1.png)

3. We can now add SLOs directly to the dashboard from the SLO page. Navigate there and select an SLO to add to the dashboard. We've created a few by now, so select whichever one you want. 
4. On the right-side of each SLO is an overflow menu represented by a series of dots. Select this icon for the SLO you want to add, then use the sub-menu to Pin to Dashobard. Select the dashboard we created earlier and submit.

![](../../assets/images/ex8im2.png)

5. With the tile added to the dashboard, you can modify properties depending on use-case. Options for SLO tiles are as follows:
   - Which SLO the tile maps to
   - Whether to display the legend, the metric names, and the problem indicators
     - Problem indicators are useful for tying a detected anomaly to an SLO.
   - Determine the max number of decimals to display
   - Adding custom filters, such as the enviornment to pull the data from (local or remote), and which timeframe to use for the evaluation period.
 6. For this example, you can use the values from the image below, replacing the specific SLO name with the one you selected earlier (you won't need to change this value unless you did so earlier when exploring the options listed above).

![](../../assets/images/ex8im3.png)

7. Above a series of SLOs, we can add headers from the tile list to the right. Headers help us add clarity and order to the dashboard and give a user contextual information on wheter to look for what. 
8. Similar to the SLO tiles, once you add this time, you can edit it with the right-hand configuration menu.
9. To wrap up this excercise, create more rows with more SLOs. You can also create new SLOs using the lessons learned in previous exercises to make a more comprehensive dashboard. 
