## Setup Custom Alerts (With Auto-Detective baseline)
In this step, we will setup a custom-alert to alert us when the automatic baseline has been breached for the Prometheus metric(s)

Setup a custom alert with an  so that the AI engine would determine the threshold after studying the trend and behaviour of the metrics. To setup a custom alert

![image](../../../assets/images/createCustom-event-1.png)

All the metrics which were pushed into Dynatrace are now available in the metrics drop-down menu. Select the metrics that you would like to set a custom event for. In this case we will be using
`mongodb_ss_network_numRequests`.

![image](../../../assets/images/createCustom-event-2.png)

Further, scroll down to **Monitoring strategy** and configure the following:
1.	Model-type: **Static threshold**
1.	Configure to be alerted if the metric is above **10000**
![image](../../../assets/images/threshold_alerting_1.png)
1.  In Advanced dimension definition , select **kubernetes workload**
     filter type: Name
     Operator : equals
     value: mongo
![image](../../../assets/images/threshold_alerting_2.png)
1. Name the title **Prometheus-custom-alert**
1. Click on **Create custom event for alerting**
![image](../../../assets/images/createCustom-event-4.png)

* **Note**: Dynatrace would indicate the number of alerts you would have received as per the baseline and the configuration under **Alert Preview** section so that you can fine-tune the settings in order to avoid alert storm.

<!-- ------------------------ -->
