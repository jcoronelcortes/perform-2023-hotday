## Troubleshooting
 ### AWX: Memory leak job fails
 If your job fails, it is likely that EasyTravel has become unresponsive. If you cannot access the EasyTravel administration UI (i.e., `http://easytravel-launcher.XX.YY.ZZ.AA.nip.io/main`), then EasyTravel has indeed become unresponsive and will require a restart. 
 ![image](https://user-images.githubusercontent.com/48868648/212773403-bb061eb8-5eed-488c-b61e-69f472e4699f.png)
 1. SSH into your ACE-BOX VM: `ssh -i .ssh/key dtu_training@XX.YY.ZZ.AA`. Here, `.ssh/key` is your private key, provided for you in advance.
 2. Execute a restart: `sudo reboot`. You will be kicked out of your SSH session.
 3. Wait about 5 min for all services to re-initialize. 
 4. Your ACE-BOX dashboard page should be accessible, as will your EasyTravel administration page.
