## easyTrade Application

The easyTrade application should already be running in your environment, let's take some time to use our *kubectl* knowledge to get the public IP address of our easyTrade application.

In your Bastion terminal let's list the easyTrade services in Kubernetes:

 ```bash
   kubectl get svc -n easyTrade
   ```

 Your output should show a list of the kubernetes services similiar to the following:
 
 ```bash
 NAME                 TYPE          CLUSTER-IP      EXTERNAL-IP                                     PORT(S)       AGE
 brokerservice        ClusterIP     172.20.154.224  <none>                                          80/TCP        12m
 db                   ClusterIP     172.20.154.224  <none>                                          1433/TCP      12m
 frontend             ClusterIP     172.20.154.224  <none>                                          3000/TCP      12m
 frontendreverseproxy LoadBalancer  172.20.154.224  djks480054kskd-2494.us-west-2.elb.amazonaws.com 80:32731/TCP  12m
 ```
 
 Look for the name **frontendreverseproxy** and the type **LoadBalancer** with an external IP that ends with **elb.amazonaws.com**.  
 
 Copy the EXTERNAL-IP address and paste in into your browser to test it.

 ```bash
   Action: Copy the external IP address and paste into your browser.
   ```

If you see a Login page it is working properly. You can register a fake account to further test the easyTrade appliction. 

**FYI** - None of the fields are validated so you can type anything you want for your account details:

 ```bash
   Action: Register a fake account
   ```
