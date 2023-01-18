## Add additional metadata to easyTrade application via environment variable

- In your Bastion terminal, navigate to the following directory:​

```bash
   cd ~/deploy/easyTrade/manifests​
   ```
In this directory you will see deployment files associated with the easyTrade app, we are going to make a change to the file
 
 - brokerservice.yaml

The contents of brokerservice.yaml should look similiar to the following:

![nanobrokerservice](../../assets/images/nanobrokerservice.png)


Using nano, we’ll add some metadata to the brokerservice service via an Environment properties

- To open the brokerservice.yaml file, we’ll type the following:​

```bash
   nano brokerservice.yaml​
   ```

- In the env section add the following:​

```bash
   env:
   - name: JAVA_OPTS
     value: -Xms128m -Xmx512m -XX:PermSize=128m -XX+UseG1GC -Djava.security.egd=file:/dev/urandom
   - name: DT_CUSTOM_PROP
     value: Environment=Dev​

    After adding the above line, press "Ctrl+X" , press "Y" and press "Enter" to save​

   ```

We now need to apply the changes, so we need to trigger Kubernetes to stop our current container and start a new one with our Environment Variable added​

- To apply the changes, execute:​

```bash
    kubectl apply -f brokerservice.yaml​
   ```