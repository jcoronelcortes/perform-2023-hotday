## Metadata - Environment

Another way to add Metadata to a process is via the Environment Variable

- DT\_CUSTOM\_PROP​

The variable must be visible to the respective process at startup **(IMPORTANT)​**

Once in place the variables show up on each respective Process and Process Group page​

In Kubernetes, an Environment Variable can be added via the env property in the container spec​

The spec file looks similiar to the following:

![envk8](../../assets/images/envk8s.png)
