## Configure Dynatrace Alerting Profile

Now we will create a Alerting Profile in Dynatrace. Alerting Profiles allow you to set up fine-grained alert filtering rules that help you control exactly which conditions result in a problem notification. It is these problem notifications that will then be routed to Ansible to trigger the automatic remediation.

1. In the Dynatrace UI, under the menu, go to "**Settings**" and then click on "**Alerting**" and then "**Problem Alerting Profiles**".

2. Click on "**Add Alerting Profile**" and name it "**ace-demo-canary**".

3. Under the Alerting Profile, Set the Management Zone to "**ace-demo-canary**".

4. Click on "**Add Severity Rule**" and define the following severity rules:

![image](https://user-images.githubusercontent.com/54576043/213747569-28783c9a-f348-42c3-9656-df641a9cf72f.png)

5. Save your changes.
