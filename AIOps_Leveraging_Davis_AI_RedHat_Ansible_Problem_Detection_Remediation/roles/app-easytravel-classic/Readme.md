# app-easytravel-classic

This currated role can be used to deploy EasyTravel one the ACEBOX including the web launcher.
This role does not reploy EasyTravel on Kubernetes, but rather directly on the VM

## Using the role

### Role Requirements
This role has no direct dependencies on other roles.

### Deploying EasyTravel

```yaml
- include_role:
    name: app-easytravel-classic
```

Variables that can be set are as follows:

```yaml
---
easytravel_classic_download_location: "{{ role_path }}/files/dynatrace-easytravel-linux-x86_64.jar"
easytravel_classic_install_location: "{{ role_path }}/files/easytravel-2.0.0-x64"
easytravel_classic_apache_port: 8079 #Which port on the local machine exposes EasyTravel
easytravel_classic_launcher_port: 8094 #Which port on the local machine exposes EasyTravel Launcher
easytravel_classic_domain: "easytravel-classic.{{ ingress_domain }}" # (Opt)When leveraging an ingress controller, which domain to use for EasyTravel
easytravel_classic_launcher_domain: "easytravel-launcher.{{ ingress_domain }}" # (Opt)When leveraging an ingress controller, which domain to use for EasyTravel Launcher
easytravel_classic_namespace: "easytravel-classic" # (Opt) when using the ingress capabilities, in which namespace to deploy the kubernetes resources
easytravel_classic_release_stage: "easytravel-classic" # For the Release Inventory, which Stage to set
```

### (Optional) To enable observability with Dynatrace OneAgent

> Note: Since EasyTravel Classic is not deployed on Kubernetes, the operator cannot be used and the OneAgent must be deployed using the installer
```yaml
- include_role:
    name: dt-oneagent-classic
```

### (Optional) To expose EasyTravel classic using the k8s Ingress controller 
By default EasyTravel classic is exposed on the local machine's ports, controlled by the folliwing variables:
```yaml
easytravel_classic_apache_port: 8079 #Which port on the local machine exposes EasyTravel
easytravel_classic_launcher_port: 8094 #Which port on the local machine exposes EasyTravel Launcher
```

If you want to leverage the Kubernetes ingress controller to expose both services on a subdomain, you can do this as follows.

> Note: This requires the `microk8s` role to be deployed
```yaml
- include_role:
    name: app-easytravel-classic
    tasks_from: deploy-ingress
```

The subdomains that are being used are controlled by the following variables:
```yaml
easytravel_classic_domain: "easytravel-classic.{{ ingress_domain }}" # (Opt)When leveraging an ingress controller, which domain to use for EasyTravel
easytravel_classic_launcher_domain: "easytravel-launcher.{{ ingress_domain }}" # (Opt)When leveraging an ingress controller, which domain to use for EasyTravel Launcher
```

### Configure Dynatrace using Monaco

> Note: in order to use Monaco, it needs to be installed first in your use case. This can be done as follows:

```yaml
- include_role:
    name: monaco
```

The below applies Dynatrace configurations with the monaco project embedded in the role in the `files/monaco/projects` folder

```yaml
- include_role:
    name: app-easytravel-classic
    tasks_from: apply-monaco
```

To delete the configuration:

```yaml
- include_role:
    name: app-easytravel
    tasks_from: delete-monaco
```

Dynatrace Configurations List:
    
    Easytravel Classic Aplication Specific:
        - "app-detection-rule/app.easytravel.classic"
        - "application-web/app.easytravel.classic"
        - "management-zone/easytravel-classic"

### Example: Deploy EasyTravel Classic and expose via the ingress controller, monitored by Dynatrace

```yaml
- include_role:
    name: dt-oneagent-classic

- include_role:
    name: microk8s

- include_role:
    name: app-easytravel-classic

- include_role:
    name: app-easytravel-classic
    tasks_from: deploy-ingress
```