## DQL Parsing

Dynatrace Pattern Language (DPL) is a pattern language that allows you to describe patterns using matchers, where a matcher is a mini-pattern that matches a certain type of data. For example, IPADDR matches IPv4 or IPv6 addresses. There are matchers available to handle all kinds of data types.

### Matching vs Parsing
A matcher will extract data only when it has been assigned an export name - this is an arbitrary name of your choice, which becomes the name of the field you use in query statements. In this example, the pattern has 11 matchers in total, 4 of which are extracting data. The matchers extracting data are defined by a colon (:) followed by the exporter name.

![Logs & Events Viewer](../../assets/images/parsingExample.png)

### Step 1 - JSON Parsing

As it is most likely that you have worked with JSON before, that is the first exercise that we will go through. Our hipstershop application is logging very useful data in JSON format. Running the following simple query, we can see some of the useful parameters that we can use, like the response size in KB, response status code and response time of each one of the received requests:

```
fetch logs
|filter k8s.deployment.name == "frontend-*" AND matchesPhrase(content, "http.resp.took_ms")
|fields content
|limit 5
```
This will give you sample information of log entries with the information that we are looking for:
```
Content
{
  "dt.span_id": "8918cd9f31a4168b",
  "dt.trace_id": "a36d00ed72aac309ea2dd697bd139595",
  "dt.trace_sampled": "true",
  "http.req.id": "7b0459a5-21b3-46eb-8650-15d188d122e7",
  "http.req.method": "GET",
  "http.req.path": "/product/9SIQT8TOJO",
  "http.resp.bytes": 8142,
  "http.resp.status": 200,
  "http.resp.took_ms": 14,
  "message": "request complete",
  "session": "444e8080-9164-48fb-8693-9f5c912b8404",
  "severity": "debug",
  "timestamp": "2022-12-07T15:51:25.641940916Z"
}
```
Now that we have an example of the data that we are looking to use for summarizing critical sessions, we will be using http.resp.bytes, http.resp.took_ms and session parameters.

```
fetch logs, scanLimitGBytes: 500, samplingRatio: 1000, from: now() -2h
| filter status == "ERROR"
| sort timestamp desc
```
**Useful links**

[Log processing grammar](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-grammar "Grammar")

[Log processing modifiers](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-modifiers "Modifiers")

[Log processing JSON objects](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-json-object "JSON Object")




