## Building a Metric Pipeline

In this section you'll learn how to :

- build a Metric pipeline
- use the processor `metricstransform`
- use the processor `spanMetrics`
- use the dynatrace exporter

### Step 1: Update the collector Pipeline

A. Look at the OpenTelemetryCollector template

Check out the manifest with:

```bash
cat ~/HOT_DAY_SCRIPT/exercise/02_collector/metrics/openTelemetry-manifest.yaml
```

B. Add a metricstransform processor

Add a new label to store the K8s.cluster.name and the Cluster id.
To get the Cluster id run the following command :

```bash
 kubectl get namespace kube-system -o jsonpath='{.metadata.uid}'
```

Update the `openTelemetry-manifest.yaml` by adding the following processor :

```bash
vi ~/HOT_DAY_SCRIPT/exercise/02_collector/metrics/openTelemetry-manifest.yaml
```

Add the following processor:

```YAML
      metricstransform:
        transforms:
          include: .+
          match_type: regexp
          action: update
          operations:
            - action: add_label
              new_label: K8s.cluster.name
              new_value: hotday2023
            - action: add_label
              new_label: k8s.cluster.id
              new_value: <YOUR CLUSTER ID>

```

C. Add a metric pipeline
The metric that would :

- receive `otlp metrics`
- process with `memory_limiter`, `k8sattributes` , `metricstransform` , `batch`
- exporter: `prometheus`

![metric pipeline 01](../../../assets/images/metric_pipeline.png)

D. Replace the prometheus exporter with the dynatrace exporter

```yaml
metrics:
  receivers: [otlp]
  processors: [memory_limiter, k8sattributes, batch]
  exporters: [logging, dynatrace]
```

E. Apply the changes :

```bash
kubectl apply -f ~/HOT_DAY_SCRIPT/exercise/02_collector/metrics/openTelemetry-manifest.yaml
```

### Step 2: Look at the produced metrics

A. In your Dynatrace tenant:

> 1.  Navigate to `Metrics` via Dynatrace Menu
> 2.  Search for `hotday`
