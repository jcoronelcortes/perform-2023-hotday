## SNMP Extension


What's required?  
1. extension/extension.yaml file
2. certificate
3. package
4. deploy
5. An smnp device to test

Start the test device to generate data.  
From your desktop, double click the training icon, scripts and run start_snmpsim.bat  

Copilot takes care of most steps!  
In visual studio code via explorer (icon top left), open extension.yaml and replace the content of the file with the following.

```yaml
name: custom:my.awesome.extension
version: 0.1.1
minDynatraceVersion: 1.255.0
author:
  name: Dynatrace
metrics:
  - key: snmp.palo-alto.sys.uptime
    metadata:
      displayName: System uptime
      unit: MilliSecond
snmp:
  - group: generic-palo-alto
    interval: 
      minutes: 1
    dimensions:
      - key: sys.name
        value: oid:1.3.6.1.2.1.1.5.0
      - key: sys.contact
        value: oid:1.3.6.1.2.1.1.4.0
      - key: sys.location
        value: oid:1.3.6.1.2.1.1.6.0
      - key: objectid
        value: oid:1.3.6.1.2.1.1.2.0
    subgroups:
      - subgroup: general
        table: false
        metrics:
          - key: snmp.palo-alto.sys.uptime
            value: oid:1.3.6.1.2.1.1.3.0
            type: gauge
topology:
  types:
    - name: palo-alto:device
      displayName: Palo Alto Networks System
      rules:
        - idPattern: palo-alto_system_{sys.name}_{objectid}_{device.address}
          instanceNamePattern: "{sys.name}"
          sources:
            - sourceType: Metrics
              condition: $prefix(snmp.palo-alto)
          requiredDimensions:
            - key: sys.name
            - key: objectid
          attributes:
            - key: SystemName
              displayName: System Name
              pattern: "{sys.name}"
            - key: SystemContact
              displayName: System Contact
              pattern: "{sys.contact}"
            - key: SystemLocation
              displayName: System Location
              pattern: "{sys.location}"
            - key: DeviceID
              displayName: Device ID
              pattern: "{objectid}"
          role: default
```

## Build and deploy
1. ctrl+shift+P Dynatrace: Build extension
2. upload: yes
3. activate: yes

Copilot even increases your version number automatically between builds!

## Create configuration
Your extension is ready to be used. Create a configuration to test it.  
Go to your tenant, Dynatrace Hub, Manage & upload extensions, click on custom:my.awesome.extension  
Click Add monitoring configuration.  
The extension must be signed and the certificate must be deployed on the active gate. Copilot took care of it, so just press Next step.  
Add device.  
IP address: 127.0.0.1  
Port: 1024  
SNMP version: v2c  
community string: network/firewall/paloalto-pa-5000  
Next step  
Enter a description for your configuration such as "perform config".  
Press activate

Wait a few minutes. Refresh the screen until the state changes to OK.  
Your extension is deployed.

## View data
Go to Observe and explore -> Data explorer.  
Under metric type uptime to select our new metric.  
Split by Palo Alto Networks System.  
Run query.  
To view the device, hover on the chart and click on view palo alto networks system.  
Click on properties and tags.  

Congratulations, you have successfully build and deployed your first SNMP extension!  

     


