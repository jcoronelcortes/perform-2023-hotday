## How to parse logs using Fluentbit
In this lab you'll learn how to :
* Extract data from the logs produced by Traefik acces logs
* Use a ClusterParser

### Step 1: Create a ClusterParser

Fluentbit can parse log content using `Parser`. In fluent operator the parser would be expressed using `ClusterParser`.

A. Enable the access log on Traefik
   ```shell
   kubectl edit deployment traefik -n kube-system
   ```
   to enable the acess-log in traefik we need to add an args to the container for traefik
   ```
   - --accesslog=true
   ```

B. Create the log parser for Traefik

   Traefik log format is standard , if follow the following structure :
   `<remote_IP_address> - <client_user_name_if_available> [<timestamp>] "<request_method> <request_path> <request_protocol>" <origin_server_HTTP_status> <origin_server_content_size> "<request_referrer>" "<request_user_agent>" <number_of_requests_received_since_Traefik_started> "<Traefik_router_name>" "<Traefik_server_URL>" <request_duration_in_ms>ms`


   In the Bastion host, edit the CluserParser template 
   ```bash
   vi exercice/04_Fluent/cluster_parser_template.yaml
   ```

   the regexp parser can take several parameters :
   - regex with the actual regular expression allowing us to extrac the right fields
   - types to convert extracted fields in a given tyoe
   - time_key to use an extract key as a time reference
   - time_format to specify the format of the time field

   Let's first create the parser with the right regular expression:
   ```yaml
     regexp:
        name: traefik
        regex: ^.*\s+\[(?<timestamp>\d{2}\/[a-zA-Z]+\/\d{4}:\d{2}:\d{2}:\d{2}\s+\+\d+)\]\s+"(?<method>\w+)\s+(?<path>\S+)\s+(?<httpversion>[^"]+)"\s+(?<statuscode>\d+)\s+(?<bytes_content>\d+)\s+"-"\s+"-"\s+(?<number_of_requests_received_since_started>\d+)\s+"(?<ingress>[^"]+)"\s+"(?<url>[^"]+)"\s+(?<responsetime>\d+)ms$
   ```

   Let's apply this filter and look at the logs of fluentbit:
   ```bash
   kubectl apply - f cluster_parser_template.yaml -n kubesphere-logging-system
   ```

   To be able to use this Parser we would need to create a `Clusterfilter` using the operator `parser`

C. Type the data
   ```bash
   vi exercice/04_Fluent/cluster_parser_template.yaml
   ```
   Add the following lines to:
   - convert the `responsetime` field into integer
   - use the `timestamp` field as a reference to the log stream
   - set  the format of the timestamp field

   ```yaml
   types: request_duration_in_ms:integer
   timeKey: timestamp
   timeFormat: "%d/%b/%Y:%H:%M:%S %z"
   ```

   Let's apply this filter and look at the logs of fluentbit:
   ```bash
   kubectl apply - f cluster_parser_template.yaml -n kubesphere-logging-system
   ```


### Step 2. Create the Clusterfilter using the new parser
Fluentbit or Fluentd relies on the logic of tag. each incoming logs are taged . With the help of the tag you are able to precize on what type of content is targeted by a given filter , parser or output.
In our case, all the k8s logs are taged  : `kube.*`
the rest of the tag contains the actual path to our logs, in our case `/var/log/containers`, meaning that each log has a tag :
`kube.var.log.containers.containername`
- `kube.*`  means all the logs
- `kube.var.log.containers.traefik*`  means only the logs from the pods starting by ` traefik`  pods.

In the Bastion host, edit the CluserParser template
```bash
vi exercice/03_Fluent/cluster_filter_parser_template.yaml
```
Add the lines underneath to apply our filter on the message field of the logs coming from the traefik logs :
```yaml
- parser:
    keyName: message
    parser: kubernetes-parser-traefik
```

Let's apply our new filter and look a the logs of ouf fluenbit agents :
```bash
kubectl apply - f cluster_filter_parser_template.yaml -n kubesphere-logging-system
kubectl logs <podid> -n kubesphere-logging-system
```
We can see that the logs are beeing parsed and the various fields extracted are now expose in our log stream.
