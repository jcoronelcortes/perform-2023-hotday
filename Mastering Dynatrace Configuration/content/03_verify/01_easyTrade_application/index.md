## easytrade Application

The easytrade application should already be running in your environment, let's take some time to use our *kubectl* knowledge to get the public IP address of our easytrade application.

- In your Bastion terminal let's list the easytrade services in Kubernetes:

 ```bash
   kubectl get svc -n easytrade

   OR use the built-in script:

   sh ~/perform-2023-mastering-dynatrace-configuration/scripts/get-svc.sh
   ```

 Your output should show a list of the kubernetes services similiar to the following:
 
 ```bash
 NAME                 TYPE          CLUSTER-IP      EXTERNAL-IP                                     PORT(S)       AGE
 brokerservice        ClusterIP     172.20.154.224  <none>                                          80/TCP        12m
 db                   ClusterIP     172.20.154.224  <none>                                          1433/TCP      12m
 frontend             ClusterIP     172.20.154.224  <none>                                          3000/TCP      12m
 frontendreverseproxy LoadBalancer  172.20.154.224  djks480054kskd-2494.us-west-2.elb.amazonaws.com 80:32731/TCP  12m
 ```
 
 Look for the following:
 
 NAME: frontendreverseproxy, TYPE: LoadBalancer with an EXTERNAL-IP that ends with elb.amazonaws.com  
 
 - Copy the EXTERNAL-IP address and paste in into your browser to test it.

 ```bash
   Action: Copy the external IP address and paste into your browser.
   ```

- If you see a Login page it is working properly. You can register a fake account to further test the easytrade appliction. 

 ```bash
   Action: Register a fake account
   ```
**FYI** - None of the fields are validated so you can type anything you want for your account details:
