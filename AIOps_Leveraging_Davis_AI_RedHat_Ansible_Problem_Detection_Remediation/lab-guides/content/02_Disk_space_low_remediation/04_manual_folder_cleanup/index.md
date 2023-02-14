## Review and execute manually the manual clean up

Before configuring the final component in Dynatrace, we are going to test the remediation script that cleans the `storage` folder manually and review how it works from Ansible Tower.

1. Using the SSH terminal in the Dynatrace university **copy and paste** the following command to execute the script:

   ```(bash)
   sudo /home/$USER/ansible/roles/app-disk-filler/files/disk-cleaner.sh /home/$USER/storage
   ```

If you are curious, this is the script content:

```(bash)
#!/bin/bash
Current=$(du -sh $1)
echo "##### Size before cleaning" + $Current
echo "Clearing files in folder " + $1
rm $1/*
echo "Sucessfullly removed files"
Current=$(du -sh $1)
```

The script will:

- Show you the **initial folder size**
- Remove the target folder contents at `/home/$USER/storage`
- Show you the **final folder size** after the PDF files have been removed.

In order to double-check that the disk space has been cleared:

1. Get into the Dynatrace UI > Infrastructure > Hosts and check the available space now. (it can take a 1 or 2 minutes to refresh the information).

As a final check, we are going to review how Ansible invokes this script as part of the remediation workflow.

1. Get into Ansible Tower (use the dashboard to get to Ansible Tower) and review the template `disk-remediation`, this Ansible playbook would invoke the previous script to clean the target folder. Note the **template Url** for the next step.

![ansible-playbook-disk-remediation](../../assets/images/04-04-ansible-playbook.png)
![ansible-playbook-disk-remediation](../../assets/images/04-04-ansible-playbook-2.png)

1. Get into Gitea and review the `playbooks/remediation.yaml` file.
   ![ansible-playbook-disk-remediation-gitea](../../assets/images/04-04-gitea.png)
