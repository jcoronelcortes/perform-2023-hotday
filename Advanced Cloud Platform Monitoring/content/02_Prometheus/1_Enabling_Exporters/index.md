## Enabling Exporters

In this section we'll monitor the application pods using node-exporter and mongodb-exporter.

## A) Annotate mongodb-exporter

In this step, we will annotate the exporters to accept metrics on the annotated pods.

1. Navigate to **Kubernetes** menu within Dynatrace tenant, and on the kubernetes cluster, click (...) under "Actions" in the integration and select **Settings**.
   ![step-1](../../../assets/images/step_1_prometheus_annotation.png)

Then, toggle **Monitor annotated Prometheus exporters** and click on **Save**.
![step-2](../../../assets/images/step_2_prometheus_annotation.png)

Once saved, this concludes the setup required on tenant. The activeGate installed as part of the integration will now look for any annotated exporters and push the data in Dynatrace.

## B) Create Mongodb Exporter

1. Create mongo-exporter that will collect mongodb metrics. To do so, first let helm know where to find kubernetes using:

```bash
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```

2. Add the mongodb exporter with:

```sh
helm install prometheus-mongo prometheus-community/prometheus-mongodb-exporter --set mongodb.uri=mongodb://d1prumworkshop:password@mongo.samplebank.svc.cluster.local:27017/?authSource=admin,serviceMonitor.enabled=false -n samplebank
```

This helm chart deploy a k8S deployment collecting data from our mongo database in the namespace samplebank.

Now we can confirm metrics are produced.

3. Get the pod ID of the exporter with:

```sh
kubectl get pods -n samplebank
```

You should get the following output :
![step-3](../../../assets/images/identify_mongo_exporter.png)

4. Save the pod name for easy reference going forward. Replace <pod> with pod name above.

```sh
export mongopod=<pod>
```

5. We'll temporarily forward the exporter port so we can confirm it works. Enable port-forwarding with:

```sh
kubectl port-forward $mongopod -n samplebank 9216:9216
```

6. Open a second terminal run the following curl command:

```sh
curl http://localhost:9216/metrics
```

![step-4](../../../assets/images/prometheus_local.png)
