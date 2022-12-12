## Installing Prometheus and Enabling Exporters
In this step, you will be installing prometheus on the Kubernetes cluster so that it can monitor the application pods using node-exporter and mangodb-exporter.

Navigate back to shell and execute the commands below:
```bash
$ sudo snap install helm --classic

$ helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

$ helm repo update

$ helm install prometheus-node-exporter prometheus-community/prometheus-node-exporter
```

Once executed, prometheus-node-exporter along with other prometheus pods would be installed in default namespace automatically on your kubernetes cluster.

**Note**: To view the installed pods, execute
```
$ kubectl get pods -n default
```

### Annotate mongodb-exporter
In this step, we will annotate the exporters to accept metrics on the annotated pods.

Towards first step, navigate to **Kubernetes** menu within Dynatrace tenant, and against the kubernetes cluster **prometheusintegration** that you have setup in the first step, click (...) under "Actions" against the integration and select **Settings**.
![step-1](../../../assets/images/step_1_prometheus_annotation.png)

Further, toggle **Monitor annotated Prometheus exporters** and click on **Save**.
![step-2](../../../assets/images/step_2_prometheus_annotation.png)

Once saved, this concludes the setup required on tenant. The activeGate installed as part of the integration will now look for any annotated exporters and push the data in Dynatrace.

Now, within SSH terminal we will annotate exporters to send data to Dynatrace. The first step will need you to have the Cluster-IP for the mongodb service so that it collects metrics from mongodb-exporter. To do so, run the following command within the SSH terminal:
```
$ kubectl describe service -n model-app mongo
```
![image](../../../assets/images/clusterIP-mongodb.png)

**Note**: Keep the clusterIP handy in a notepad/location that you can refer to later as we will need this while setting up the mongodb-exporter.

Now, let us create mongo-exporter that will collect mongodb metrics. To do so, run the mongodb-exporter pod in your kubernetes cluster by executing the command (after replacing cluster-ip in the command with the IP we identified earlier).
```
$ helm install prometheus-mongo prometheus-community/prometheus-mongodb-exporter --set mongodb.uri=mongodb://d1prumworkshop:password@clusterip:27017/?authSource=admin,serviceMonitor.enabled=false --set-string podAnnotations."prometheus.io/scrape"=true  --set-string podAnnotations."prometheus.io/port"=9108 --namespace=model-app
```

Replace the **cluster-ip** with the IP listed from our earlier step before running the command.
![image](../../../assets/images/mongodb-exporter.png)

<!-- ------------------------ -->
