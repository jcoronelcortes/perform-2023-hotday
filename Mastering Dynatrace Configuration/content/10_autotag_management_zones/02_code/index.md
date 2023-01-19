## Automatic Tagging - Distributed traces

With our tag that we have propagated to the detected Services​, go ahead and enter the distributed traces and utilize the tagging rule created before to bring filter the list of traces​.

#### In Dynatrace, using the left navigation menu find Distributed traces under Application & Microservices section

- Navigate to Manage  - Application & Microservices

 ```bash
   Action: Look at the "Distributed traces" page
   ```

- Filter using "pricing" service tag in the **Filter requests** field

 ```bash
   Action: Filter using Service tag "pricing" all
   ```

Now you have sorted through the entire environments data, and limited it to the "pricing" tag, let's narrow the list using response time > 200ms​

- Filter using "response time > 200ms​" in the **Filter requests** field

 ```bash
   Action: Filter using "Response time" with value of "> 200ms"
   ```

![tracefilter](../../assets/images/tracefilter.png)


