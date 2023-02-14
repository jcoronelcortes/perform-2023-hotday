## Add additional metadata to easytrade application via environment variable

- In your Bastion terminal, let's apply the DT\_CUSTOM\_TAGS changes to the pricingservice.yaml file:​

```bash
sh ~/perform-2023-mastering-dynatrace-configuration/scripts/dt-tags.sh
```

That script updated the pricingservice.yaml file, and added the DT\_CUSTOM\_TAGS variable with a value of "hotday" and "customer=acme​" in the env: section:

![pricingservice](../../assets/images/pricingservicev4.png)

We need to trigger Kubernetes to stop our current container and start a new one with our Environment Variable added​, this will push the changes to Dynatrace.

- To apply the changes, execute:​

```bash
cd ~/deploy/easytrade/manifests/
kubectl apply -f pricingservice.yaml
```

- To view the changes, execute:​

```bash
cat ~/deploy/easytrade/manifests/pricingservice.yaml
```

