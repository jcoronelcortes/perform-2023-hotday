## Auto Instrumentation

In this section, we'll inject the auto instrumentation library using the OpenTelemetry Operator by doing the following:

1. Create a new Namespace for our demo application
1. Deploy the OpenTelemetry SideCar collector in the namespace
1. Deploy the `Instrumentation` object in the namespace
1. Update the `Instrumetnation` object by adding the right instrumentation annotation

## A) Deploy the collector

1. Deploy the OpenTelemetry Sidecar Collector

   ```bash
   kubectl apply -f ~/HOT_DAY_SCRIPT/exercise/03_auto-instrumentation/openTelemetry-sidecar.yaml -n hipster-shop
   ```

2. Look at the Instrumentation object

   ```bash
   cat ~/HOT_DAY_SCRIPT/exercise/03_auto-instrumentation/instrumentation.yaml
   ```

3. Deploy the instrumentation object
   ```bash
   kubectl apply -f  ~/HOT_DAY_SCRIPT/exercise/03_auto-instrumentation/instrumentation.yaml -n hipster-shop
   ```

## B) Configure the Deployment file

Add the instrumentation annotation in the deployment file

To inject the correct OpenTelemetry Agent in the workload, we need to add annotations for:

- Java : `instrumentation.opentelemetry.io/inject-java: "true"`
- Nodejs: `instrumentation.opentelemetry.io/inject-nodejs: "true"`
- Python: `instrumentation.opentelemetry.io/inject-python: "true"`
- Dotnet: `instrumentation.opentelemetry.io/inject-dotnet: "true"`

1.  Edit `k8Sdemo-nootel.yaml` and add the matching annotation above by `technology`.

2.  Deploy the application

    ```bash
    kubectl apply -f  ~/HOT_DAY_SCRIPT/exercise/03_auto-instrumentation/k8Sdemo-nootel.yaml -n hipster-shop
    ```

### C) Look at the generated traces

1. Open your Dynatrace tenant :

   > 1. Navigate to `Distributed traces` via Dynatrace Menu
   > 2. Click on ingested Traces
   > 3. Click on the produced by the service Frontend-service
