## Create an Alerting Profile

### Terraform
1. Enter the Lab Directory<br/>

    ```bash
    cd ~/lab_deployment
    ```
2. Run the Lesson Script<br/>

    ```bash
    ./lesson.bash 4
    ```
3. Select the Development Environment<br/>

    ```bash
    terraform workspace select dev
    ```
4. Compile the Terraform Environment<br/>

    ```bash
    terraform plan -var-file=dev/dev.tfvars -out=dev/plan.out
    ```
5. Apply the Terraform Plan<br/>

    ```bash
    terraform apply dev/plan.out
    ```
6. Verify the Alerting Profile was created in the Dynatrace UI
7. Modify dyn_alerting.tf to filter by Terraform workspace. After Line 1, add the following:<br/>

    ```hcl
      count        = "${terraform.workspace == "dev" ? 0 : 1}"
    ```
8. Compile the Terraform Environment<br/>

    ```bash
    terraform plan -var-file=dev/dev.tfvars -out=dev/plan.out
    ```
9. Apply the Terraform Plan<br/>

    ```bash
    terraform apply dev/plan.out
    ```
10. Verify the Alerting Profile has been removed from the Dynatrace UI
11. Select the Development Environment<br/>

    ```bash
    terraform workspace select test
    ```
12. Compile the Terraform Environment<br/>

    ```bash
    terraform plan -var-file=test/test.tfvars -out=test/plan.out
    ```
13. Apply the Terraform Plan<br/>

    ```bash
    terraform apply test/plan.out
    ```
14. Verify the Alerting Profile was created in the Dynatrace UI

### Dynatrace UI
1. Navigate to Settings > Alerting > Problem alerting profiles
2. Create an Alerting Profile called "EasyTravel Dev"
3. Filter the Alerting Profile to only include the Management Zone created in the previous lesson
4. Add a severity rule for Availability
### Dynatrace API

#### Settings API Method
1. Create the Alerting Profile using the Settings API<br/>

```json
[
    {
        "schemaId": "builtin:alerting.profile",
        "schemaVersion": "1",
        "scope": "environment",
        "value": {
          "name": "Test Availability",
          "managementZone": "<management-zone-id>",
          "severityRules": [
            {
              "severityLevel": "AVAILABILITY",
              "delayInMinutes": 0,
              "tagFilterIncludeMode": "NONE"
            }
          ],
          "eventFilters": []
        }
    }
]
```

