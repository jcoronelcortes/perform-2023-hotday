## Add additional metadata to easytrade application via environment variable

- In your Bastion terminal, let's apply the DT\_CUSTOM\_PROP changes to the pricingservice.yaml file:​

```bash
sh ~/perform-2023-mastering-dynatrace-configuration/scripts/dt-custom-prop.sh
```

That script updated the pricingservice.yaml file, and added the DT\_CUSTOM\_PROP variable with a value of "Environment=Dev" in the env: section:

![pricingservice](../../assets/images/pricingservicev2.png)

- Optional - If you want to check the pricingservice.yaml file after the changes run the following command:

```bash
cat ~/deploy/easytrade/manifests/pricingservice.yaml
```

(Important) We need to trigger Kubernetes to stop our current container and start a new one with our Environment Variable added​, this will push the changes to Dynatrace.

- To apply the changes, execute:​

```bash
cd ~/deploy/easytrade/manifests/
kubectl apply -f pricingservice.yaml
cat ~/deploy/easytrade/manifests/pricingservice.yaml
```