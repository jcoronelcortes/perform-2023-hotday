## Create an Auto-Tagging Rule
​
### Terraform
1. Enter the Lab Directory
​
     ```bash
    cd ~/lab_deployment
     ```
2. Run the Lesson Script
​
     ```bash
     ./lesson.bash 3
     ```
3. Select the Development Environment
​
     ```bash
     terraform workspace select dev
     ```
4. Compile the Terraform Environment<br/>
​
     ```bash
     terraform plan -var-file=dev/dev.tfvars -out=dev/plan.out
     ```
5. Apply the Terraform Plan<br/>
​
     ```bash
     terraform apply dev/plan.out
     ```
6. Verify the Auto-Tagging Rule was created in the Dynatrace UI<br/>
​
7. Select the Test Environment<br/>
​
     ```bash
     terraform workspace select test
     ```
8. Compile the Terraform Environment<br/>
​
     ```bash
     terraform plan -var-file=test/test.tfvars -out=test/plan.out
     ```
9. Apply the Terraform Plan<br/>
​
     ```bash
     terraform apply test/plan.out
     ```
10. Verify the Auto-Tagging Rule was created in the Dynatrace UI
​
### Dynatrace UI
1. Navigate to Settings > Tags > Automatically Applied Tags
2. Create a Auto-Tagging Rule
3. Create rules to include all hosts and apply the value of Dev and Test to the tag Environment
### Dynatrace API
​
#### Settings API Method
1. Find the entities that need to belong to the Management Zone via the Entities Endpoint
- Open the Dynatrace Environment V2 API Explorer
- Authorize the API Explorer with your token
- Select the Entities Endpoint
- Select hosts that to match the tag Environment:Dev and App:EasyTravel<br/>
​
```
type("host"),tag("Environment:Dev"),tag("App:EasyTravel")
```
​
```
https://<DT_Tenant_URL>/api/v2/entities?entitySelector=type%28%22host%22%29%2Ctag%28%22Environment%3ADev%22%29%2Ctag%28%22App%3AEasyTravel%22%29
```
​
2. Create the Auto-Tagging Rule via the Settings Endpoint<br/>
​
```json
[
  {
    "schemaId": "builtin:tags.auto-tagging",
    "scope": "environment",
    "value": {
      "name": "environment",
      "rules": [
        {
          "enabled": true,
          "valueFormat": "dev",
          "valueNormalization": "Leave text as-is",
          "type": "SELECTOR",
          "entitySelector": "type(host)"
        }
      ]
    }
  }
]
```
3. Verify the Auto-Tagging Rule was created in the Dynatrace UI
4. *Bonus*: Use the Monitored Entity in the Dynatrace UI to create the Auto-Tagging Rules
