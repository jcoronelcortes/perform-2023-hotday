## Connecting metrics to Topology

Here we explore how to connect our metrics to the Dynatrace Topology and view  the custom metrics in the services unified anlaysis screen like so:


![Topology 4](../../../assets/images/03-03-uas_otel_metrics.png)

---

## Linking metrics to the Dynatrace Topology

#### 📌 Task

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

5. Navigate to our python service to see the metrics connected in the unified anlaysis screen.

In the top search bar type in `pysrvc svc on port 8090` to navigate to the service screen:

![Topology 4](../../../assets/images/03-03-nav_to_py_service.gif)

Under the `Service Metrics` select one of the drop down menus to see the OpenTelemetry metrics:

> 📝 **Note**: 
> It may take a few minutes for the topology to connect the metrics to the service

![Topology 4](../../../assets/images/03-03-uas_otel_metrics.png)

This completes connecting our OpenTelemetry metrics to our Python Service in the Dynatrace topology! 