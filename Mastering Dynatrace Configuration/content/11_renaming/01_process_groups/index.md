## Naming Rules - Process Groups

We will now create a new naming rule for a process group using the tagging we created previously. Let's go back to the settings in Dynatrace.

#### In Dynatrace, using the left navigation menu find Settings under Manage section

- Navigate to Manage  - Settings

 ```bash
   Action: Look at the "Settings" page
   ```

- Processes and containers, Process group naming

 ```bash
   Action: Click on the "Processes and containers" section within the light gray settings menu
   Action: Click on "Process group naming"
   ```

- Add an renaming rule using: 

Kubernetes namespace – exists
  
and a new name format of:

K8s | {ProcessGroup:KubernetesBasePodName} | {ProcessGroup:KubernetesNamespace}​

 ```bash
   Action: Click "Add a new rule"
   Action: Type "k8pg" into the "Rule name" field
   Action: Copy and Paste the following format into the "Process group name format" field

   K8s | {ProcessGroup:KubernetesBasePodName} | {ProcessGroup:KubernetesNamespace}

   Action: Leave "Rule applies to entities ..." fields as is
   Action: Pick "Kubernetes namespace" from the 1st "Condition" dropdown list
   Action: Pick "exists" from the 2nd "Condition" dropdown list
   Action: Click "Preview" and compare the names before and after the renaming rule is applied
   ```

- After previewing the changes

 ```bash
   Action: Click "Create rule" under the preview list of matching entities
   Action: Observe the newly renamed "Process groups"
   ```
