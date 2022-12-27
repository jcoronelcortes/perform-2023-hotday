## Data source and scope

In this example we are collecting data from a Windows exporter which is currently running on your Windows environment.

![Windows exporter](../../../assets/images/03_prometheus_windows_exporter.png)

### Scope

There are two available scopes to run this extension, Local (OneAgent) or Remote (ActiveGate). Each monitoring configuration can have its own scope and they both use the same built extension.

![Scope](../../../assets/images/03_prometheus_scope.png)

Selecting a host will run our extension as LOCAL. Selecting **Monitor Remotely without OneAgent** will run our configuration as REMOTE from an ActiveGate group.

In this example, we will be using a **LOCAL** scope

Let's go through the datasource and discuss new concepts:

```yaml
prometheus:
  - group: windows
    subgroups:
      # Additional subgroups defined
      - subgroup: disk
        featureSet: Windows Disk Metrics
        dimensions:
          - key: volume
            value: label:volume
            filter: var:volume
        metrics:
          - key: windows_logical_disk_free_bytes
            value: metric:windows_logical_disk_free_bytes
            type: gauge
          # Additional metrics defined
```

Let's break it down...

* In this set of System metrics, we are creating a subgroup to collect metrics about **Logical disks**

* The next dimension will grab the **volume** label from the metric line `windows_logical_disk_free_bytes` and assign it to a key called **volume**
    * For example, our Windows exporter line says:

    `windows_logical_disk_free_bytes{volume="C:"} 4.4214255616e+10`
    
    It will grab the volume label "C:" and assign it a new volume dimension

```yaml
        dimensions:
          - key: volume
            value: label:volume
```

* Next we map our metric key to the metric name from our windows exporter

* Every metric in our exporter has a **TYPE**, make sure to use the appropriate type (count or gauge). If you do not use the appropriate type, **your metric could result in not displaying or 0 value**

![Type](../../../assets/images/03_prometheus_type.png)

```yaml
        metrics:
          - key: windows_logical_disk_free_bytes
            value: metric:windows_logical_disk_free_bytes
            type: gauge
          - key: windows_logical_disk_size_bytes
            value: metric:windows_logical_disk_size_bytes
            type: gauge
```
