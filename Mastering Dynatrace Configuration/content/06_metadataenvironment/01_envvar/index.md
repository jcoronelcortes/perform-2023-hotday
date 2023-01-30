## Metadata - Environment

Another way to add Metadata to a process is via the Environment Variable

DT\_CUSTOM\_PROP​

**(IMPORTANT NOTE)​** This variable must be visible to the respective process at startup, once in place the variables will show up on each respective Process and Process Group page​

In Kubernetes, an Environment Variable can be added via the env property in the container spec​, in the next module we will update a YAML file with this new DT\_CUSTOM\_PROP

Before we add the DT\_CUSTOM\_PROP the spec section looks similiar to the following:

![PricingService](../../assets/images/pricingservicev1.png)

Notice the DT\_CUSTOM\_PROP is not in this file, therefore it does not show in Dynatrace.
