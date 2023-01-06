## Hands on #4 - Advanced SLO - Service

#### The business and dev teams have recently introduced a new function in the application that calculates travel recrecommendations for customers visiting the website. The business has determined that they want a separate, and granular SLO to track this single function, instead of the service overall (which is what we just did in the previous hands on). They want to track an SLO with a 15% error budget.In order to do this, we’ll need to: 
#### Create 2 custom metrics for our new request: Total count, and success count
#### Define an SLO with success as the numerator and total count as denominator. 

1. Navigate to Services in the left-hand menu. The request we need to build an SLO for is inside our easyTravel Customer Frontend service.

2. calculateRecommendations key request

3. Navigate to the Service-level Objectives page and add a new SLO. 

![](../../assets/images/handson4_2.png)

4. Provide a meaningful name/metric for the SLO. *{ENV}\_{APP NAME}\_{HoT#}\_{ENTITY TYPE}\_{TYPE}*

```
SLO Name : Prod - calculateRecommendations - HoT3 - Key Request - Availability
SLO Metric : prod_calculateRecommendations_hot3_KeyRequest_availability
```

![](../../assets/images/handson4_4.png)


5. Next, let's set the filters for the SLO.
> - Time Frame - the evaluation period of SLO. *last 30 minutes* </br>
> - Entity Selector - the entities from where SLI is calculated. *easytravel tag*</br>

```
timeFrame : -30m
entitySelector : type("SYNTHETIC_TEST"),tag(easytravel)
```

![](../../assets/images/handson4_5.png)

6. Next, let's set our SLO target.

```
Target - 99.99
Warning - 99.999
```

![](../../assets/images/handson4_6.png)

7. Finally, preview the SLO and hit 'Create'

8. Navigate to *Dashboards* and identify the following dashboard : *Perform 2023 HoT*

9. Edit the SLO tile of the current Hands-On, and select the SLO we just created: *Prod - calculateRecommendations - HoT4 - Key Request - Availability*