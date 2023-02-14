## Verify Dynatrace and Kubernetes metadata match

First you need to find the metadata in Dynatrace.

- Navigate to Infrastructure  - Technologies and processes

 ```bash
   Action: Filter by "Tag", pick "pricing" and "All"
   Action: Click the "easyTradePricingService.dll pricingservice-*" group
   Action: Click on the process instance
   Action: Click "Properties and tags" and review the content
   ```

![tp](../../assets/images/tp.png)

- In your Bastion terminal let's view the metadata in Kubernetes:

 ```bash
   kubectl -n easytrade describe pod "pricingservice"
 ```

Or use the built-in script:

 ```bash
   sh ~/perform-2023-mastering-dynatrace-configuration/scripts/describe-pod.sh pricingservice
 ```

The contents should look similiar to the following:

![annotations](../../assets/images/labelsandannotations.png)

- The Annotations should match what appears in Dynatrace

```bash
   Action: Compare Dynatrace values
   ```
