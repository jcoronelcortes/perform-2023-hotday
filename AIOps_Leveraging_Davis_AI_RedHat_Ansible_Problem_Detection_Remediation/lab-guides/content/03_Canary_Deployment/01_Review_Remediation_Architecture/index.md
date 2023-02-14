## The Plan

For this exercise we are going to focus our attention on a service called "**simplenodeservice.canary**". Currently this service is being served by the "**simplenodeservice-canary-v1**" image - this image is healthy and has no bugs/issues. 

Using the Canary Deployment methodology we are going to introduce a newer image called "**simplenodeservice-canary-v2**" which contains newly developed experimental functionlity that we want to test on real users accessing the "**simplenodeservice.canary**" service in order to gain true feedback. "**simplenodeservice-canary-v2**" will serve as the canary in this scenario. 

Unfortunately, unbeknownst to everyone, "**simplenodeservice-canary-v2**" harbours a lot of faults and will cause adverse degradation in performance when subjected to an excessive amount of traffic.

Currently the majority of the traffic hitting the load balancer is being directed to "**simplenodeservice-canary-v1**", but to test and gain insights into the new functionality introduced in "**simplenodeservice-canary-v2**", traffic will need to be directed to the canary release, "**simplenodeservice-canary-v2**". 

As part of this exercise we are going to implement a automated process using both Dynatrace & Ansible controller to ensure that in the event a canary deployment introduces a degradation in performance, such as an increase in failure rates, fail safes are in place to quickly & appropriately identify the root cause and provide appropriate remediative action, i.e. rollback. 

![image](https://user-images.githubusercontent.com/54576043/217051109-7b6c670b-1e76-4516-ba50-0431a153ab58.png)

## The enviroment

For this exercise we will be using Ansible controller, Dynatrace and Jenkins.

- Jenkins will be our CI/CD tool tool of choice. For this exercise Jenkins will take care of load generation.
- Ansible controller will be used to manage, provision and faciliate your canary deployments and remediation playbooks.
- Dynatrace's AI-driven automatic problem detection will be used to sense any performance degradation along with configuration change events and trigger the auto-remediation process accordingly.
