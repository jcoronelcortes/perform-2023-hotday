## Verify Dynatrace and Kubernetes metadata match

- In your Bastion terminal let's view the metadata in Kubernetes:

 ```bash
   kubectl -n easytrade describe pod "pricingservice"

   OR use the built-in script:

   sh ~/perform-2023-mastering-dynatrace-configuration/scripts/describe-pod.sh pricingservice
   ```
The output should look similiar to the following:

![pricingservice](../../assets/images/pricinglabelv1.png)

The Labels in the output should match what appears in Dynatrace

- Navigate to Infrastructure  - Technologies and processes

 ```bash
   Action: Filter by "Tag", pick "pricing" and "All"
   Action: Click the "easyTradePricingService.dll pricingservice-*" group
   Action: Click "Properties and tags" and review the content
   ```
   ![tp](../../assets/images/tp.png)