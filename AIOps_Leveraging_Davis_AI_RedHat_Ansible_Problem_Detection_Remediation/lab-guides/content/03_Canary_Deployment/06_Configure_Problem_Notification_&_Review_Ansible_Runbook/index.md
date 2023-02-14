## Configure Problem Notfication & Review Ansible Playbook

Next we will configure the Problem Notifications that will be sent to Anisble in the event Dynatrace Davis decides that a rollback is required.

1. In the Dynatrace UI, under the menu, go to "**Settings**" and then click on "**Integration**" and then "**Problem Notifications**".

2. Click on "**Add notification**" from the drop down, select "**Ansible**" from the drop down.

3. Name this notification "**ace-demo-canary**". 

4. For the next step we need to provide the URL of the Ansible playbook that includes the remediative steps. Please go to Ansible and log in with the following credentials: **dynatrace/dynatrace**. 

5. Once in Ansible, click into the template called "**Remediation**" and then copy the URL up to the last "**/**" and then go back into Dynatrace and paste it into the field that asks for "**Job Template URL**".

![image](https://user-images.githubusercontent.com/54576043/211087342-5fa43826-f444-456d-989d-db850632fecd.png)

6. Before we move on, let's review the remediative steps outlined in the playbook to confirm what action we should expect to see upon successful execution. To find the source of the remediation playbook, please navigate to Ansible, click on "**Projects**" and then select "**Canary Auto Remediation**". Under "**Source Control URL**" you will find the URL to the source of the playbook. Please navigate to this URL in your browser. 

There should be mulitple tasks defined within the Remediation playbook:

a) **push comment to dynatrace** -> This task adds a comment in the Problem Ticket within Dynatrace declaring the Remediation Playbook has been executed.

b) **get entityId** -> This task fetches the ID of the entity at fault, which in our scenerios case is "**simplenodeservice.canary**".

c) **fetch custom configuration events** -> This task fetches all the configuration events against the entity.

d) **parse configuration events** -> This task parses all the configuration events.

e) **get most recent configuration event** -> This task gets all the details of the most recent configuration event.

f) **call remediation action** -> This task identifies and executes the specified **RemediationAction** that is present in the latest configuration event, as highlighed in the **Configuration Change Event** in Dynatrace below. 

![image](https://user-images.githubusercontent.com/54576043/212047801-eb842277-a013-43cc-a069-eda3afa89a2c.png)

g) **push success comment to dynatrace** -> This task adds a comment to the Problem Ticket in Dynatrace declaring the Remediation Playbook was successful.

![image](https://user-images.githubusercontent.com/54576043/211592912-f0ba962c-8843-463b-9d03-3b8dce72b244.png)

7. Once you've reviewed the remediative steps, navigate back to the problem notification screen in Dynatrace and toggle the "**Accept any SSL certificate**" to the on position. 

![image](https://user-images.githubusercontent.com/54576043/211085895-6b96aad2-b0e6-4701-a252-c4e6cfa5d042.png)

8. Provide the following credentials in the fields that ask for Username and Password. 
**dynatrace/dynatrace**

9. Select the "**ace-demo-canary**" alerting profile you created in an earlier step under the drop down. 

10. Save your changes.
