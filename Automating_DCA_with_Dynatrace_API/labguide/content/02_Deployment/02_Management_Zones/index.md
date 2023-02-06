## Create a Management Zone

### Terraform
1. Enter the Lab Directory

     ```bash
    cd ~/lab_deployment
     ```
2. Run the Lesson Script

     ```bash
     ./lesson.bash 3
     ```
3. Select the Development Environment

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
6. Verify the Management Zone was created in the Dynatrace UI<br/>

7. Select the Test Environment<br/>

     ```bash
     terraform workspace select test
     ```
8. Compile the Terraform Environment<br/>

     ```bash
     terraform plan -var-file=test/test.tfvars -out=test/plan.out
     ```
9. Apply the Terraform Plan<br/>

     ```bash
     terraform apply test/plan.out
     ```
10. Verify the Management Zone was created in the Dynatrace UI

### Dynatrace UI
1. Navigate to Settings > Preferences > Management Zones
2. Create a Management Zone
3. Create rules to include all hosts with the tag Environment:Dev using the Monitored Entity
### Dynatrace API

#### Settings API Method
1. Find the entities that need to belong to the Management Zone via the Entities Endpoint
- Open the Dynatrace Environment V2 API Explorer
- Authorize the API Explorer with your token
- Select the Entities Endpoint
- Select hosts that to match the tag Environment:Dev and App:EasyTravel<br/>

```
type("host"),tag("Environment:Dev"),tag("App:EasyTravel")
```

```
https://<DT_Tenant_URL>/api/v2/entities?entitySelector=type%28%22host%22%29%2Ctag%28%22Environment%3ADev%22%29%2Ctag%28%22App%3AEasyTravel%22%29
```

2. Create the Management Zone via the Settings Endpoint<br/>

```json
[
    {
        "schemaId": "builtin:management-zones",
        "schemaVersion": "1",
        "scope": "environment",
        "value": {
            "name": "TEST",
            "rules": [
                {
                    "enabled": true,
                    "type": "SELECTOR",
                    "entitySelector": "type(\"host\"),tag(\"Environment:Dev\"),tag(\"App:EasyTravel\")"
                }
            ]
        }
    }
]
```
3. Verify the Management Zone was created in the Dynatrace UI
4. *Bonus*: Use the Entity Selector query in the Dynatrace UI to create the Management Zone Rules
