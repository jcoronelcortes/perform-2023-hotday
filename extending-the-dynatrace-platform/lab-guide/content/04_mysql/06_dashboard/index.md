## Overview Dashboard

The Dynatrace Copilot Extension has a handy feature that allows you to create a overview dashboard for your extension.  
The only requirement is that you have your topology and metrics defined.

Press `F1` or `Ctrl + Shift + P` and search for `Dynatrace: Create overview dashboard` and press `Enter`.

![dashboard](../../../assets/images/mysql-04-dashboard.png)

This will create a dashboards folder, and an overview dashboard inside of it:

![dashboard_file](../../../assets/images/mysql-05-dashboard_file.png)

The copilot extension automatically adds the `dashboards` section to our yaml:

```yaml
dashboards:
  - path: dashboards/overview_dashboard.json
``` 

If we have fast mode enabled, and save the file, the dashboard will be created in Dynatrace. 

![dashboard_name](../../../assets/images/mysql-05-dashboard_name.png)

There is no data because we haven't deployed our extension quite yet.  
The dashboard has a generic name, you can safely edit the json file to make changes to it.


This is the fastest way to create a dashboard, but it's not the most flexible.  
If you want a more advanced dashboard customized by you, the easiest way to create one is:

1. Create a dashboard in Dynatrace using the UI
2. Export the dashboard to JSON using the Export tool
3. Save that file to the `dashboards` folder
4. Add a reference to that file in the `dashboards` section of the yaml