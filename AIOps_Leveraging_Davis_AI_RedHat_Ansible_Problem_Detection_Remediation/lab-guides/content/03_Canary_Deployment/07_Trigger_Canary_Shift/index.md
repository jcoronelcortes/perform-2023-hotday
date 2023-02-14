## Trigger Canary Shift

Now we have configured Dynatrace to push a notification to Ansible if in the event Dynatrace Davis detects a degradation in performance and therefore trigger the remedative action, we can now look at triggering the canary shift.

At the moment, the load generator is calling the "**simplenodeservice.canary**" service's ingress. Although both versions ("**v1**" and "**v2**") of our service are deployed, 100% of the traffic is currently being routed to "**v1**", the current "**live**" version. We can now go into Ansible and trigger a shift of traffic to the service's canary version (**v2**).

1. Navigate to Ansible and log in with the following credentials: **dynatrace/dynatrace**.

2. Click on "**Templates**".

![image](https://user-images.githubusercontent.com/54576043/211625176-75478a03-4b48-490d-a95d-2c5f4723d201.png)

3. Find the "**Canary Shift**" template and click the launch template icon, symbolised by a little rocket as shown below. This is going to initiate the shift of traffic to "**simplenodeservice-canary-v2**".

![image](https://user-images.githubusercontent.com/54576043/211624697-6b9ea0a9-b518-48ca-9bc4-a41df6fda428.png)

4. A playbook is run which slowly increases the percentage of traffic that is routed to "**simplenodeservice-canary-v2**", which is our canary release in this scenerio. With each incrementatal step an event is pushed to Dynatrace to make it aware of the service's configuration change. When you visit the simplenodeservice-canary application in your browser the likelyhood of reaching the new service (**v2**) is steadily increasing up to the point where you'll only see the new version.
