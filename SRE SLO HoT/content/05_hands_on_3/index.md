## Hands on #3 - Service

#### Situation: You are a SRE tasked with defining and tracking a SLO for a backend service that has received a lot of end-user complaints. Specifically, the checkCreditCard request has been taking a long time to return a response. After consulting with business partners and backend owners, the team has agreed on SLIs and error budgets. We want to know how many requests exceed our SLA of being under 2 seconds. The service in question is the BookingService. (com.dynatrace.easyTravel.business.backend.jar.easyTravel(x*))

1. Before we can create the SLO, we need to determine if the metric we need exists. If not, we need to create it ourselves. First, open the services tab and look for BookingService.

![](../../assets/images/ex33im1.png)

2. Navigate to the ‘Details’ page for the BookService page. Near the bottom of this page, you’ll see the top contributors. The request we want to use for our SLO is found below.
3. The request we want to use for our SLO is found here.
4. Select the create analysis view option to create our custom metric.

![](../../assets/images/ex33im2.png)

5. Most of this section has been filled out for us since we came from a response time view in the previous screen. Change the metric from Response Time to Request Count. Keep aggregation as ‘Count’.
6. Use the Create metric button to open the metric dialogue box. Name the metric ‘RT – BookingService – checkCreditCard’ and then select ‘Advanced Options’.


7. Remove the Request type equals ‘Default requests’ and ensure the Service shows below under Preview. Once this has been done, save the metric.
8. Navigate to the Metrics screen and find your custom metric. Ensure data is coming through. We can now create our SLO.
Copy the metric key for later.

```
calc:service.rt_bookingservice_checkcreditcard

```

8. Create a second metric that filters based on response time less than or equal to our SLA time of 2 seconds.

9. Navigate to the SLO page found on your side menu inside Dynatrace. Second, click on Add new SLO
10. For our metric expression, we want to divide the total number of requests in breach (<=2s) by the total count of all requests of checkCreditCard. Your expression should look like this: (Note: We multiply the resulting value by 100 to get a percentage that makes sense.)

```
(100)*((calc:service.rt_checkcreditcard__2s)/(calc:service.rt_checkcreditcard_count))
```

11. We have a strict agreement with our credit card validation third party, so we’ll use a target of 99.98 and a warning of 99.99. Next, evaluate and save the SLO. 

![](../../assets/images/ex33im4.png)