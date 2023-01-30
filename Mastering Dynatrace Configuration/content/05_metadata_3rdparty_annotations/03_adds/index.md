## Add additional metadata

Annotations and labels are detected at deployment time, so simply using 

```bash
   kubectl annotation ...
   ```

will not update the information in Dynatrace until the pod is restarted.  After the pod has been restarted a new annotation will be added named "restartedAt" and it will show up in Dynatrace.

Let's cause the restart annotation to be added so we can see it in Dynatrace

- In your Bastion terminal let's restart our pod in Kubernetes:

 ```bash
   kubectl -n easytrade rollout restart deployments/pricingservice   
   ```

The contents should look similiar to the following:

```bash
    "deployment.apps/pricingservice restarted​"
   ```

- Describe the pod again to see the newly updated annotations

```bash
   clear; kubectl -n easytrade describe pod "pricingservice"

   OR use the built-in script:

   clear; sh ~/perform-2023-mastering-dynatrace-configuration/scripts/describe-pod.sh pricingservice
   ```
   
The contents should look similiar to the following:

![restartedat](../../assets/images/restartedat.png)
