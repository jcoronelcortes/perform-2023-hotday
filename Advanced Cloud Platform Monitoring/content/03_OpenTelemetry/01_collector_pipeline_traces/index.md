## Building a Collector Trace Pipeline

In this section you'll learn how to :

- build a Trace pipeline
- use the processor K8sattrributes
- use the processor spanMetrics
- use the otlp http exporter

## A) Export Traces to Logs

1. Review the OpenTelemetry Collector template

Run the following to check out the manifest:

```bash
cat ~/HOT_DAY_SCRIPT/exercise/02_collector/trace/openTelemetry-manifest.yaml
```

This collector is currently receiving traces and exporting it directly to the logging exporter.

2. Deploy the OpenTelemetryCollector

```bash
kubectl apply -f ~/HOT_DAY_SCRIPT/exercise/02_collector/trace/openTelemetry-manifest.yaml
```

This will deploy OpenTelemetry Collector in a daemon set mode.

3. Look at the produced logs

```bash
kubectl get pods
```

4. Save the otel pod to a variable to make further commands easy.

```bash
export otelpod=<pod>
```

you should have one pod running with our collector :
![Pod 01](../../../assets/images/pod01.png)

Display the logs of the otel pod with:

```bash
kubectl logs $otelpod
```

## B) Update the current Trace Pipeline

1. Edit the OpenTelemetryCollector object

We'll edit the opentelemetry manifest and change the Trace pipeline to process spans. Each task will always start with the `memory_limiter` - end with the `batch` processor.

```bash
vi ~/HOT_DAY_SCRIPT/exercise/02_collector/trace/openTelemetry-manifest.yaml
```

![Pod 01](../../../assets/images/processor_flow.png)

Add k8s attributes
Adding k8s attributes to the generated traces means using the processor `k8sattributes`.
`k8sattributes` will interact with the k8s Api to collect details related to the span.

To interact with the Api, you need to use a Service Account having the right cluster role.
The following Service Account has already been deployed and has all the right privileges: `otelcontribcol`

Add the following extra attributes :

- `k8s.pod.name`
- `k8s.pod.uid`
- `k8s.deployment.name`
- `k8s.namespace.name`
- `k8s.node.name`
- `k8s.pod.start_time`

Here is the link to documentation of the [k8sattributes processor](https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sattributesprocessor).

2. Edit the `openTelemetry-manifest.yaml` and add the correct processor components with:

```bash
vi ~/HOT_DAY_SCRIPT/exercise/02_collector/trace/openTelemetry-manifest.yaml
```

Add this under processors in the YAML file:

```YAML
      k8sattributes:
        auth_type: "serviceAccount"
        passthrough: false
        filter:
          node_from_env_var: KUBE_NODE_NAME

        extract:
          metadata:
            - k8s.pod.name
            - k8s.pod.uid
            - k8s.deployment.name
            - k8s.namespace.name
            - k8s.node.name
            - k8s.pod.start_time

```

3. Change the Processor flow

Change the Processor flow in the trace pipeline to add the `k8sattributes` after the `memory_limiter`
Apply the change made on the collector :

```bash
kubectl apply -f ~/HOT_DAY_SCRIPT/exercise/02_collector/trace/openTelemetry-manifest.yaml
```

D. Look at the logs of the collector to see the updated format of the spans.
Get the new Pod name of the collector and look a the logs.

The pod name likely changed. Get the otel pod with:

```bash
kubectl get pods
```

Export the otel pod to a variable:

```bash
export otelpod=<pod>
```

Then get the logs of your pod with:

```bash
kubectl logs $otelpod
```

## C) Export the generated spans to Dynatrace

1. Update the current trace pipeline
   In the OpenTelemetry Collector pipeline, edit `openTelemetry-manifest.yaml` to export the spans to : - The logs of the collector - Dynatrace OpenTelemtry Trace ingest API.

```bash
vi ~/HOT_DAY_SCRIPT/exercise/02_collector/trace/openTelemetry-manifest.yaml
```

expected flow :
![exporter 01](../../../assets/images/exporter_flow.png)

Apply the file.

```bash
kubectl apply -f ~/HOT_DAY_SCRIPT/exercise/02_collector/trace/openTelemetry-manifest.yaml
```

2. Look at the generated traces in Dynatrace
   Open your Dynatrace tenant :

> 1.  Navigate to `Distributed traces` via Dynatrace Menu
> 2.  Click on ingested Traces
> 3.  Click on the Trace named HTTP GET or HTTP Post

3. Add all span attributes not stored by Dynatrace
   Look at each generated span, add all span attributes detected but not stored by dynatrace.
   ![spanattribute 01](../../../assets/images/span_attribute.png)

4. Look at the Service Screen
   In your Dynatrace tenant:

> 1.  Navigate to `Services` via Dynatrace Menu
> 2.  Click on the `checkoutservice`

### D) Review metrcs created

1. Look at the prometheus metrics produced by the Collector
   Get the new service montoring name of the Collector

   ```bash
   kubectl get svc
   ```

   ![collector 01](../../../assets/images/collector_metrics.png)

You might need to update the monitoring pod below!

2. Expose the port 8088 locally on the bastion host :

   ```bash
   kubectl port-forward svc/oteld-collector-monitoring 8088:8888
   ```

3. Open another terminal and connect to the bastion host.
   Look at the metrics by send http request to `http://localhost:8088/metrics`

   ```bash
   curl http://localhost:8088/metrics
   ```
