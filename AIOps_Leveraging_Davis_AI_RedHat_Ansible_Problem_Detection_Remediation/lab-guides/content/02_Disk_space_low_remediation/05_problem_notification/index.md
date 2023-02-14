## Create a Dynatrace problem notification

In this step we will create a Dynatrace problem notification that will trigger the Ansible playbook when the alerting profile `disk-alert` (step 3) is triggered.

1. Navigate to Dynatrace UI > Settings > Problem notification
1. Click on add notification
1. Select Notification Type > Ansible
1. Display name: `ansible-disk-remediation`
1. Job template URL: `http://awx.xxx.xxx.xxx.nip.io/#/templates/job_template/XX`. Use the URL from the previous step.
1. Accept any SSL certificate: On
1. Username: `dynatrace`
1. Password: `dynatrace`
1. Alerting profile: `disk-alert`

Click saves changes

![anomaly-detection-config](../../assets/images/04-05-dynatrace-problem-notification.png)
