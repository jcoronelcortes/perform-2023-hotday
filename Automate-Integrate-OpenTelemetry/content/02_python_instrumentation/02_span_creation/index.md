## 2. Creating Spans into the Python webservice

---

### Introduction

Now that we're familiar with the OpenTelemetry setup for Python, it's time to start tracing our missing transactions. Our Python webservice is a very simple Flask web app.

You may have noticed in the previous exercise that we are only ingesting spans for the `/quote` route, and even those are disconnected from the upstream trace!

In this exercise you'll create the missing span for the `/calc` route and use Context to stitch all spans to their upstream traces.

Head over to <mark>./shopizer/pysrvc/main.py</mark> to begin.

### 📑 Key Concepts

Expand each section as needed.

<details>
  <summary><strong>Create custom Spans</strong></summary>

  In Python, Spans can be created by first aquiring a `tracer` and then invoking the `start_as_current_span("your-span-name")` function. This can be done either using the context manager keyword `with` and wrapping it around the code that's part of the Span, or it can be used as a `decorator` over an entire function.

  **Example - as a decorator:**
  ```python
  @tracer.start_as_current_span("my-span")
  def my_function:
      print("Doing some work...")
  ```

  **Example - as a context manager:**
  ```python
  def my_function:
      with tracer.start_as_current_span("my-span"):
          print("This is part of the span.")

      print("This isn't part of the span.")
  ```

  > 📝 **Note:** In our code, we access OpenTelemetry through the `ot` variable and can access a tracer using `ot.tracer`. The `ot` variable was imported already on line 8.

</details>

<details>
  <summary><strong>Set Span Context</strong></summary>

  We can think of `Context` as the glue that holds all Spans together in the same Trace. When a transaction goes across different processes and resources, the default OpenTelemetry behavior is to assign a new `Context` to each Span, thus creating separate transactions. We can modify this behavior by propagating `Context` across traces.

  **For incoming traces...**

  For our `/quote` and `/calc` routes, the OneAgent has already started an upstream trace and has injected Context (`traceparent`, `traceid`) into the headers of requests. We must extract it to set our spans in it.

  Context can be extracted using the `propagate` module. Within an app route, Flask allows us to access headers via `request.headers`. The extraction looks like this `propagate.extract(request.headers)` which returns us the Context.

  For Python, setting a span in context then becomes a one-liner:
  ```python
  with tracer.start_as_current_span("my-span", propagate.extract(request.headers)):
      print("Doing some work...")
  ```

  **For outgoing Traces...**

  For outgoing traces, we must capture our current Context and inject it into the headers of the outgoing web request. On the receiving side, the steps described above must happen for the end-to-end view to work. Luckily, the OneAgent already does this by default.

  To capture the current context we can use the `context` module like so: `context.get_current()`. For web request headers, a simple dictionary will suffice to hold the context. To actually inject it we can use another function of the `propagate` module called `inject`. Altogether it looks like this:
  ```python
  my_context = context.get_current()
  headers = {}
  propagate.inject(headers, ctx)
  ```

  > 📝 **Note:** The `headers` variable above will now hold the trace context that is needed to stitch any downstream spans to this current one.

</details>

<details>
  <summary><strong>Setting Span Kind</strong></summary>

  You may have noticed previously that the Service page for the Python webservice in Dynatrace is not populating all sections. That's because not all Spans are treated equally. There are several possible kinds:

  * **SERVER** - span covers server-side handling of a synchronous request
  * **CLIENT** - span describes a request to some remote service
  * **PRODUCER** - span describes the inititor of an asynchronous request
  * **CONSUMER** - span describes a child of an asynchronous request
  * **INTERNAL** - (default value) representing an internal operation without remote calls

  Setting a Span Kind can be done when the span is created:
  ```python
  def my_func():
      with tracer.start_as_current_span("my-span", kind=trace.SpanKind.SERVER):
          print("This is now a SERVER span")
  ```
</details>

### 📌 Your Tasks

In <mark>./shopizer/pysrvc/main.py`</mark>:
1. On line `22` - Edit the span creation route `/quote` so that it uses the right context and has the SpanKind set to SERVER.
   > 💡 **Hint:** To use the right context you must first extract it and provide it as the 2nd parameter
2. On line `29` - Insert a new line after and create a span for route `/calc`. As before, use the right context and set the kind to SERVER.
   > 💡 **Hint:** Except for the name change, this should look the same as exercise 1

Restart the application to verify any changes:
```bash
Ctrl + C
mvn spring-boot:run
```

<details>
  <summary>Show solution</summary>

  ```python
  # The /quote route should look like:
  @app.route("/quote", methods=["GET"])
  def quote():
      with ot.tracer.start_as_current_span("quote", propagate.extract(request.headers), kind=trace.SpanKind.SERVER) as span:
          ot.metrics["requests_count"].add(1, {"request": "/quote"})
          process(random.randint(0, 25))
          return make_response({}, 200)

  # The /calc route should look like:
  @app.route("/calc", methods=["GET"])
  def calc():
      with ot.tracer.start_as_current_span("calc", propagate.extract(request.headers), kind=trace.SpanKind.SERVER):
          ot.metrics["requests_count"].add(1, {"request": "/calc"})
          process(random.randint(0, 25))
          return make_response({}, 200)
  ```
</details>

### ✅ Verify results

To verify your results, go to Services and find the `Requests executed in the background threads of com.salesmanager.shop.application.ShopApplication` service then click `...` and drilldown to `Distributed traces`:
![service](../../../assets/images/02-02-background_service.png)

Then open any of the following requests:
* `http://127.0.0.1:8080/shop/product/vintage-laptop-bag.html/ref=c:3`
* `http://127.0.0.1:8080/shop/product/vintage-exotik-carry-bag.html/ref=c:2,2`
* `http://127.0.0.1:8080/shop/product/vintage-courier-bag.html/ref=c:2`
* `http://127.0.0.1:8080/shop/product/vintage-bag-with-leather-bands.html/ref=c:1,4`

You should see the Trace extend into the `/quote` and `/calc` routes of the Python webservice like so:

![trace](../../../assets/images/02-02-trace.png)

Open any of the traces and verify that for the `/qoute` and `/calc` routes, the Span Kind is set to "Server":

![spankind](../../../assets/images/02-03-spankind.png)

Finally, navigate back to the `pysrvc on port 8090` service. Verify that the page now displays three charts at the top and the spans for `/quote` route in the Distributed traces panel.

![service](../../../assets/images/02-03-service.png)