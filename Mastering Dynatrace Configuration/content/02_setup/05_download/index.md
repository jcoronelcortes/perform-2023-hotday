## Download scripts

To begin let's start in your Bastion terminal. Let's make sure we start in the right location.  

- Run the following command:

 ```
   cd ~
   ```

 - Next step is to locally clone the training repository from github:

 ```bash
   git clone https://github.com/stratuscoder/perform-2023-mastering-dynatrace-configuration.git
   ```

- Navigate to the newly cloned directory:

```bash
cd ~/perform-2023-mastering-dynatrace-configuration
```

- Now review the folder contents:

```bash
ls
```

The contents should look similiar to the following:

```bash
   "README.md  easytrade  scripts​"
```

Now you have a local copy of the tools required for this training.

- Finally, let's run a local setup script to finish the setup process

```bash
sh ~/perform-2023-mastering-dynatrace-configuration/scripts/dt-setup-k8s.sh
```
