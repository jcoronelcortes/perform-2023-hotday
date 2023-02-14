## Add additional metadata to easytrade application via K8s labels

- In your Bastion terminal, let's apply a new label to the pricingservice.yaml file:​

```bash
   sh ~/perform-2023-mastering-dynatrace-configuration/scripts/k8s-labels.sh
   ```
That script updated the pricingservice.yaml file, and added the a new "hands: onTraining" label in the Labels: section

![pricingservice](../../assets/images/pricingservicev3.png)

We need to trigger Kubernetes to stop our current container and start a new one with our Label added​, this will push the changes to Dynatrace.

- To apply the changes, execute:​

```bash
    cd ~/deploy/easytrade/manifests/
    kubectl apply -f pricingservice.yaml
    cat ~/deploy/easytrade/manifests/pricingservice.yaml
   ```