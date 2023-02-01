## DQL Parsing

Dynatrace Pattern Language (DPL) is a pattern language that allows you to describe patterns using matchers, where a matcher is a mini-pattern that matches a certain type of data. For example, IPADDR matches IPv4 or IPv6 addresses. There are matchers available to handle all kinds of data types.

### Matching vs Parsing
A matcher will extract data only when it has been assigned an export name - this is an arbitrary name of your choice, which becomes the name of the field you use in query statements. In this example, the pattern has 11 matchers in total, 4 of which are extracting data. The matchers extracting data are defined by a colon (:) followed by the exporter name.

![Parsing Example](../../assets/images/parsingExample.png)

### JSON Parsing

As it is most likely that you have worked with JSON before, that is the first exercise that we will go through. Our hipstershop application is logging very useful data in JSON format. 

### Step 1 - Understanding the data

The following query gives us an idea of the useful parameters that we can use, like the response size in KB, response status code and response time of each one of the received requests:

```
fetch logs
|filter k8s.deployment.name == "frontend-*" AND matchesPhrase(content, "http.resp.took_ms")
|fields content
|limit 3
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

### Step 2 - Parsing the JSON response

Now that we have example log entry with some interesting data parameters, let's use the parse command to extract the data values for http.resp.bytes, http.resp.took_ms, and session parameters. Since this log is already in JSON format, DQL offers a convenient way to parse it. In this case we will use the __json__ variable to store the parsed result. Doing this will enumerate all elements, transform them into Log processing data type from their defined type in JSON and returns a variant_object with parsed elements. 
Now that we have the JSON object parsed, we can access individual parameters and list those as fields

```
fetch logs
|filter k8s.deployment.name == "frontend-*" AND matchesPhrase(content, "http.resp.took_ms")
|parse content, "JSON:json"
|fields json, json[http.req.path], json[http.req.id], json[http.resp.status]
|limit 3
```

![JSON parse](../../assets/images/jsonParse.png)


### Step 3 - Accessing JSON parameters from the parsed result

Now that we can refer the JSON result using the __json__ identifier, we can use the normal JSON key:value convention to access parameters from the result. Also take a look at the conditional in the fourth row, we are going to work only with entries that had a JSON response and the session ID is not the _x-liveness-probe_ or _x-readiness-probe_, optimizing our query.

```
fetch logs
|filter k8s.deployment.name == "frontend-*" AND matchesPhrase(content, "http.resp.took_ms")
|parse content, "JSON:json"
|filter isNotNull(json[session]) AND NOT(startsWith(json[session], "x-"))
|fields responseTime = json[http.resp.took_ms], requestSize = json[http.resp.bytes], session = json[session], actionTime = toLong(timestamp)/1000000000
|limit 3
```

### Step 4 - Summarizing sessions based on important information

With the new fields that we extracted from parsing the JSON response, now we can start implementing some functions and logic to summarize the top 10 longest sessions, and report the total size in KB for the session, along with the total response time per session.
We can perform calculations, such as generate a total duration time (sessionDurationInMinutes) as shown in line 6 of the query below. Here we take the first action time (taken from the timestamp reported per request) and subtract that from the with the last action time, once the information is available per session ID

```
fetch logs
|filter k8s.deployment.name == "frontend-*" AND matchesPhrase(content, "http.resp.took_ms")
|parse content, "JSON:json"
|filter isNotNull(json[session]) AND NOT(startsWith(json[session], "x-"))
|fields responseTime = json[http.resp.took_ms], requestSize = json[http.resp.bytes], session = json[session], actionTime = toLong(timestamp)/1000000000
|summarize firstAction = first(actionTime), lastAction = last(actionTime), sessionSizeKBs = sum(requestSize/1024), sessionResponsetimeInMs = sum(responseTime), by:session
|fieldsAdd sessionDurationInMinutes = (lastAction - firstAction)/60
|fieldsRemove firstAction, lastAction
|sort sessionDurationInMinutes desc
|limit 10
```

## Additional exercises - Parsing only

As we saw before, we can use Dynatrace's parsing capabilities to access JSON content to be able to retrieve values in a dynamic way.
On top of that, we can use the same capabilities to be able to parse values out of text responses, parsing puts the result into one or more fields as specified in the pattern. This is especially useful when defining log processing rules, which eventually can be used to define custom log attributes that can be leveraged as dimensions in custom metrics.

### Sample data for parsing

Using the following query will provide you with a sample string, that can be parsed into multiple different fields using different type of matchers, like LD (Line data matcher), IPADDR (for matching IPv4 and IPV6 addresses), INT (integral numbers) and TIMESTAMP.

```
fetch logs
| limit 1
| fields contentToParse = "Feb 13 2023 17:29:01 ip-10-1-92-64 kernel: [526784.068581] [UFW AUDIT] IN=ens5 OUT=eth1 MAC=0e:16:b3:b8:e3:4f:0e:06:f6:c1:0c:7c:08:00 SRC=169.254.169.254 DST=10.1.92.64 LEN=52 TOS=0x00 PREC=0x00 TTL=255 ID=0 PROTO=TCP SPT=80 DPT=60350 WINDOW=493 RES=0x00 ACK URGP=0 "
```

### Exercise 1 - Extracting the timestamp

In the provided example, the timestamp is the first parameter, so it is a good exercise on how to transform the string to parse into a DPL expression in order to be able to extract only specific parameters. 
Using the ![Grammar](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-grammar) and ![Time and Date](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-time-date#conversion-patterns) documentation, we can use the TIMESTAMP expression with the right parameters for referencing the date and time, and once referenced we can extract the value using a variable. It is important to note that DPL needs to match the whole content to be parsed, so we need to add the LD expression after hour timestamp one to tell DQP to read the rest of the line data.

```
fetch logs
| limit 1
| fields contentToParse = "Feb 13 2023 17:29:01 ip-10-1-92-64 kernel: [526784.068581] [UFW AUDIT] IN=ens5 OUT=eth1 MAC=0e:16:b3:b8:e3:4f:0e:06:f6:c1:0c:7c:08:00 SRC=169.254.169.254 DST=10.1.92.64 LEN=52 TOS=0x00 PREC=0x00 TTL=255 ID=0 PROTO=TCP SPT=80 DPT=60350 WINDOW=493 RES=0x00 ACK URGP=0 "
| parse contentToParse, "TIMESTAMP('MMM d YYYY HH:mm:ss'):Timestamp LD"
```

### Exercise 2 - Extracting parameters in the middle

We can use DPL to target multiple parameters using a single parse command and a single expression. In this case, we can target other useful information presented in the example string. We can target the Kernel information, found within square brackets after the "kernel:" sub-string, and the source IP, found after the "SRC=" sub-string.

```
fetch logs
| limit 1
| fields contentToParse = "Feb 13 2023 17:29:01 ip-10-1-92-64 kernel: [526784.068581] [UFW AUDIT] IN=ens5 OUT=eth1 MAC=0e:16:b3:b8:e3:4f:0e:06:f6:c1:0c:7c:08:00 SRC=169.254.169.254 DST=10.1.92.64 LEN=52 TOS=0x00 PREC=0x00 TTL=255 ID=0 PROTO=TCP SPT=80 DPT=60350 WINDOW=493 RES=0x00 ACK URGP=0 "
| parse contentToParse, "LD 'kernel:' SPACE? '[' LD:kernel ']' LD 'SRC=' IPADDR:src LD"
```

### Optional excercise - Fully parametize the complete string

As we have seen, we can target 1 or multiple parameters within an object for dinamically extracting data. We can break down the whole string into individual parameters.
This is a query that you can use to completely breakdown this sample string. This same logic can be implemented to results provided by fetching logs.

```
fetch logs
| limit 1
| fields contentToParse = "Feb 13 2023 17:29:01 ip-10-1-92-64 kernel: [526784.068581] [UFW AUDIT] IN=ens5 OUT=eth1 MAC=0e:16:b3:b8:e3:4f:0e:06:f6:c1:0c:7c:08:00 SRC=169.254.169.254 DST=10.1.92.64 LEN=52 TOS=0x00 PREC=0x00 TTL=255 ID=0 PROTO=TCP SPT=80 DPT=60350 WINDOW=493 RES=0x00 ACK URGP=0 "
| parse contentToParse, "TIMESTAMP('MMM d YYYY HH:mm:ss'):Timestamp SPACE LD:hostName SPACE LD '['LD:Kernel']' LD 'IN='LD:IN SPACE 'OUT='LD:OUT SPACE 'MAC='LD:MAC SPACE 'SRC='IPADDR:SRC SPACE 'DST='IPADDR:DST SPACE 'LEN='INT:LEN SPACE 'TOS='LD:TOS SPACE 'PREC='LD:PREC SPACE 'TTL='INT:TTL SPACE 'ID='INT:ID SPACE 'PROTO='LD:PROTO SPACE 'SPT='INT:SPT SPACE 'DPT='INT:DPT SPACE 'WINDOW='INT:Window SPACE 'RES='LD:RES SPACE LD 'URGP='INT:URGP"
| fieldsRemove contentToParse
```

The goal is to breakdown the provided entry into individual fields, the result should look something like this:

![Parse result](../../assets/images/parseResult.png)


**Useful links**

[Log processing grammar](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-grammar "Grammar")

[Log processing modifiers](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-modifiers "Modifiers")

[Log processing JSON objects](https://www.dynatrace.com/support/help/how-to-use-dynatrace/dynatrace-pattern-language/log-processing-json-object "JSON Object")




