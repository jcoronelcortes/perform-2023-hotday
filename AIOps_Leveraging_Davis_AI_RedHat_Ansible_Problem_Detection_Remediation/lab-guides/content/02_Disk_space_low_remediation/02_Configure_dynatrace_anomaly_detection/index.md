## Configure Dynatrace Anomaly Detection

To implement the remediation workflow you will configure Dynatrace to send alerts when disk space is lower than `40%`

1. Get into Dynatrace > Settings > Anomaly Detection > Custom disk-detection rules
1. Create a new item with the name: `disk-remediation-alert`
1. Metric to alert: `low disk space`
1. Percentage: `40%`
1. Minimum number of violating samples: `1` within the last `3` samples
1. Disk name filter `equals` value `/`. (this would filter out values like `efi/boot` and monitor only the root disk. This can be fine-tuned if you have a specific volume name for PDF files, in our use case the files are store in the main volume).
1. Save your changes

![anomaly-detection-config](../../assets/images/04-02-disk-remediation-alert.png)
