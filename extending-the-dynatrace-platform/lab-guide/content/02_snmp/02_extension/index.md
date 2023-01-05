## Let's create an extension with the SNMP data source.

What's required?  
1. extension/extension.yaml file
2. certificate
3. package
4. deploy

Copilot takes care of most steps!  
In your explorer, open extension.yaml and replace the content of the file with the following.

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




      


