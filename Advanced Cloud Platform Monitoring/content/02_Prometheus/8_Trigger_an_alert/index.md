## Trigger an alert
In this step, let us simulate load by executing a load-script so that the automatic threshold is breached, thereby, triggering an alert.

Navigate back to your EC2 instance command line and change the directory to `/home/ubuntu/k8s`. You will find the file named **simulate-alert.py**.

Run the file as displayed below:
```
$ python3.8 simulate-alert.py AWS-IP port-number
```

* **Note**: To run this file you will need to replace the AWS-IP with your public-IP and replace the port-number with the NodePort where the application is listening.

Once the script is executed, it would fire multiple requests parallely on the application. This will trigger an alert similar to the below:

![image](../../../assets/images/alert1.png)

