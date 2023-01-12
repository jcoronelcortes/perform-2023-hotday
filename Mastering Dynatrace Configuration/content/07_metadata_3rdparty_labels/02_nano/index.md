## Add additional metadata to easyTrade application via labels

In your Bastion terminal, navigate to the following directory:​

```bash
   cd ~/deploy/easyTrade/manifests​
   ```
In this directory you will see deployment files associated with the easyTrade app, we are going to make a change to the file
 
 - brokerservice.yaml

Using nano, we’ll add some metadata to the brokerservice service via a Label​

To open the brokerservice.yaml file, we’ll type the following:​

```bash
   nano brokerservice.yaml​
   ```

In the labels section add the following:​

```bash
   template:
     metadata:
       labels:
         app: brokerservice
         hands: onTraining         

    After adding the above line, press "Ctrl+X" , press "Y" and press "Enter" to save​

   ```

We now need to apply the changes, so we need to trigger Kubernetes to stop our current container and start a new one with our Environment Variable added​

To apply the changes, execute:​

```bash
    kubectl apply -f brokerservice.yaml​
   ```