## Connecting metrics to Topology

Here we explore how to connect our metrics to the Dynatrace Topology. 

1. Create a rule to expand the Dyantrace topology
1. Find metrics in the Unified Analysis Screen of our python service

---

## Linking metrics to the Dynatrace Topology

#### 📌 Follow along

#### 1.  Go to `Settings >  Toplogy model > Generic types > Add type definition` and fill out the feilds as follows:

| Field | Value |
| ------ | ------------- |
| Type name | `span:service`  |
| Type display name | `Service Metric Linkage` |
| Created by | _Your Name_ | 

   ![Topology 1](../../../assets/images/03-03-topology_1.png)

#### 2. Click on `Add extraction rule` and fill out the following fields:

| Field | Value |
| ------ | ------------- |
| Extracted ID pattern | `{service.name}`  |
| Instance name pattern | `{service.name}` |
| Icon Pattern | `opentelemetry` | 

   ![Topology 2](../../../assets/images/03-03-topology_2.png)

#### 3.  Click on `Add Source` and fill out the following fields:

| Field | Value |
| ------ | ------------- |
| Ingest datasource type | `Metrics`  |
| Condition | `$prefix(perform.opentelemetry.hot)` |

   ![Topology 3](../../../assets/images/03-03-topology_3.png)

#### 4. Finally, click on `Add dimensions filter` and fill out the following fields and click on `Save Changes`:

| Field | Value |
| ------ | ------------- |
| Dimension key | `service.name`  |
| Dimension value pattern | _Leave Blank_ |

   ![Topology 4](../../../assets/images/03-03-topology_4.png)

---

## Unified Analysis Screen

#### 👂 Listen & follow in Dynatrace

> 📝 **Note**: 
> It may take a few minutes for the topology to connect the metrics to the service

Now that we have our topology we can navigate to the Service screen for our python service to see the result

In the top search bar type in `pysrvc svc on port 8090` to navigate to the service screen:

![Topology 4](../../../assets/images/03-03-nav_to_py_service.gif)

Under the Service Metrics if we drop down the menu we can see our OpenTelemetry metrics showing up:

![Topology 4](../../../assets/images/03-03-uas_otel_metrics.png)

This completes connecting our OpenTelemetry metrics to our Python Service in the Dynatrace topology! 