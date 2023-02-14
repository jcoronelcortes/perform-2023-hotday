## Configure Dynatrace Anomaly Detection

Both problem and anomaly detection in Dynatrace leverage Dynatrace's deterministic AI, named Davis. This means that the Davis learns how each and every microservice behaves and baselines them. Therefore, in a demo scenario like we have right now, we have to override the AI engine with user-defined values to allow the creation of problems due to an artificial increase of a failure rate. (Please note if we would have the application running and simulate end-user traffic for a couple of days there would be no need for this step.)

1. In your Dynatrace tenant, navigate to "**Services**" and select the Management Zone "**ace-demo-canary**". This should filter for a single service "**simplenodeservice.canary**". 

3. Select "**simplenodeservice.canary**" and click on the ellipsis  ![image](https://user-images.githubusercontent.com/54576043/211075403-786b7da0-f11d-4997-8169-e4c47035ad4d.png)  and then click "**Settings**".

2. Click on "**anomaly detection**" and navigate to the section that says "**Failure Rate**".

3. Under "**Failure Rate**" click on the drop down that currently reads "**Automatic**" and switch it to "**Using fixed thresholds**".

4. Set the threshold to "**5%**".

5. Click on the drop down that currently reads "**Low**" and switch it to "**High**".

6. Save your changes.

![image](https://user-images.githubusercontent.com/54576043/211076771-e90ac4ab-6a3d-4507-9423-2e2198f52f3c.png)
