## Setup Terraform

### Initialize Terraform
1. Enter the Lab Directory<br/>

     ```bash
    cd ~/lab_deployment
     ```

2. Run the Lesson Script<br/>

     ```bash
     ./lesson.bash 2
     ```

3. Initialize Terraform<br/>

     ```bash
     terraform init
     ```

### Define Workspaces
1. Take a look at the default workspace<br/>

    ```bash
    terraform workspace show
    ```
2. Create a new workspace for dev<br/>

    ```bash
    terraform workspace new dev
    ```
3. Enter the dev folder<br/>

    ```bash
    cd ~/lab_deployment/dev
    ```
4. Populate the new tfvars files<br/>

    ```
    nano dev.tfvars
    ```
5. Create a new workspace test and repeat steps 2-4.