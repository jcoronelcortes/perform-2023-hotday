## Trigger remediation workflow

1. Using the SSH terminal in Dynatrace University, start the load generation script that would create traffic against the application and start creating PDF files.

   ```(bash)
   sudo /home/$USER/ansible/roles/app-disk-filler/files/generator.sh 150
   ```

You will see some messages in the terminal with `Request number x` for each batch of files being created.

1. Monitor the host disk usage in Dynatrace. After a few minutes you will see a problem being open (Dynatrace UI >problems) with the name `disk-remediation-alert`
   ![disk-problem-detail](../../assets/images/04-06-disk-problem-detail.png)
   ![disk-problem](../../assets/images/04-06-disk-problem.png)

1. Get into Ansible Tower and check the remediation action being triggered as a response to the event in Dynatrace.
   ![disk-remediation](../../assets/images/04-06-disk-remediation.png)
