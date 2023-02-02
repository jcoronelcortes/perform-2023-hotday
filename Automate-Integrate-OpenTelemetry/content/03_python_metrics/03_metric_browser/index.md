## Metric Browser & Dashboarding

In this section we create a dashboard using our OpenTelemetry metrics. 

1. Explore metrics in Dynatrace
1. Create a heatmap and pin to a dashboard
1. Create a single value tile and pin to dashboard

---

## Dashboarding

#### 📌 Follow along

Navigate to the metric brower and search for the text `perform.opentelemetry`. Expand `perform.opentelemetry.hot.requests_count` and click `Create chart` to open the data explorer

![Settings](../../../assets/images/03-02-metric_browser.png)

Let's create a heatmap with the following settings:
1. Select `Heatmap` chart type
1. Split by Dimension `request`
1. Show legend `off`
1. Show Labels `on`
1. Y axis: `Split by Dimensions`
1. Rename our metric to `CPU Usage`
1. Set the threshold so you have a couple different colors showing in the heatmap
1. Pin the tile with the title `Request Count` to a new dashboard:

![Settings](../../../assets/images/03-02-heatmap.png)

<details>
  <summary>Solution</summary>
  
  ![Settings](../../../assets/images/03-02-heatmap_solution.png)

</details>

---

### 📌 Task

**Your Task:** Add a Single Value tile to the new dashboard

1. Select the `perform.opentelemetry.hot.process_duration` metric
1. Choose `Single value` as the chart type
1. Set your threshold so the background is yellow
1. Pin to the same dashboard with the title `Process Duration`

![Settings](../../../assets/images/03-02-single_value.png)

<details>
  <summary>Solution</summary>
  
  ![Settings](../../../assets/images/03-02-singleValue_solution.png)

</details>