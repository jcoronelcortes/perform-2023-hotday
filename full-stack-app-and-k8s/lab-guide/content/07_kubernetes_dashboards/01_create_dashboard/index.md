## Create a dashboard

In this step, we will create our own Kubernetes dashboard using metrics we've seen in the previous steps.

1. Navigate to the **Dashboards** page and select **Create dashboard**
      - Enter a dashboard name (ex. _My K8s Dashboard_) and click **Create**

![Create Dashboard](../../../assets/images/create_dashboard.png)

2. Drag & drop a **Graph** tile onto the dashboard
      - Select **Configure tile in Data Explorer**

![First Tile](../../../assets/images/first_tile.png)

3. Choose a metric template
      - Select **Kubernetes nodes CPU requests utilization overview** template

![Template](../../../assets/images/data_explorer_template.png)

      - Change the dropdown selection at the top right to **Top list**

![Template](../../../assets/images/data_explorer_toplist.png)

      - Select **Pin to dashboard**

![Template](../../../assets/images/data_explorer_pin_dashboard.png)

4. **Result**

![Dashboard with tile](../../../assets/images/dashboard_with_tile.png)

5. Go through these steps again
      - This time utilize **different metrics** and **templates**.
          - Example metrics:
              - mongodb\_dbstats\_indexSize
              - builtin:kubernetes.workload.pods_desired
              - builtin:containers.cpu.usagePercent
              - builtin:kubernetes.node.memory_allocatable


