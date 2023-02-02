## Passing Measurements to Instruments

#### 👂 Listen & follow in code
Depending on the instrument type there are different functions used for populating measurements:

![Instrument Function/Callback](../../../assets/images/03-01-function_callback_table.png)

On line `15` we can see our callback function for our observable (async) gauge `cpu_usage`:

```python
        def get_cpu_usage(_: CallbackOptions):
            for (number, percent) in enumerate(psutil.cpu_percent(percpu=True)):
                attributes = {"cpu_number": str(number)}
                yield Observation(percent, attributes)
```

To see how our Counter is populated navigate too:

```
pysrvc/main.py
```
On line `21` in the `quote` function we use `ot` to pass a measurement to the `request_count` counter instrument:

```python
def quote():
    with ot.tracer.start_as_current_span("quote") as span:
        ot.metrics["requests_count"].add(1, {"request": "/quote"})
        process(random.randint(0, 25))
        return make_response({}, 200)
```

And we pass another measurmenet in `calc` function on line `29` but with a different attribute value:

```python
def calc():
    ot.metrics["requests_count"].add(1, {"request": "/calc"})
    process(random.randint(0, 25))
    return make_response({}, 200)
```
---

### 📌 Task

**Your Task:** Send a measurement to your histogram instrument

**1:** Open `pysrvc/utils.py` and navigate the `process` function on line `24` and add a line after `duration = (datetime.now().timestamp() - start.timestamp())*1000` to populate your measurement for the histogram passing the variable `duration` as the metric and add an attribute with the key `"number"` and variable `n` as the value. 
- change the dictionary reference to the name of the new histogram instrument `"process_duration"`

>💡 **Hint**
>
>Copy the line `23` in `pysrvc/main.py` as a starting point and modify it for your histogram instrument and remember that `.record` is used to pass a measuremnt to a histomgram instrument type:
>
>```python
>    ot.metrics["requests_count"].add(1, {"request": "/quote"})
>```
>

<details>
  <summary>Expand for Solution</summary>
  
  ```python
  ot.metrics["process_duration"].record(duration, {"number": n})
  ```
</details>

**2:** Restart your applicaiton by stopping it with:

```
Ctrl+C
```
Then starting again with
```
mvn spring-boot:run
```

**3:** Find your meansurements in Dynatrace

Navigate in your Dynatrace client to the Metrics Explorer and type in `perform.opentelemetry` to see the metrics populating in Dynatrace:
> 📝 **Note**: 
> It may take a few minutes for the data to populate in the Dynatrace client

![Meter Instrument Types](../../../assets/images/03-02-metric_browser.png)

---

### Summary

To summarize what we've done:
- We configured our MeterProvider to use the Dynatrace Metric Exporter
- We created a Meter instance and used that to create our Insturments
- We created a Histogram instrument tyep
- We populated measurments in our Instruments using `ot` in our applicaiton code

```java
+------------------+
| MeterProvider    |                 +-----------------+             +--------------+
|   Meter A        | Measurements... |                 | Metrics...  |              |
|     Instrument X +-----------------> In-memory state +-------------> MetricReader |
|     Instrument Y |                 |                 |             |              |
|   Meter B        |                 +-----------------+             +--------------+
|     Instrument Z |
|     ...          |                 +-----------------+             +--------------+
|     ...          | Measurements... |                 | Metrics...  |              |
|     ...          +-----------------> In-memory state +-------------> MetricReader |
|     ...          |                 |                 |             |              |
|     ...          |                 +-----------------+             +--------------+
+------------------+
```

