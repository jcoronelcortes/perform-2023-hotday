## Trigger an alert
In this step, let us simulate load by executing a load-script so that the automatic threshold is breached, thereby, triggering an alert.

In the Bastion host, go to the folder : `exercice/01_Prometheus`
   ```bash
   (bastion)$ cd ~/HOT_DAY_SCRIPT
   (bastion)$ cd exercice/01_Prometheus
   ```
Run the file as displayed below:
```sh
python3 simulate-alert.py AWS-IP 3000
```

* **Note**: To run this file you will need to replace the AWS-IP with your public-IP.

Once the script is executed, it would fire multiple requests parallely on the application. This will trigger an alert similar to the below:

![image](../../../assets/images/alert1.png)

