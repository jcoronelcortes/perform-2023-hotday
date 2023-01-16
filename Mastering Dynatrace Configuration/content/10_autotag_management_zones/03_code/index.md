## Automatic Tagging - Distributed traces

With our tag that we have propagated to the detected Services​, go ahead and enter the distributed traces and utilize the tagging rule created before to bring filter the list of traces​.

#### In Dynatrace, using the left navigation menu find Distributed traces under Application & Microservices section

- Manage  - Application & Microservices

 ```bash
   Action: Look at the "Distributed traces" page
   ```

- Filter using "broker" service tag in the **Filter requests** field

 ```bash
   Action: Filter using Service tag "broker" all
   ```

Now you have sorted through the entire environments data, and limited it to the "broker" tag, let's narrow the list using response time > 200ms​

- Filter using "response time > 200ms​" in the **Filter requests** field

 ```bash
   Action: Filter using "Response time" with value of "> 200ms"
   ```

![tracefilter](../../assets/images/tracefilter.png)

Add an mangement zone using existing tagging rule applied to the easyTrade Broker service

 ```bash
   Action: Click "Add new management zone"
   Action: Type "broker" into the "Management zone name" field and leave the "Description" field blank
   Action: Click "Add a new rule"
   Action: Pick "Monitored entity" from the "Rule type" dropdown list
   Action: In the "Rule applies to" field pick "Services"
   ```

 ```bash
   Action: Click "Add condition"
   ```

```bash
   Action: Pick "Service tags" from the "Property" dropdown list
   Action: Pick "tag key equals" from the "Operator" dropdown list
   Action: Pick "broker" from the "Tag" dropdown list
   Action: Toggle on "Apply to underlying hosts of matching services"
   Action: Toggle on "Apply to underlying process groups of matching services"
   Action: Click "Preview" to view the matched entities
   Action: Click "Save changes" on the lower left of your screen to save the new rule
   ```

In the future, anything tagged with **brokerservice** will fall immediately into the same management zone, which is very powerful for architecting your environment, and controlling who has access to which parts of the data sets​. We call this automation!

Use the automated tagging rule to filter services entities

 ```bash
   Action: Look at the "Services" page
   Action: Filter by "broker" management zone (filter icon at the top right of the page)
   ```

**FYI** - It may take a few minutes for your automated tagging rules to propogate, wait a few minutes and try again.

