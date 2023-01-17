## Assign permissions so Dynatrace can pull the Kubernetes metadata

Using our locally clone repo from the **Setup Environment** step we previuosly completed we will run a script to automatically assign the proper permissions.

In your Bastion terminal let's run the permission script:

 ```bash
   cd ~/perform-2023-mastering-dynatrace-configuration/scripts
   sh metadata-viewer.sh
   ```
The contents should look similiar to the following:

 ```bash
    "role.rbac.authorization.k8s.io/dynatrace-oneagent-metadata-viewer created​"
    "rolebinding.rbac.authorization.k8s.io/dynatrace-oneagent-metadata-viewer-binding created​"
   ```

Now you have created the permissions let's look at the yaml file.

```bash
   cat ../easytrade/dynatrace-oneagent-metadata-viewer.yaml
   ```

Take time to review the contents of the yaml file

```bash
   Action: Review the yaml file contents
   ```
   