## MeterProvider, Meter, and Instrument Setup

In this section we go through OpenTelemetry Metric setup and create a new instrument. 

Reference: Dynatrace documentation
- [OpenTelemetry metric concepts](https://www.dynatrace.com/support/help/shortlink/opentelemetry-metric-concepts)
- [OpenTelemetry instrument code samples](https://www.dynatrace.com/support/help/shortlink/opentelemetry-instrument-examples)

1. MeterProvider (MetricReader/Exporter) configuration
1. Meter & Instrument creation

---

### 1. Meter Provider Configuration 
#### 👂 Listen & follow in code

Navigate to the following file:

```
pysrvc/otel.py
```

We will be using the variable `ot` again which holds the configuration for our OpenTelemetry Metrics setup:

```python
ot = CustomOpenTelemetry()
```

In the `setup_exporters(self)` our configuration starts on line `74` setting up our MeterProvider with `configure_dynatrace_metrics_export`. 

```python
        # Set up metrics export
        metrics.set_meter_provider(MeterProvider(
            metric_readers=[
                configure_dynatrace_metrics_export(
                    export_dynatrace_metadata=True,
                    prefix="perform.opentelemetry.hot",
                    default_dimensions=self.resource_props
                )
            ]
        ))
```

In cases where we do not have a OneAgent on the local host we can define the endpoint (ActiveGate or Cluser) and API token like so:

```python
        # Set up metrics export to remote endpoint
        metrics.set_meter_provider(MeterProvider(
            metric_readers=[
                configure_dynatrace_metrics_export(
                    export_dynatrace_metadata=True,
                    prefix="perform.opentelemetry.hot",
                    default_dimensions=self.resource_props
                    endpoint_url=endpoint_url,
                    api_token=api_token)
            ]))
```

Finally, we create an empty dictonary on line `26` which will end up holding our instruments that will be referenced through `ot` to populate measurements:

```python
    self.metrics = {}
```
---
### 2. Meter & Instrument Creation 
#### 👂 Listen & follow in code
The Meter can create the following Instrument types:

![Meter Instrument Types](../../../assets/images/03-01-instrument-types.png)

On line `28` we create a Meter instance in the variable `meter` using `metrics` (our MeterProvider):

```python
        self.meter = metrics.get_meter("perform-hot")
```

Using `meter` we create an instrument of type observable (async) guage on line `29`:

```python
        self.meter.create_observable_gauge(
            callbacks=[get_cpu_usage],
            name="cpu_usage",
            description="CPU Usage per processor, as percentage",
            unit="1"
        )
```

 On line `35` we call the function `create_counter_instrument` to create our Counter instrument:

```python
        self.create_counter_instrument(
            "requests_count",
            "Counts the number of requests to the service"
        )
```

Taking us to line `85` for the actual creation of the instrument:

```python
    def create_counter_instrument(self, name: str, description: str):
        self.metrics[name] = self.meter.create_counter(
            name=name, 
            description=description, 
            unit="1"
        )
```
---

### 📌 Task

**Your Task:** Create a histogram instrument

**1:** In the file `pysrvc/otel.py` create a function called `create_histogram_instrument` on line `92` which is used to define our instrument:

The function will take 4 inputs:
- `self`
- `name: str`
- `description: str`
- `unit: str`
  - Use `.create_histogram` to create a histogram instrument

>💡 **Hint**
>
>Copy the `create_counter_instrument` on line `85` as a starting point and modify it for your histogram instrument:
>
>```python
>    def create_counter_instrument(self, name: str, description: str):
>        self.metrics[name] = self.meter.create_counter(
>            name=name, 
>            description=description, 
>            unit="1"
>        )
>```

<details>
  <summary>Expand for Solution</summary>
  
  ```python
  def create_histogram_instrument(self, name: str, description: str, unit: str):
    self.metrics[name] = self.meter.create_histogram(
    name=name,
    description=description,
    unit=unit
  )
  ```
</details>

**2:** Create a call to the `create_histogram_instrument` function on line `39` passing the following parameters:
- `"process_duration"`
- `"Duration of Fibonacci calculation, in milliseconds"`
- `"ms"`

>💡 **Hint**
>
>Copy the `self.create_counter_instrument` on line `35` as a starting point and modify it for your histogram instrument:
>
>```python
>        self.create_counter_instrument(
>            "requests_count",
>            "Counts the number of requests to the service"
>        )
>```

<details>
  <summary>Expand for Solution</summary>
  
  ```python
        self.create_histogram_instrument(
            "process_duration",
            "Duration of Fibonacci calculation, in milliseconds",
            "ms"
        )
  ```
</details>

---
