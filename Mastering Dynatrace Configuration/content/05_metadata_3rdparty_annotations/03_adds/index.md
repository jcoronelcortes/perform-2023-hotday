## Add additional metadata

Annotations and labels are detected at deployment time, so simply using 

```bash
   kubectl annotation ...
   ```

will not update the information in Dynatrace until the pod is restarted.  After the pod has been restarted a new annotation will be added named "restartedAt" and it will show up in Dynatrace.

In the commands below you will need to replace 

- K8S\_CONTAINER\_NAME\_OF\_YOUR\_POD
- NAME\_OF\_YOUR\_POD
- NAMESPACE\_OF\_YOUR\_POD

with the correct values and you will need to remove the quotes once replaced.
These names can be found in the **Process Group Properties**

Let's cause the restart annotation to be added so we can see it in Dynatrace

In your Bastion terminal let's restart our pod in Kubernetes:

 ```bash
   kubectl rollout restart deployments/"K8S_CONTAINER_NAME_OF_YOUR_POD" -n "NAMESPACE_OF_YOUR_POD"
   ```
The contents should look similiar to the following:

```bash
    "deployment.apps/pricingservice restarted​"
   ```

Describe the pod again to see the newly updated annotations

```bash
   kubectl describe pod "NAME_OF_YOUR_POD" -n "NAMESPACE_OF_YOUR_POD"
   ```   
   
The contents should look similiar to the following:

![restartedat](../../assets/images/restartedat.png)
