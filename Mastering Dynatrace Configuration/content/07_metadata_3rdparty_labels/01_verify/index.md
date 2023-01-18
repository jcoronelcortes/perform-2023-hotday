## Verify Dynatrace and Kubernetes metadata match

In the commands below you will need to replace 

- K8S\_CONTAINER\_NAME\_OF\_YOUR\_POD
- NAME\_OF\_YOUR\_POD
- NAMESPACE\_OF\_YOUR\_POD

with the correct values and you will need to remove the quotes once replaced.
These names can be found in the **Process Group Properties**

- In your Bastion terminal let's view the metadata in Kubernetes:

 ```bash
   kubectl describe pod "NAME_OF_YOUR_POD" -n "NAMESPACE_OF_YOUR_POD"
   ```
The contents should look similiar to the following:

![labelsdt](../../assets/images/labelsdt.png)

- The Labels should match what appears in the Dynatrace

```bash
   Action: Check Dynatrace values
   ```