## Introduction 
The EEC executes our EF2.0 extensions but it isn't enabled by default.  

1. Go to your Dynatrace tenant. Settings -> preferences -> Extension execution controller  
2. Select Enable Extension execution controller and local pipe/HTTP metrics.
3. Save changes

## Create a token
The copilot interacts with the Dynatrace via API calls so it requires a token.  

1. Settings -> manage -> access tokens.  
2. Generate new token, name = perform, no expiration.
3. Add the following scopes:   
    WriteConfig  
    ReadConfig  
    credentialVault.read  
    credentialVault.write  
    extensions.read  
    extensions.write  
    extensionEnvironment.write  
    extensionEnvironment.read  
    extensionConfigurations.read  
    extensionConfigurations.write  
    metrics.read  
    entities.read  
    settings.read  
    settings.write  

4. Generate token
5. Save your token (Notepad++)  

## Install Copilot  
Copilot saves a lot of time by automating tedious development stages such as SSL certificates. It can build and deploy your extensions for you too.  

1. On your desktop double click on training. Scripts. Run download_and_update_copilot
2. Once finished, right click on Visual studio code and select run as administrator
3. Click on the Dynatrace logo on the left and select add environment
4. Enter your tenant URL in the box (cut and paste from your browser). Press enter
5. Enter your token created in the previous step. Press enter
6. Type perform in the environment label box. Press enter
7. Select Yes
8. Select Open folder and create a folder for your workspace (For instance Desktop\training\projects\snmp).
9. Click on the Dynatrace logo and select initialize workspace (choose schema 1.256)
10. Certificates: Generate new ones
11. When prompted to upload to your environment, select yes.
12. Under certificate name, enter perform
13. Description, perform
14. Do you want to distribute to OneAgents and Active gates, select yes

Note: If you need to re-run any steps, use ctrl+shitf+P and search for the relevant step. Type Dynatrace to only return Dynatrace commands such as distribute certificate.

You are ready to write a new extension


