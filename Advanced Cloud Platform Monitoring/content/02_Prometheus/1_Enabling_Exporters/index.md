##  Enabling Exporters
In this step, you will monitor the application pods using node-exporter and mongodb-exporter.


### Annotate mongodb-exporter
In this step, we will annotate the exporters to accept metrics on the annotated pods.

Towards first step, navigate to **Kubernetes** menu within Dynatrace tenant, and against the kubernetes cluster **prometheusintegration** that you have setup in the first step, click (...) under "Actions" against the integration and select **Settings**.
![step-1](../../../assets/images/step_1_prometheus_annotation.png)

Further, toggle **Monitor annotated Prometheus exporters** and click on **Save**.
![step-2](../../../assets/images/step_2_prometheus_annotation.png)

Once saved, this concludes the setup required on tenant. The activeGate installed as part of the integration will now look for any annotated exporters and push the data in Dynatrace.

Now, let us create mongo-exporter that will collect mongodb metrics. To do so, run the mongodb-exporter pod in your kubernetes cluster by executing the command 
```sh
helm install prometheus-mongo prometheus-community/prometheus-mongodb-exporter --set mongodb.uri=mongodb://d1prumworkshop:password@mongo.samplebank.svc.cluster.local:27017/?authSource=admin,serviceMonitor.enabled=false -n samplebank
```
This helm chart deploy a k8S deployment collecting data from our mongo database in the namespace samplebank.

Now that this exporter is running let's look at the prometheus metrics produced:
```sh
kubectl get pods -n samplebank
```
You should get the following output :
![step-3](../../../assets/images/identify_mongo_exporter.png)
let's have a look at the metric produce by the exporter pod
```sh
kubectl port-forward <POD ID of the exporter> -n samplebank 9216:9216
```
in another terminal send the following curl command:
```sh
curl http://localhost:9216/metrics
```

<!-- ------------------------ -->
