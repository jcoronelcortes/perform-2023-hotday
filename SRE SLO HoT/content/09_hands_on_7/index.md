## Hands on #7 - Infrastructure SLO

#### Large Insurance Company utilizes Dynatrace SLOs to monitor their Infrastructure.  
#### Objective:
#### Monitor Infrastructure components focusing on utilization and error rates as opposed to response time to ensure infrastructure is meeting predefined performance.

1. There is no template for infrastructure SLOs, so we’ll need to use what we learned in previous exercises to define the metrics we want to use as part of our SLO definition.
2. For this example, we’ll use host CPU usage.

![](../../assets/images/ex5im1.png)

3. We will use the metric for cpu utilization that comes out of the box with Dynatrace. 

```
builtin:host.cpu.usage
```

4. For the entity selector, remove everything and replace it with type("HOST"). Note: You could specify a specific entity via the entityName or entityId fields, but since our environment only has a specific host, this is fine.
5. Because we want to ensure utilization is at a certain level, we will set the target and warning at 60%-70%, respectively. This ensures that we will be notified anytime our utilization drops by a significant amount from our expected threshold.
6. Evaluate the SLO, make sure the data matches your expecations and then hit create.

![](../../assets/images/ex5im2.png)

7. We can pin this newly created SLO to a dashboard along with any other metrics that would make sense to monitor. PaaS utilization, process CPU, host memory, etc., are all built-in (to Dynatrace) examples that would fit.

![](../../assets/images/ex5im3.png)

8. Example below of a finalized infrastructure SLO dashboard.

![](../../assets/images/ex5im4.png)