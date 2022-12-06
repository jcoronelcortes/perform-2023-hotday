## DQL Parsing

This is just a sample of a text block

### Step 1
Login to the provided Dynatrace Tenant. Using the left-hand navigation panel, expand 'Observe & Explore' and select 'Logs'.

![Logs & Events Viewer](../../assets/images/Log%20viewer.png)

Once in the advanced mode you'll find the default query producing the content in the table. All DQL queries will begin with a `fetch` for the type of data to query. Right now there are two options available:
```
fetch logs
```
and
```
fetch events
```
The for the purposes of these hands on labs we will always begin with `fetch logs` unless otherwise provided.

The default query also uses limits agains the data - `scanLimitGBytes` and `samplingRatio` each of these options can be used independantly or togther. While devloping your query it is best practice to use them until the final result requires precise results.



Since commands are chained together with a `|` (pipe); the results are also sorted by the timestamp field in DESC order.

### Step 2 - Timeframe and basic filters

Timeframe can optionally be directly included in the query. If it is excluded the global timeframe selector will be inherited by the log viewer. 

To override the global timeframe selector try the following query using `from:`

```
fetch logs, scanLimitGBytes: 500, samplingRatio: 1000, from: now() -2h
| sort timestamp desc
```

Now, let's try finding all log records where the 'status' = error:

```
fetch logs, scanLimitGBytes: 500, samplingRatio: 1000, from: now() -2h
| filter status == "ERROR"
| sort timestamp desc
```
**Note: field values are case-sensitve**

Combine filters with AND/OR logic:
