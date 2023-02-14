## Review Canary Deployment

1. Let's find the "**simplenodeservice.canary**" service in Dynatrace. In the Dynatrace UI, go to "**Services**" under "**Applications & Microservices**" or use the filter at the top left of the UI, to filter the menu by "**Services**".
2. Under Management Zones, at the top right hand corner of the screen ![image](https://user-images.githubusercontent.com/54576043/211159327-13865d05-cd48-4c4d-a72b-a24ebaa28eec.png) select the Management Zone named "**ace-demo-canary**".

![image](https://user-images.githubusercontent.com/54576043/211159205-ba1f5027-b291-408f-b5ec-bffb9ef1cc2e.png)

3. The service "**simplenodeservice.canary**" should appear. Now click on the service named "**simplenodeservice.canary**". 

![image](https://user-images.githubusercontent.com/54576043/211073273-f35d68fc-55fb-49c1-aae0-35fa207d52e5.png)

4. Expand "**Properties and tags**" and inspect Kubernetes and environment metadata. You will find details about deployed versions, build, Kubernetes namespace and many more.

![image](https://user-images.githubusercontent.com/54576043/212045992-dae96008-f163-462f-8a03-43be2b33ecc2.png)

5. Inspect "**Process and pods**". Dynatrace detects both pods (processes) and associates them with the service "**simplenodeservice.canary**" based on the naming scheme the two processes share. For reference this is shown in the screenshot below. 

![image](https://user-images.githubusercontent.com/54576043/211073190-1c26354e-3052-42fc-9165-d66d43b1d829.png)

Once you've done this, you should see two instances/images appear: "**simplenodeservice-canary-v1**" & "**simplenodeservice-canary-v2"**. 

![image](https://user-images.githubusercontent.com/54576043/211098722-5e676db5-9348-4784-8939-0bb8a5ce9d2e.png)

In addition to the service being detected in Dynatrace, you can also get information about releases that are related to your service.

6. In your Dynatrace tenant, navigate to **"Releases**" and select the management zone "**ace-demo-canary**". This should filter for a single service "**simplenodeservice.canary**". The release inventory shows both versions of your service and all events that are related to your service and occured in the selected timeframe.

![image](https://user-images.githubusercontent.com/54576043/211158283-29183753-eb73-4600-b3da-c6edfd4217e6.png)
