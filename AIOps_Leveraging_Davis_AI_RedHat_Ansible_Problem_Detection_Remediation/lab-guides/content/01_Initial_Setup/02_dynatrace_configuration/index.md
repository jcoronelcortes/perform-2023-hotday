## Dynatrace configuration

By default Dynatrace learns about your frequent issues and avoids sending alerts if a problem is detected multiple times. For the auto-remediation use case we need to disable this behavior since we want to trigger a remediation action everytime Dynatrace detects an issue.

1. Navigate into Dynatrace UI > Settings> Anomaly detection > Frequent issue detection and disable the feature for services and infrastructure
   ![frequent-issue-detection](../../assets/images/disable-issue-detection.png)
