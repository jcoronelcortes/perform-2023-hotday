## Building a Metric Pipeline

In this section you'll learn how to :

- build a Metric pipeline
- use the processor `metricstransform`
- use the processor `spanMetrics`
- use the dynatrace exporter

## A) Update the collector Pipeline

1. Look at the OpenTelemetryCollector template

Check out the manifest with:

```bash
cat ~/HOT_DAY_SCRIPT/exercise/02_collector/metrics/openTelemetry-manifest.yaml
```

2. Add a metricstransform processor

We'll add a new label to store the K8s.cluster.name and the Cluster id.
To get the Cluster id run the following command :

```bash
kubectl get namespace kube-system -o jsonpath='{.metadata.uid}'
```

3. Update the `openTelemetry-manifest.yaml` by adding the following processor :

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

## B) Add a metric pipeline

The pipeline will :

- receive `otlp metrics`
- process with `memory_limiter`, `k8sattributes` , `metricstransform` , `batch`
- exporter: `prometheus`

![metric pipeline 01](../../../assets/images/metric_pipeline.png)

1. Replace the prometheus exporter with the dynatrace exporter

You can **EDIT** your existing file. No need to copy all of below.

```YAML
metrics:
  receivers: [otlp]
  processors: [memory_limiter, k8sattributes, batch]
  exporters: [logging, dynatrace]
```

2. Apply the changes :

```bash
kubectl apply -f ~/HOT_DAY_SCRIPT/exercise/02_collector/metrics/openTelemetry-manifest.yaml
```

### C) Review the produced metrics

1. In your Dynatrace tenant:

> 1.  Navigate to `Metrics` via Dynatrace Menu
> 2.  Search for `hotday`
