## Trigger an alert
In this step, let us simulate load by executing a load-script so that the automatic threshold is breached, thereby, triggering an alert.

In the Bastion host, go to the folder : `exercice/01_Prometheus`
   ```bash
   (bastion)$ cd ~/HOT_DAY_SCRIPT
   (bastion)$ cd exercice/01_Prometheus
   ```
Run the following deployment to run a new K6 test:
```sh
kubectl apply -f loadgenerator.yaml -n samplebank
```

* **Note**: To run this file you will need to replace the AWS-IP with your public-IP.

Once the script is executed, it would fire multiple requests parallely on the application. This will trigger an alert similar to the below:

![image](../../../assets/images/alert1.png)

