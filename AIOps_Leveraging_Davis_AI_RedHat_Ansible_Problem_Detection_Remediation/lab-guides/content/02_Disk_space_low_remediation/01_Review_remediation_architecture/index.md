## The challenge

Let's imagine that one of your core applications generates PDF's files, and every week you run a script that cleans the folder to avoid any disk issues.

For the upcoming holidays you are expecting an increase on the site traffic and you are concern that the amount of PDF's being generated could cause low disk issues.

## The plan

As a preventive measure you want to develop an automated process that would clean the folder when the disk space consumed gets over 60%
![architecture](../../assets/images/04-01-architecture.png)

## The environment

For this remediation use case, we will be working with the **_HOST_** level in Dynatrace.

1. In order to find the disk information, in the Dynatrace UI go to Infrastructure > Hosts > and select the VM to view the details.
   ![hosts](../../assets/images/01-01-hosts.png)
1. Click on disks element and select the disk space usage tab
   ![architecture](../../assets/images/04-01-disk-usage.png)
1. Click on the contributing disks to see the details of each disk in the VM. You should visualize 2 disks:
   - the boot efi disk `/boot/efi`
   - the root disk `/`
     Note the disk usage under the root disk `/`. (It should be between 40-55%)

![usage](../../assets/images/04-01-disk-usage-detail.png)
