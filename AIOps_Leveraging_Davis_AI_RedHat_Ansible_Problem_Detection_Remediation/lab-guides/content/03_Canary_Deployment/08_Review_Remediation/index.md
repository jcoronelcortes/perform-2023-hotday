## Review Remediation

1. After the "**Canary Shift**" template has been launched, please go to the "**simplenodeservice.canary**" service within Dynatrace and study the Events Section at the bottom right of the page. After a minute you will see a new event appear called "Configuration Load Balancer Changed". Expanding this event will provide you more information on the event. This event states that that traffic is now being filtered to the canary "**simplenodeservice-canary-v2**", rather than "**simplenodeservice-canary-v1**".  

![image](https://user-images.githubusercontent.com/54576043/211095254-97c229a4-8a34-4d9e-be71-6e8479aa6315.png)

2. To visualise this shift, let's go ahead and create a Multidimensional Analysis view in Dynatrace. Within the "**simplenodeservice.canary**" service, click on "**Create analysis view**" under "**Multidimensional analysis views**".

3. Select metric "**Request count**", aggregation "**Count**" and split by dimension "**{Request:ApplicationBuildVersion}**"

![image](https://user-images.githubusercontent.com/54576043/211104794-10789ced-1ad9-4084-8d6d-c15957c6883a.png)

You can see that the request count for service "**v1**" is steadily decreasing while simultaneously increasing for service "**v2**".

4. After a couple more minutes you will see another event appear under Events stating requests to the "**simplenodeservice.canary**" service are seeing an increase in failure rate. Following this, Dynatrace Davis will automatically generate a problem ticket that will appear under the "**simplenodeservice.canary**" service. Clicking into this Problem will show you that Davis has identified an increase in failure rate on the "**simplenodeservice.canary**" service and Davis has pinpointed the Root Cause to the latest configuration change which involved increasing the amount of traffic to "**simplenodeservice-canary-v2**". It's important to note here that Dynatrace Davis automatically ties the Configuration Change event that we have sent as part of our Canary Deployment as the root cause and has also linked the remediation action that Ansible will go ahead and execute to automatically rollback the change, in an attempt to correct the increase in failure rates.

![image](https://user-images.githubusercontent.com/54576043/211103533-76cb77dd-6a28-4e6d-9a59-192e4d76b808.png)

![image](https://user-images.githubusercontent.com/54576043/211096618-3dbbf278-1b6f-402f-bbce-6b21111e57d5.png)

5. If you refresh the problem ticket, you should now see a new comment in the comment section informing you that Dynatrace has triggered the Remediation playbook in Ansible to rollback the configuration change by directing all traffic back to the healthy "**simplenodeservice-canary-v1**" version, instead of the canary, "**simplenodeservice-canary-v2**" which has obvious stability issues that will need to be looked into by the developers before any future testing.

![image](https://user-images.githubusercontent.com/54576043/211097648-372b9efa-6885-48d1-bfc8-ed50e3f2d2b4.png)

6. Clicking into the "**simplenodeservice.canary**" service you should start to see the failure rate start to decline. After a short while, Dynatrace Davis will recoginise the remediative playbook has had the desired affect and performance is now back to normal and the problem ticket will automatically be closed.

6. Done!
